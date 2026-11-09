import { useContext } from "react"
import { FaGithub } from "react-icons/fa"
import { LuExternalLink } from "react-icons/lu"
import { Project } from "../@types/ProjectType"
import { languageContext } from "../context/languageContext"
import { excerpt } from "../utils/description"
import TechTags from "./TechTags"

interface ProjectCardProps {
    project: Project,
    featured?: boolean,
    showCategory?: boolean,
    onOpen: (project: Project) => void,
}

const ProjectCard = ({ project, featured = false, showCategory = false, onOpen }: ProjectCardProps) => {

    const { text } = useContext(languageContext)

    return (
        <li className={featured ? 'sm:col-span-2 lg:row-span-2' : ''}>
            <button
                type="button"
                onClick={() => onOpen(project)}
                aria-label={`${text.projects.open}: ${project.name}`}
                className="group relative flex size-full flex-col overflow-hidden rounded-[22px] bg-midnight/55 text-left ring-1 ring-white/10 transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[0_0_0_1px_var(--color-glow),0_20px_50px_-18px_color-mix(in_oklab,var(--color-glow)_55%,transparent)] focus-visible:shadow-[0_0_0_1px_var(--color-glow)]">
                <div className={`relative overflow-hidden bg-abyss ${featured ? 'aspect-[16/10] lg:aspect-auto lg:flex-1' : 'aspect-[16/10]'}`}>
                    <img
                        src={project.image}
                        alt=""
                        loading="lazy" decoding="async"
                        className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
                    <span aria-hidden className="absolute inset-0 bg-linear-to-t from-midnight via-midnight/10 to-transparent" />
                    {featured && (
                        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6 sm:p-8">
                            {showCategory && <span className="text-sm text-glow">{text.projects.categories[project.category]}</span>}
                            <h3 className="text-3xl leading-none font-bold tracking-tight sm:text-5xl">{project.name}</h3>
                            <p className="line-clamp-2 max-w-[56ch] text-foam/80 sm:text-lg">{excerpt(project.description)}</p>
                        </div>
                    )}
                </div>
                <div className={`flex flex-col gap-3 ${featured ? 'px-6 pb-6 sm:px-8 sm:pb-8' : 'p-5'}`}>
                    {!featured && (
                        <div className="flex flex-col gap-1">
                            {showCategory && <span className="text-xs text-glow/90">{text.projects.short[project.category]}</span>}
                            <h3 className="text-xl leading-tight font-semibold">{project.name}</h3>
                        </div>
                    )}
                    <TechTags technologies={project.technologies} max={featured ? undefined : 3} />
                </div>
            </button>
        </li>
    )
}

/** Closing tile linking to the GitHub profile (the `more: true` entry in the data). */
export const MoreCard = ({ project }: { project: Project }) => {

    const { text } = useContext(languageContext)

    return (
        <li>
            <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="group flex size-full min-h-56 flex-col justify-between gap-6 rounded-[22px] border border-dashed border-glow/35 p-6 transition-colors duration-300 hover:border-glow hover:bg-glow/5">
                <FaGithub aria-hidden className="text-4xl text-glow" />
                <span className="flex flex-col gap-1">
                    <span className="flex items-center gap-2 text-xl font-semibold">
                        {text.projects.more}
                        <LuExternalLink aria-hidden className="text-base text-foam/60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                    <span className="text-sm text-foam/65">{text.projects.moreText}</span>
                </span>
            </a>
        </li>
    )
}

export default ProjectCard
