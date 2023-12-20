import React, { ReactNode, createContext, useEffect, useState } from "react"
import { englishAboutMe, englishHomePage, englishNavbarLinks, spanishAboutMe, spanishHomePage, spanishNavbarLinks } from "../utils/languageUtils";
import { isEnglishModeOn } from "../utils/localStorage";

interface languageContextType {
    englishMode: boolean,
    setEnglishMode: React.Dispatch<React.SetStateAction<boolean>>,
    navbarLinks: typeof englishNavbarLinks | typeof spanishNavbarLinks,
    homePageText: typeof englishHomePage | typeof spanishHomePage,
    aboutMeText: typeof englishAboutMe | typeof spanishAboutMe
}

const languageContext = createContext<languageContextType>({
    englishMode: true,
    setEnglishMode: () => { },
    navbarLinks: englishNavbarLinks,
    homePageText: englishHomePage,
    aboutMeText: englishAboutMe,
})

const LanguageContextProvider = ({ children }: { children: ReactNode }) => {

    const [englishMode, setEnglishMode] = useState(isEnglishModeOn())
    const [navbarLinks, setNavbarLinks] = useState(englishMode ? englishNavbarLinks : spanishNavbarLinks)
    const [homePageText, setHomePageText] = useState(englishMode ? englishHomePage : spanishHomePage)
    const [aboutMeText, setAboutMeText] = useState(englishMode ? englishAboutMe : spanishAboutMe)

    useEffect(() => {
        setNavbarLinks(englishMode ? englishNavbarLinks : spanishNavbarLinks)
        setHomePageText(englishMode ? englishHomePage : spanishHomePage)
        setAboutMeText(englishMode ? englishAboutMe : spanishAboutMe)
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