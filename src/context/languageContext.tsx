import React, { ReactNode, createContext, useEffect, useState } from "react"
import { englishAboutMe, englishHomePage, englishNavbarGoBack, englishNavbarLinks, englishTitles, spanishAboutMe, spanishHomePage, spanishNavbarGoBack, spanishNavbarLinks, spanishTitles } from "../utils/languageUtils";
import { isEnglishModeOn } from "../utils/localStorage";

interface languageContextType {
    englishMode: boolean,
    setEnglishMode: React.Dispatch<React.SetStateAction<boolean>>,
    navbarLinks: typeof englishNavbarLinks | typeof spanishNavbarLinks,
    homePageText: typeof englishHomePage | typeof spanishHomePage,
    aboutMeText: typeof englishAboutMe | typeof spanishAboutMe
    projectTitles: typeof englishTitles | typeof spanishTitles,
    navbarGoBack: string,
}

const languageContext = createContext<languageContextType>({
    englishMode: true,
    setEnglishMode: () => { },
    navbarLinks: englishNavbarLinks,
    homePageText: englishHomePage,
    aboutMeText: englishAboutMe,
    projectTitles: englishTitles,
    navbarGoBack: englishNavbarGoBack,
})

const LanguageContextProvider = ({ children }: { children: ReactNode }) => {

    const [englishMode, setEnglishMode] = useState(isEnglishModeOn())
    const [navbarLinks, setNavbarLinks] = useState(englishMode ? englishNavbarLinks : spanishNavbarLinks)
    const [homePageText, setHomePageText] = useState(englishMode ? englishHomePage : spanishHomePage)
    const [aboutMeText, setAboutMeText] = useState(englishMode ? englishAboutMe : spanishAboutMe)
    const [projectTitles, setProjectTitles] = useState(englishMode ? englishTitles : spanishTitles)
    const [navbarGoBack, setNavbarGoBack] = useState(englishMode ? englishNavbarGoBack : spanishNavbarGoBack)

    useEffect(() => {
        setNavbarLinks(englishMode ? englishNavbarLinks : spanishNavbarLinks)
        setHomePageText(englishMode ? englishHomePage : spanishHomePage)
        setAboutMeText(englishMode ? englishAboutMe : spanishAboutMe)
        setProjectTitles(englishMode ? englishTitles : spanishTitles)
        setNavbarGoBack(englishMode ? englishNavbarGoBack : spanishNavbarGoBack)
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