import React, { createContext } from "react"
import {
    AboutMeText,
    HomePageText,
    NavbarLinks,
    ProjectTitles,
    englishAboutMe,
    englishHomePage,
    englishNavbarGoBack,
    englishNavbarLinks,
    englishTitles,
} from "../utils/languageUtils";
import ProjectType from "../@types/ProjectType";
import {
    english_sys_projects,
    english_web_projects,
    english_datasci_projects,
    english_game_projects,
} from "../utils/projects";

interface languageContextType {
    englishMode: boolean,
    setEnglishMode: React.Dispatch<React.SetStateAction<boolean>>,
    navbarLinks: NavbarLinks,
    homePageText: HomePageText,
    aboutMeText: AboutMeText,
    projectTitles: ProjectTitles,
    navbarGoBack: string,
    sysProjects: ProjectType[],
    webProjects: ProjectType[],
    datasciProjects: ProjectType[],
    gameProjects: ProjectType[],
}

const languageContext = createContext<languageContextType>({
    englishMode: true,
    setEnglishMode: () => { },
    navbarLinks: englishNavbarLinks,
    homePageText: englishHomePage,
    aboutMeText: englishAboutMe,
    projectTitles: englishTitles,
    navbarGoBack: englishNavbarGoBack,
    sysProjects: english_sys_projects,
    webProjects: english_web_projects,
    datasciProjects: english_datasci_projects,
    gameProjects: english_game_projects,
})

export type { languageContextType }
export { languageContext }
