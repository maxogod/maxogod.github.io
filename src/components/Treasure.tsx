import { CSSProperties, useContext, useEffect, useState } from "react"
import { gameContext } from "../context/gameContext"
import { languageContext } from "../context/languageContext"
import type { TreasureId } from "../utils/languageUtils"
import { SONAR_EVENT, TREASURE_ICONS } from "../utils/game"

/**
 * A collectible hidden in the page. Barely visible until a sonar ping lights it up.
 * Position it with `className`/`style` (it renders absolutely positioned).
 */
const Treasure = ({ id, className = '', style, layer = 'z-20' }: { id: TreasureId, className?: string, style?: CSSProperties, layer?: string }) => {

    const { progress, collectTreasure } = useContext(gameContext)
    const { text } = useContext(languageContext)
    const [revealed, setRevealed] = useState(false)
    const [leaving, setLeaving] = useState(false)

    useEffect(() => {
        let timer = 0
        const onPing = () => {
            setRevealed(true)
            clearTimeout(timer)
            timer = window.setTimeout(() => setRevealed(false), 3200)
        }
        window.addEventListener(SONAR_EVENT, onPing)
        return () => {
            window.removeEventListener(SONAR_EVENT, onPing)
            clearTimeout(timer)
        }
    }, [])

    useEffect(() => {
        if (!leaving) return
        const timer = setTimeout(() => collectTreasure(id), 450)
        return () => clearTimeout(timer)
    }, [leaving, collectTreasure, id])

    if (progress.treasures.includes(id)) return null

    const Icon = TREASURE_ICONS[id]

    return (
        <button
            type="button"
            data-treasure
            aria-label={text.treasures[id]}
            onClick={() => setLeaving(true)}
            disabled={leaving}
            style={style}
            className={`group absolute ${layer} grid size-11 place-items-center rounded-full text-[1.7rem] transition-all duration-500 ${leaving ? '-translate-y-10 scale-150 opacity-0' : ''} ${className}`}>
            {revealed && !leaving && <span className="absolute inset-0 animate-ping rounded-full border-2 border-glow" />}
            <Icon
                aria-hidden
                className={`transition-[color,opacity,filter] duration-500 group-hover:animate-none ${revealed || leaving
                    ? 'text-signal opacity-100 drop-shadow-[0_0_10px_var(--color-signal)]'
                    : 'animate-shimmer text-foam group-focus-visible:animate-none'}`} />
        </button>
    )
}

export default Treasure
