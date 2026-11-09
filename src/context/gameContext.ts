import { createContext } from "react"
import type { AchievementId, TreasureId } from "../utils/languageUtils"

interface Progress {
    achievements: AchievementId[],
    treasures: TreasureId[],
    bubbles: number,
    /** Slugs of projects opened at least once. */
    opened: string[],
    /** Deep Run high score. */
    best: number,
}

interface gameContextType {
    progress: Progress,
    unlock: (id: AchievementId) => void,
    collectTreasure: (id: TreasureId) => void,
    popBubble: () => void,
    openProject: (slug: string) => void,
    /** Saves a Deep Run score; returns true when it beats the previous best. */
    recordScore: (score: number) => boolean,
    resetProgress: () => void,
    sound: boolean,
    setSound: (on: boolean) => void,
    sonarPing: () => void,
    /** Increments on every sonar ping. */
    /** Increments every time the cheat code is entered. */
    whaleCount: number,
    logbookOpen: boolean,
    setLogbookOpen: (open: boolean) => void,
}

const emptyProgress: Progress = { achievements: [], treasures: [], bubbles: 0, opened: [], best: 0 }

const gameContext = createContext<gameContextType>({
    progress: emptyProgress,
    unlock: () => { },
    collectTreasure: () => { },
    popBubble: () => { },
    openProject: () => { },
    recordScore: () => false,
    resetProgress: () => { },
    sound: true,
    setSound: () => { },
    sonarPing: () => { },
    whaleCount: 0,
    logbookOpen: false,
    setLogbookOpen: () => { },
})

export type { gameContextType, Progress }
export { gameContext, emptyProgress }
