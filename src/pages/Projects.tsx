import { useContext } from "react"
import { themeContext } from "../context/themeContext"

const Projects = () => {

    const { backgroundP2 } = useContext(themeContext)

    return (
        <div
            id='projects'
            className={`${backgroundP2} w-screen h-screen`}>

        </div>
    )
}

export default Projects