import { useContext } from "react"
import { themeContext } from "../context/themeContext"
import { colorTransition } from "../utils/themeUtils"
import Tooltip from '@mui/material/Tooltip';

import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { IoDocument } from "react-icons/io5";
import { toast } from 'react-toastify';
import { languageContext } from "../context/languageContext";

const Contact = () => {

    const { backgroundP3, backgroundP4, textColor, bubbleColor } = useContext(themeContext)
    const { englishMode } = useContext(languageContext)

    const link = {
        gh: { icon: <FaGithub />, text: 'Github', link: "https://github.com/maxogod" },
        ln: { icon: <FaLinkedin />, text: 'Linkedin', link: "https://www.linkedin.com/in/maximo-utrera/" },
        em: { icon: <IoMdMail />, text: englishMode ? 'Copy Email' : 'Copiar Email', link: "maxi18wars@gmail.com" },
        cv: { icon: <IoDocument />, text: 'CV', link: englishMode ? "https://maxogod.github.io/projects-img/Maximo%20Utrera%20CV.pdf" : "https://maxogod.github.io/projects-img/Maximo%20Utrera%20CV%20-%20Español.pdf" },
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(
            () => {
                toast.success(englishMode ? "Email copied!" : "Email copiado!", { theme: "colored", hideProgressBar: false, autoClose: 2000 })
            }
        )
    }

    return (
        <div
            id='contact'
            className={`${backgroundP3} w-screen h-screen flex flex-col justify-center items-center relative`}>

            <h2 className={`${textColor} text-4xl font-bold p-5`}>{englishMode ? "Contact me!" : "Contactame!"}</h2>
            <div className="w-full flex justify-center items-center gap-5">
                <Tooltip key={1} title={link.gh.text} placement="top" arrow>
                    <a className={`w-16 h-16 flex items-center hover:brightness-110 justify-center opacity-80 brightness-75 ${bubbleColor} ${colorTransition} relative rounded-xl text-white text-3xl`}
                        href={link.gh.link} target="_blank">
                        {link.gh.icon}
                    </a>
                </Tooltip>

                <Tooltip key={2} title={link.ln.text} placement="top" arrow>
                    <a className={`w-16 h-16 flex items-center hover:brightness-110 justify-center opacity-80 brightness-75 ${bubbleColor} ${colorTransition} relative rounded-xl text-white text-3xl`}
                        href={link.ln.link} target="_blank">
                        {link.ln.icon}
                    </a>
                </Tooltip>

                <Tooltip key={3} title={link.em.text} placement="top" arrow>
                    <button className={`w-16 h-16 flex items-center hover:brightness-110 justify-center opacity-80 brightness-75 ${bubbleColor} ${colorTransition} relative rounded-xl text-white text-3xl cursor-pointer`}
                        onClick={() => copyToClipboard(link.em.link)}>
                        {link.em.icon}
                    </button>
                </Tooltip>

                <Tooltip key={4} title={link.cv.text} placement="top" arrow>
                    <a className={`w-16 h-16 flex items-center hover:brightness-110 justify-center opacity-80 brightness-75 ${bubbleColor} ${colorTransition} relative rounded-xl text-white text-3xl`}
                        href={link.cv.link} target="_blank">
                        {link.cv.icon}
                    </a>
                </Tooltip>
            </div>

            <div className={`${backgroundP4} h-24 w-full absolute bottom-0`}>
            </div>

        </div>
    )
}

export default Contact