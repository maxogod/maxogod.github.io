import { ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import type { IconType } from "react-icons"
import { toast } from "react-toastify"
import { emptyProgress, gameContext, Progress } from "./gameContext"
import { languageContext } from "./languageContext"
import type { AchievementId, TreasureId } from "../utils/languageUtils"
import { fill } from "../utils/languageUtils"
import {
    achievementIcon, ARCHIVIST_GOAL, BUBBLES_GOAL, CHEAT_CODE, RUNNER_GOAL, SONAR_EVENT, TREASURES, treasureIcon,
} from "../utils/game"
import { isSoundOn, loadJson, saveJson, setSoundOn } from "../utils/localStorage"
import { setSoundEnabled, sounds } from "../utils/sound"
import { BOTTOM_DEPTH, getDepthSnapshot, subscribeDepth } from "../utils/depth"

const STORAGE_KEY = 'diveLog'

const loadProgress = (): Progress => {
    const saved = loadJson<Progress>(STORAGE_KEY)
    return {
        achievements: Array.isArray(saved.achievements) ? saved.achievements : [],
        treasures: Array.isArray(saved.treasures) ? saved.treasures : [],
        bubbles: typeof saved.bubbles === 'number' ? saved.bubbles : 0,
        opened: Array.isArray(saved.opened) ? saved.opened : [],
        best: typeof saved.best === 'number' ? saved.best : 0,
    }
}

const GameToast = ({ icon: Icon, label, title, tone }: { icon: IconType, label: string, title: string, tone: 'glow' | 'signal' }) => (
    <div className="flex items-center gap-3">
        <span className={`grid size-10 shrink-0 place-items-center rounded-full text-xl ${tone === 'glow' ? 'bg-glow/15 text-glow' : 'bg-signal/15 text-signal'}`}>
            <Icon aria-hidden />
        </span>
        <span className="flex flex-col leading-tight">
            <span className="text-xs text-foam/60">{label}</span>
            <span className="font-semibold text-foam">{title}</span>
        </span>
    </div>
)

const GameContextProvider = ({ children }: { children: ReactNode }) => {

    const { text } = useContext(languageContext)
    const [progress, setProgress] = useState<Progress>(loadProgress)
    const [sound, setSoundState] = useState(isSoundOn)
    const [pingCount, setPingCount] = useState(0)
    const [whaleCount, setWhaleCount] = useState(0)
    const [logbookOpen, setLogbookOpen] = useState(false)

    // Refs mirror state so callbacks stay stable and side effects (toasts, sounds) fire exactly once.
    const progressRef = useRef(progress)
    const textRef = useRef(text)
    const lastPing = useRef(0)

    useEffect(() => { textRef.current = text }, [text])
    useEffect(() => { setSoundEnabled(sound) }, [sound])

    const commit = useCallback((next: Progress) => {
        progressRef.current = next
        setProgress(next)
        saveJson(STORAGE_KEY, next)
    }, [])

    const unlock = useCallback((id: AchievementId) => {
        const current = progressRef.current
        if (current.achievements.includes(id)) return
        commit({ ...current, achievements: [...current.achievements, id] })
        sounds.achieve()
        const copy = textRef.current
        toast(<GameToast icon={achievementIcon(id)} label={copy.logbook.unlocked} title={copy.achievements[id].title} tone="signal" />, { toastId: `achievement-${id}` })
    }, [commit])

    const collectTreasure = useCallback((id: TreasureId) => {
        const current = progressRef.current
        if (current.treasures.includes(id)) return
        const treasures = [...current.treasures, id]
        commit({ ...current, treasures })
        sounds.collect()
        const copy = textRef.current
        const label = `${copy.logbook.treasureFound} ${fill('{n}/{total}', { n: treasures.length, total: TREASURES.length })}`
        toast(<GameToast icon={treasureIcon(id)} label={label} title={copy.treasures[id]} tone="glow" />, { toastId: `treasure-${id}` })
        if (treasures.length >= TREASURES.length) unlock('treasures')
    }, [commit, unlock])

    const popBubble = useCallback(() => {
        const current = progressRef.current
        const bubbles = current.bubbles + 1
        commit({ ...current, bubbles })
        sounds.pop()
        if (bubbles >= BUBBLES_GOAL) unlock('bubbles')
    }, [commit, unlock])

    const openProject = useCallback((slug: string) => {
        const current = progressRef.current
        unlock('firstLog')
        if (current.opened.includes(slug)) return
        const opened = [...progressRef.current.opened, slug]
        commit({ ...progressRef.current, opened })
        if (opened.length >= ARCHIVIST_GOAL) unlock('archivist')
    }, [commit, unlock])

    const recordScore = useCallback((score: number) => {
        const current = progressRef.current
        if (score >= RUNNER_GOAL) unlock('runner')
        if (score <= progressRef.current.best) return false
        commit({ ...progressRef.current, best: score })
        return current.best > 0
    }, [commit, unlock])

    const resetProgress = useCallback(() => {
        commit(emptyProgress)
    }, [commit])

    const setSound = useCallback((on: boolean) => {
        setSoundState(on)
        setSoundOn(on)
    }, [])

    const sonarPing = useCallback(() => {
        const now = performance.now()
        if (now - lastPing.current < 1200) return
        lastPing.current = now
        setPingCount(c => c + 1)
        sounds.ping()
        window.dispatchEvent(new Event(SONAR_EVENT))
        unlock('ping')
    }, [unlock])

    // Depth-based achievements.
    useEffect(() => {
        const check = () => {
            const { depth } = getDepthSnapshot()
            if (depth > 20) unlock('dive')
            if (depth >= 200) unlock('twilight')
            if (depth >= 1000) unlock('midnight')
            if (depth >= BOTTOM_DEPTH - 60) unlock('bottom')
        }
        return subscribeDepth(check)
    }, [unlock])

    // Keyboard: P pings the sonar, the cheat code summons the whale.
    useEffect(() => {
        let position = 0
        const onKey = (event: KeyboardEvent) => {
            const target = event.target as HTMLElement | null
            if (target?.closest('input, textarea, select, [contenteditable="true"]')) return
            if (event.metaKey || event.ctrlKey || event.altKey) return
            const key = event.key.toLowerCase()

            position = key === CHEAT_CODE[position] ? position + 1 : (key === CHEAT_CODE[0] ? 1 : 0)
            if (position === CHEAT_CODE.length) {
                position = 0
                setWhaleCount(c => c + 1)
                unlock('cheat_code')
            }

            if (key === 'p' && !event.repeat && !target?.closest('[data-game]')) sonarPing()
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [sonarPing, unlock])

    const value = useMemo(() => ({
        progress, unlock, collectTreasure, popBubble, openProject, recordScore, resetProgress,
        sound, setSound, sonarPing, pingCount, whaleCount, logbookOpen, setLogbookOpen,
    }), [progress, unlock, collectTreasure, popBubble, openProject, recordScore, resetProgress, sound, setSound, sonarPing, pingCount, whaleCount, logbookOpen])

    return (
        <gameContext.Provider value={value}>
            {children}
        </gameContext.Provider>
    )
}

export { GameContextProvider }
