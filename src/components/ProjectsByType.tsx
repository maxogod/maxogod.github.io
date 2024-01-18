import { useContext, useEffect, useState } from "react"
import { themeContext } from "../context/themeContext"
import Bubbles from "./Bubbles"
import { useParams } from "react-router-dom"
import { languageContext } from "../context/languageContext"
import ProjectListPopUp from "./ProjectListPopUp"
import { web_projects, cli_projects, game_projects } from "../utils/projects"
import ProjectType from "../@types/ProjectType"

const ProjectsByType = () => {

    const { backgroundP2 } = useContext(themeContext)
    const { projectTitles } = useContext(languageContext)
    const { projectType } = useParams()

    const [projectList, setProjectList] = useState<ProjectType[]>([])

    useEffect(() => {
        switch (projectType) {
            case 'web':
                setProjectList(web_projects)
                break
            case 'cli':
                setProjectList(cli_projects)
                break
            case 'games':
                setProjectList(game_projects)
                break
            default:
                break
        }
    }, [])

    return (
        <div
            className={`${backgroundP2} overflow-hidden relative w-screen h-screen flex flex-wrap justify-center items-center`}>

            <Bubbles />

            <ProjectListPopUp title={projectTitles[projectType]} projectList={projectList} />

        </div>
    )
}

export default ProjectsByType