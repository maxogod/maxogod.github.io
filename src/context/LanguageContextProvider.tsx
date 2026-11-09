import { ReactNode, useLayoutEffect, useState } from "react"
import { englishCopy, spanishCopy } from "../utils/languageUtils";
import { isEnglishModeOn } from "../utils/localStorage";
import { languageContext } from "./languageContext";
import { englishProjects, spanishProjects } from "../utils/projects";

const LanguageContextProvider = ({ children }: { children: ReactNode }) => {

    const [englishMode, setEnglishMode] = useState(isEnglishModeOn)

    useLayoutEffect(() => {
        document.documentElement.lang = englishMode ? 'en' : 'es'
    }, [englishMode])

    return (
        <languageContext.Provider
            value={{
                englishMode,
                setEnglishMode,
                text: englishMode ? englishCopy : spanishCopy,
                projects: englishMode ? englishProjects : spanishProjects,
            }}>
            {children}
        </languageContext.Provider>
    )
}

export { LanguageContextProvider }
