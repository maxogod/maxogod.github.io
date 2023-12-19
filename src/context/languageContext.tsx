import React, { ReactNode, createContext, useEffect, useState } from "react"
import { englishHomePage, englishNavbarLinks, spanishHomePage, spanishNavbarLinks } from "../utils/languageUtils";
import { isEnglishModeOn } from "../utils/localStorage";

interface languageContextType {
    englishMode: boolean,
    setEnglishMode: React.Dispatch<React.SetStateAction<boolean>>,
    navbarLinks: typeof englishNavbarLinks | typeof spanishNavbarLinks,
    homePageText: typeof englishHomePage | typeof spanishHomePage,
}

const languageContext = createContext<languageContextType>({
    englishMode: true,
    setEnglishMode: () => { },
    navbarLinks: englishNavbarLinks,
    homePageText: englishHomePage,
})

const LanguageContextProvider = ({ children }: { children: ReactNode }) => {

    const [englishMode, setEnglishMode] = useState(isEnglishModeOn())
    const [navbarLinks, setNavbarLinks] = useState(englishMode ? englishNavbarLinks : spanishNavbarLinks)
    const [homePageText, setHomePageText] = useState(englishMode ? englishHomePage : spanishHomePage)

    useEffect(() => {
        setNavbarLinks(englishMode ? englishNavbarLinks : spanishNavbarLinks)
        setHomePageText(englishMode ? englishHomePage : spanishHomePage)
    }, [englishMode])

    return (
        <languageContext.Provider
            value={
                {
                    englishMode,
                    setEnglishMode,
                    navbarLinks,
                    homePageText,
                }
            }>
            {children}
        </languageContext.Provider>
    )
}

export {
    languageContext,
    LanguageContextProvider
}