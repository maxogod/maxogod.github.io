import React, { ReactNode, createContext, useEffect, useState } from "react"
import { englishAboutMe, englishHomePage, englishNavbarGoBack, englishNavbarLinks, englishTitles, spanishAboutMe, spanishHomePage, spanishNavbarGoBack, spanishNavbarLinks, spanishTitles } from "../utils/languageUtils";
import { isEnglishModeOn } from "../utils/localStorage";
import { english_datasci_projects, english_game_projects, english_web_projects, spanish_datasci_projects, spanish_game_projects, spanish_web_projects } from "../utils/projects";

interface languageContextType {
    englishMode: boolean,
    setEnglishMode: React.Dispatch<React.SetStateAction<boolean>>,
    navbarLinks: typeof englishNavbarLinks | typeof spanishNavbarLinks,
    homePageText: typeof englishHomePage | typeof spanishHomePage,
    aboutMeText: typeof englishAboutMe | typeof spanishAboutMe
    projectTitles: typeof englishTitles | typeof spanishTitles,
    navbarGoBack: string,
    webProjects: typeof english_web_projects | typeof spanish_web_projects,
    datasciProjects: typeof english_datasci_projects | typeof spanish_datasci_projects,
    gameProjects: typeof english_game_projects | typeof spanish_game_projects,
}

const languageContext = createContext<languageContextType>({
    englishMode: true,
    setEnglishMode: () => { },
    navbarLinks: englishNavbarLinks,
    homePageText: englishHomePage,
    aboutMeText: englishAboutMe,
    projectTitles: englishTitles,
    navbarGoBack: englishNavbarGoBack,
    webProjects: english_web_projects,
    datasciProjects: english_datasci_projects,
    gameProjects: english_game_projects,
})

const LanguageContextProvider = ({ children }: { children: ReactNode }) => {

    const [englishMode, setEnglishMode] = useState(isEnglishModeOn())
    const [navbarLinks, setNavbarLinks] = useState(englishMode ? englishNavbarLinks : spanishNavbarLinks)
    const [homePageText, setHomePageText] = useState(englishMode ? englishHomePage : spanishHomePage)
    const [aboutMeText, setAboutMeText] = useState(englishMode ? englishAboutMe : spanishAboutMe)
    const [projectTitles, setProjectTitles] = useState(englishMode ? englishTitles : spanishTitles)
    const [navbarGoBack, setNavbarGoBack] = useState(englishMode ? englishNavbarGoBack : spanishNavbarGoBack)
    const [webProjects, setWebProjects] = useState(englishMode ? english_web_projects : spanish_web_projects)
    const [datasciProjects, setdatasciProjects] = useState(englishMode ? english_datasci_projects : spanish_datasci_projects)
    const [gameProjects, setGameProjects] = useState(englishMode ? english_game_projects : spanish_game_projects)

    useEffect(() => {
        setNavbarLinks(englishMode ? englishNavbarLinks : spanishNavbarLinks)
        setHomePageText(englishMode ? englishHomePage : spanishHomePage)
        setAboutMeText(englishMode ? englishAboutMe : spanishAboutMe)
        setProjectTitles(englishMode ? englishTitles : spanishTitles)
        setNavbarGoBack(englishMode ? englishNavbarGoBack : spanishNavbarGoBack)
        setWebProjects(englishMode ? english_web_projects : spanish_web_projects)
        setdatasciProjects(englishMode ? english_datasci_projects : spanish_datasci_projects)
        setGameProjects(englishMode ? english_game_projects : spanish_game_projects)
    }, [englishMode])

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
                    webProjects,
                    datasciProjects,
                    gameProjects,
                }
            }>
            {children}
        </languageContext.Provider>
    )
}

export {
    languageContext,
    LanguageContextProvider,
}