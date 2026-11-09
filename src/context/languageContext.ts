import React, { createContext } from "react"
import { Copy, englishCopy } from "../utils/languageUtils";
import { ProjectsByCategory } from "../@types/ProjectType";
import { englishProjects } from "../utils/projects";

interface languageContextType {
    englishMode: boolean,
    setEnglishMode: React.Dispatch<React.SetStateAction<boolean>>,
    /** All UI copy for the current language (data/language_{en,es}.yaml). */
    text: Copy,
    projects: ProjectsByCategory,
}

const languageContext = createContext<languageContextType>({
    englishMode: true,
    setEnglishMode: () => { },
    text: englishCopy,
    projects: englishProjects,
})

export type { languageContextType }
export { languageContext }
