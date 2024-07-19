import { useContext, useState } from "react"
import { themeContext } from "../context/themeContext"
import ProjectType from "../@types/ProjectType"
import { FaLink } from "react-icons/fa"
import { MdVideoLibrary } from "react-icons/md";
import { LuSwords } from 'react-icons/lu'
import { technologyColors } from "../utils/projects"

const ProjectListPopUp = (
    { title, projectList }:
        {
            title: string,
            projectList: ProjectType[],
        }
) => {

    const [expandImage, setExpandImage] = useState('')
    const { popUpColor } = useContext(themeContext)

    return (
        <>
            {expandImage !== '' && (
                <div className="z-20 w-full h-full bg-black bg-opacity-80 fixed top-0 left-0 flex justify-center items-center">
                    <div className="relative">
                        <img src={expandImage} alt={expandImage} className="w-96 sm:w-[35rem] aspect-auto object-cover rounded-xl" />
                        <LuSwords
                            className=' absolute top-0 left-0 bg-red-400 text-black hover:text-white ease-in-out duration-300 w-10 text-center rounded-tl-full rounded-r-full h-6 cursor-pointer'
                            onClick={() => setExpandImage('')} />
                    </div>
                </div>
            )}
            <div className='w-screen h-screen fixed p-2 py-16 sm:p-16'>
                <div className={`${popUpColor} rounded-md bg-opacity-80
            overflow-y-hidden px-3 py-12 sm:p-10 w-full h-full`}>
                    <h1 className="-mt-5 mb-2 text-2xl">{title}</h1>

                    <ul className="h-full w-fit flex gap-5 overflow-x-scroll overflow-y-hidden">
                        {projectList.map((project, index) => (
                            <ProjectThumbnail key={index} project={project} setExpandImage={setExpandImage} />
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

const ProjectThumbnail = ({ project, setExpandImage }:
    { project: ProjectType, setExpandImage: (image: string) => void }) => {

    const handleExpandImage = (image: string) => {
        setExpandImage(image)
    }

    return (
        <div className='w-60 sm:72 md:96 h-full overflow-y-scroll rounded-2xl p-4 bg-opacity-20 bg-slate-400'>

            <div className="w-full relative">
                <img src={project.image} alt={project.name + ' image'}
                    onClick={() => handleExpandImage(project.image)}
                    className="rounded-2xl w-full h-36 sm:h-48 object-cover cursor-pointer hover:brightness-110 duration-200" />

                <div className="absolute bottom-2 right-2 flex gap-1 items-center text-white">
                    {
                        project.vid != '' && (
                            <a
                                target="_blank"
                                href={project.vid}
                                className="bg-black p-3 rounded-2xl bg-opacity-60">
                                <MdVideoLibrary className='hover:rotate-[360deg] duration-300' />
                            </a>
                        )
                    }
                    <a
                        target="_blank"
                        href={project.url}
                        className="bg-black  p-3 rounded-2xl bg-opacity-60">
                        <FaLink className='hover:rotate-180 duration-200' />
                    </a>
                </div>
            </div>

            <div className="flex flex-wrap gap-1 mt-1">
                {project.technologies.map((technology, index) => (
                    <span key={index} className={`text-xs shadow-sm shadow-black text-slate-900 ${technologyColors[technology]} px-2 py-1 rounded-md`}>{technology}</span>
                ))}
            </div>

            <h1>{project.name}</h1>
            <hr />
            <p className="text-xs">{project.description}</p>

        </div>
    )
}

export default ProjectListPopUp