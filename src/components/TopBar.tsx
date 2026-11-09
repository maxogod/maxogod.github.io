import { ReactNode, useContext } from "react"
import Tooltip from "@mui/material/Tooltip"
import { LuMoon, LuSun, LuTrophy, LuVolume2, LuVolumeX } from "react-icons/lu"
import { themeContext } from "../context/themeContext"
import { languageContext } from "../context/languageContext"
import { gameContext } from "../context/gameContext"
import { setCurrentLanguage, setCurrentTheme } from "../utils/localStorage"
import { scrollToSection } from "../utils/depth"
import { ACHIEVEMENTS } from "../utils/game"
import { useDepth } from "../hooks/useDepth"
import Submarine from "./Submarine"

const IconButton = ({ label, onClick, children }: { label: string, onClick: () => void, children: ReactNode }) => (
    <Tooltip title={label} placement="bottom" arrow>
        <button type="button" aria-label={label} onClick={onClick}
            className="grid h-10 min-w-10 place-items-center rounded-full px-2 text-lg transition-colors hover:bg-white/15">
            {children}
        </button>
    </Tooltip>
)

const TopBar = () => {

    const { darkMode, setDarkMode } = useContext(themeContext)
    const { englishMode, setEnglishMode, text } = useContext(languageContext)
    const { sound, setSound, progress, setLogbookOpen, unlock } = useContext(gameContext)
    const { depth } = useDepth()

    const atSurface = depth < 8
    const onSky = atSurface && !darkMode

    const toggleTheme = () => {
        setDarkMode(!darkMode)
        setCurrentTheme(!darkMode)
        if (!darkMode) unlock('night')
    }

    const toggleLanguage = () => {
        setEnglishMode(!englishMode)
        setCurrentLanguage(!englishMode)
        unlock('polyglot')
    }

    return (
        <header className={`topbar fixed inset-x-0 top-0 z-40 flex items-center justify-between px-3 py-3 transition-colors duration-500 sm:px-6 ${onSky ? 'text-ink' : 'text-foam'}`}>
            <button
                type="button"
                onClick={() => scrollToSection('surface')}
                aria-label={text.nav.home}
                className={`flex items-center gap-2 rounded-full py-1.5 pr-4 pl-2 text-xl font-extrabold tracking-tight transition-[background-color] duration-500 [font-stretch:90%] ${atSurface ? '' : 'glass ring-1 ring-white/10'}`}>
                <Submarine className="w-9" />
                maxo
            </button>

            <nav aria-label={text.nav.settings} className={`flex items-center gap-0.5 rounded-full p-1 transition-[background-color] duration-500 ${atSurface ? 'bg-white/20 backdrop-blur-md dark:bg-white/8' : 'glass ring-1 ring-white/10'}`}>
                <IconButton label={text.nav.language} onClick={toggleLanguage}>
                    <span className="font-gauge text-xs font-semibold">{text.nav.languageShort}</span>
                </IconButton>
                <IconButton label={darkMode ? text.nav.toDay : text.nav.toNight} onClick={toggleTheme}>
                    {darkMode ? <LuSun aria-hidden /> : <LuMoon aria-hidden />}
                </IconButton>
                <IconButton label={sound ? text.nav.mute : text.nav.unmute} onClick={() => setSound(!sound)}>
                    {sound ? <LuVolume2 aria-hidden /> : <LuVolumeX aria-hidden />}
                </IconButton>
                <Tooltip title={text.nav.logbook} placement="bottom" arrow>
                    <button type="button" aria-label={text.nav.logbook} onClick={() => setLogbookOpen(true)}
                        className="skin-cta ml-0.5 flex h-10 items-center gap-2 rounded-full bg-signal px-3.5 text-ink transition-transform hover:-translate-y-px">
                        <LuTrophy aria-hidden />
                        <span className="font-gauge text-xs font-semibold">{progress.achievements.length}/{ACHIEVEMENTS.length}</span>
                    </button>
                </Tooltip>
            </nav>
        </header>
    )
}

export default TopBar
