import type { IconType } from 'react-icons'
import {
    GiAnchor, GiBubbles, GiCompass, GiOctopus, GiOpenTreasureChest,
    GiOysterPearl, GiShipWheel, GiSpermWhale, GiTreasureMap, GiTrophyCup, GiTwoCoins,
} from 'react-icons/gi'
import { LuBookOpen, LuBookOpenCheck, LuLanguages, LuMail, LuMoon, LuRadar } from 'react-icons/lu'
import type { AchievementId, TreasureId } from './languageUtils'

export const ACHIEVEMENTS: { id: AchievementId; icon: IconType }[] = [
    { id: 'bottom', icon: GiOctopus },
    { id: 'firstLog', icon: LuBookOpen },
    { id: 'archivist', icon: LuBookOpenCheck },
    { id: 'ping', icon: LuRadar },
    { id: 'bubbles', icon: GiBubbles },
    { id: 'treasures', icon: GiOpenTreasureChest },
    { id: 'runner', icon: GiTrophyCup },
    { id: 'cheat_code', icon: GiSpermWhale },
    { id: 'signal', icon: LuMail },
    { id: 'night', icon: LuMoon },
    { id: 'polyglot', icon: LuLanguages },
]

export const TREASURES: { id: TreasureId; icon: IconType }[] = [
    { id: 'map', icon: GiTreasureMap },
    { id: 'compass', icon: GiCompass },
    { id: 'pearl', icon: GiOysterPearl },
    { id: 'anchor', icon: GiAnchor },
    { id: 'coins', icon: GiTwoCoins },
    { id: 'wheel', icon: GiShipWheel },
]

export const TREASURE_ICONS = Object.fromEntries(TREASURES.map(t => [t.id, t.icon])) as Record<TreasureId, IconType>
export const treasureIcon = (id: TreasureId): IconType => TREASURE_ICONS[id] ?? GiTwoCoins
export const achievementIcon = (id: AchievementId): IconType => ACHIEVEMENTS.find(a => a.id === id)?.icon ?? GiTrophyCup

export const BUBBLES_GOAL = 25
export const ARCHIVIST_GOAL = 8
export const RUNNER_GOAL = 500

export const CHEAT_CODE = ['arrowup', 'arrowdown', 'arrowleft', 'arrowright']

/** Window event fired on every sonar ping. */
export const SONAR_EVENT = 'sonar-ping'
