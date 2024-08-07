import { useContext } from "react"
import { themeContext } from "../context/themeContext"
import web from '../assets/web.png'
import cli from '../assets/bdd.png'
import games from '../assets/games.png'
import { Link } from "react-router-dom"
import Bubbles from "../components/Bubbles"
import { colorTransition } from "../utils/themeUtils"
import Tooltip from '@mui/material/Tooltip';
import { languageContext } from "../context/languageContext"
import { navbarContext } from "../context/navbarContext"

const Projects = () => {

    const { projectTitles } = useContext(languageContext)
    const { backgroundP2, textColor, bubbleColor } = useContext(themeContext)
    const { setShowBackButton } = useContext(navbarContext)

    const handleLinkClick = () => {

        setShowBackButton(true)
    }

    return (
        <div
            id='projects'
            className={`${backgroundP2} relative w-screen h-screen flex flex-col sm:flex-row sm:flex-wrap justify-center items-center`}>

            <Bubbles />

            <Tooltip title={projectTitles.web} placement="top" arrow>
                <Link to="/projects/web"
                    className={`w-32 h-32 sm:w-56 sm:h-56 flex items-center hover:brightness-110 justify-center opacity-80 brightness-75 ${bubbleColor} ${colorTransition} rounded-full custom-animate-bounce mb-16 sm:mb-0 relative`}
                    onClick={handleLinkClick}>
                    <h1 className={`absolute top-1/2 w-full text-center font-extrabold ${textColor}`}>
                    </h1>
                    <img alt="web projects" src={web} className="w-20 sm:w-32 aspect-auto ease-in-out duration-300" />
                </Link>
            </Tooltip>

            <Tooltip title={projectTitles.datasci} placement="top" arrow>
                <Link to="/projects/datasci"
                    className={`w-32 h-32 sm:w-56 sm:h-56 flex items-center hover:brightness-110 justify-center opacity-80 brightness-75 ${bubbleColor} ${colorTransition} rounded-full custom-animate-bounce mb-16 sm:mb-0 sm:mt-60 relative`}
                    onClick={handleLinkClick}>
                    <h1 className={`absolute top-1/2 w-full text-center font-extrabold ${textColor}`}>
                    </h1>
                    <img alt="data science projects" src={cli} className="w-20 sm:w-32 mr-3 aspect-auto ease-in-out duration-300 brightness-110" />
                </Link>
            </Tooltip>

            <Tooltip title={projectTitles.games} placement="top" arrow>
                <Link to="/projects/games" className
                    ={`w-32 h-32 sm:w-56 sm:h-56 flex items-center hover:brightness-110 justify-center opacity-80 brightness-75 ${bubbleColor} ${colorTransition} rounded-full custom-animate-bounce relative`}
                    onClick={handleLinkClick}>
                    <h1 className={`absolute top-1/2 w-full text-center font-extrabold ${textColor}`}>
                    </h1>
                    <img alt="game projects" src={games} className="w-20 sm:w-32 aspect-auto ease-in-out duration-300 brightness-110" />
                </Link>
            </Tooltip>

        </div>
    )
}

export default Projects