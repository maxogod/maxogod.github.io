import { useContext } from "react"
import { themeContext } from "../context/themeContext"
import barrel from '../assets/barrel.png'
import { Link } from "react-router-dom"
import Bubbles from "../components/Bubbles"
import { colorTransition } from "../utils/themeUtils"

const Projects = () => {

    const { backgroundP2, textColor, bubbleColor } = useContext(themeContext)

    return (
        <div
            id='projects'
            className={`${backgroundP2} relative w-screen h-screen flex flex-wrap justify-center items-center`}>

            <Bubbles />

            <Link to="/projects" className={`w-56 h-56 flex items-center justify-center opacity-80 brightness-75 ${bubbleColor} ${colorTransition} rounded-full custom-animate-bounce mr-16 sm:mr-0 relative`}>
                <h1 className={`absolute top-1/2 w-full text-center font-extrabold ${textColor}`}>
                    <small className={`p-1 rounded-md bg-white text-black shadow-black shadow-inner`}>
                        Atsss
                    </small>
                </h1>
                <img src={barrel} className="" />
            </Link>
            <Link to="/projects" className={`w-56 h-56 flex items-center justify-center opacity-80 brightness-75 ${bubbleColor} ${colorTransition} rounded-full custom-animate-bounce ml-20 sm:ml-0 sm:mt-60 relative`}>
                <h1 className={`absolute top-1/2 w-full text-center font-extrabold ${textColor}`}>
                    <small className={`p-1 rounded-md bg-white text-black shadow-black shadow-inner`}>
                        Atsss
                    </small>
                </h1>
                <img src={barrel} className="" />
            </Link>
            <Link to="/projects" className={`w-56 h-56 flex items-center justify-center opacity-80 brightness-75 ${bubbleColor} ${colorTransition} rounded-full custom-animate-bounce mr-20 sm:mr-0 relative`}>
                <h1 className={`absolute top-1/2 w-full text-center font-extrabold ${textColor}`}>
                    <small className={`p-1 rounded-md bg-white text-black shadow-black shadow-inner`}>
                        Atsss
                    </small>
                </h1>
                <img src={barrel} className="" />
            </Link>

        </div>
    )
}

export default Projects