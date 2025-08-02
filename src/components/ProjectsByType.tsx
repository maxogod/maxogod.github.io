import { useContext, useEffect, useState } from "react"
import { themeContext } from "../context/themeContext"
import Bubbles from "./Bubbles"
import { useParams } from "react-router-dom"
import { languageContext } from "../context/languageContext"
import ProjectListPopUp from "./ProjectListPopUp"
import ProjectType from "../@types/ProjectType"

type projectStringType = 'web' | 'datasci' | 'games'

const ProjectsByType = () => {

    const { backgroundP2 } = useContext(themeContext)
    const { projectTitles, sysProjects, webProjects, datasciProjects, gameProjects } = useContext(languageContext)
    const { projectType } = useParams()

    const [projectList, setProjectList] = useState<ProjectType[]>([])

    useEffect(() => {
        switch (projectType) {
            case 'sys':
                setProjectList(sysProjects)
                break
            case 'web':
                setProjectList(webProjects)
                break
            case 'datasci':
                setProjectList(datasciProjects)
                break
            case 'games':
                setProjectList(gameProjects)
                break
            default:
                break
        }
    }, [webProjects, datasciProjects, gameProjects])

    return (
        <div
            className={`${backgroundP2} overflow-hidden relative w-screen h-screen flex flex-wrap justify-center items-center`}>

            <Bubbles />

            <ProjectListPopUp title={projectTitles[projectType as projectStringType]} projectList={projectList} />

        </div>
    )
}

export default ProjectsByType
