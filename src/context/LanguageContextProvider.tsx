import { ReactNode, useState } from "react"
import {
    englishAboutMe,
    englishHomePage,
    englishNavbarGoBack,
    englishNavbarLinks,
    englishTitles,
    spanishAboutMe,
    spanishHomePage,
    spanishNavbarGoBack,
    spanishNavbarLinks,
    spanishTitles,
} from "../utils/languageUtils";
import { isEnglishModeOn } from "../utils/localStorage";
import { languageContext } from "./languageContext";
import {
    english_sys_projects,
    spanish_sys_projects,
    english_web_projects,
    spanish_web_projects,
    english_datasci_projects,
    spanish_datasci_projects,
    english_game_projects,
    spanish_game_projects,
} from "../utils/projects";

const LanguageContextProvider = ({ children }: { children: ReactNode }) => {

    const [englishMode, setEnglishMode] = useState(isEnglishModeOn())

    const navbarLinks = englishMode ? englishNavbarLinks : spanishNavbarLinks
    const homePageText = englishMode ? englishHomePage : spanishHomePage
    const aboutMeText = englishMode ? englishAboutMe : spanishAboutMe
    const projectTitles = englishMode ? englishTitles : spanishTitles
    const navbarGoBack = englishMode ? englishNavbarGoBack : spanishNavbarGoBack
    const sysProjects = englishMode ? english_sys_projects : spanish_sys_projects
    const webProjects = englishMode ? english_web_projects : spanish_web_projects
    const datasciProjects = englishMode ? english_datasci_projects : spanish_datasci_projects
    const gameProjects = englishMode ? english_game_projects : spanish_game_projects

    return (
        <languageContext.Provider
            value={
                {
                    englishMode,
                    setEnglishMode,
                    navbarLinks,
                    homePageText,
                    aboutMeText,
                    projectTitles,
                    navbarGoBack,
                    sysProjects,
                    webProjects,
                    datasciProjects,
                    gameProjects,
                }
            }>
            {children}
        </languageContext.Provider>
    )
}

export { LanguageContextProvider }
