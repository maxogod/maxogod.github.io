import { useContext } from "react"
import { themeContext } from "../context/themeContext"
import Bubbles from "./Bubbles"
import { useParams } from "react-router-dom"
import { languageContext } from "../context/languageContext"
import ProjectListPopUp from "./ProjectListPopUp"
import ProjectType from "../@types/ProjectType"
import { ProjectTitles } from "../utils/languageUtils"

type projectStringType = keyof ProjectTitles

const ProjectsByType = () => {

    const { backgroundP2 } = useContext(themeContext)
    const { projectTitles, sysProjects, webProjects, datasciProjects, gameProjects } = useContext(languageContext)
    const { projectType } = useParams()

    let projectList: ProjectType[]
    switch (projectType) {
        case 'sys':
            projectList = sysProjects
            break
        case 'web':
            projectList = webProjects
            break
        case 'datasci':
            projectList = datasciProjects
            break
        case 'games':
            projectList = gameProjects
            break
        default:
            projectList = []
            break
    }

    return (
        <div
            className={`${backgroundP2} overflow-hidden relative w-screen h-screen flex flex-wrap justify-center items-center`}>

            <Bubbles />

            <ProjectListPopUp title={projectTitles[projectType as projectStringType]} projectList={projectList} />

        </div>
    )
}

export default ProjectsByType
