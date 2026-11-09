import { KeyboardEvent, useContext, useEffect, useRef } from "react"
import { FaGithub, FaYoutube } from "react-icons/fa"
import { LuChevronLeft, LuChevronRight, LuLink, LuX } from "react-icons/lu"
import { Project } from "../@types/ProjectType"
import { languageContext } from "../context/languageContext"
import { formatDescription } from "../utils/description"
import { fill } from "../utils/languageUtils"
import TechTags from "./TechTags"

interface ProjectModalProps {
    project: Project | null,
    list: Project[],
    onClose: () => void,
    onNavigate: (project: Project) => void,
}

const ProjectModal = ({ project, list, onClose, onNavigate }: ProjectModalProps) => {

    const { text } = useContext(languageContext)
    const dialogRef = useRef<HTMLDialogElement>(null)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const dialog = dialogRef.current
        if (!dialog) return
        if (project && !dialog.open) dialog.showModal()
        if (!project && dialog.open) dialog.close()
        document.documentElement.classList.toggle('overflow-hidden', Boolean(project))
    }, [project])

    useEffect(() => () => document.documentElement.classList.remove('overflow-hidden'), [])

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: 0 })
    }, [project?.slug])

    const index = project ? list.findIndex(p => p.slug === project.slug) : -1
    const previous = index > 0 ? list[index - 1] : null
    const next = index >= 0 && index < list.length - 1 ? list[index + 1] : null

    const onKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
        if (event.key === 'ArrowLeft' && previous) onNavigate(previous)
        if (event.key === 'ArrowRight' && next) onNavigate(next)
    }

    const isGithub = project?.url.includes('github.com')

    return (
        <dialog
            ref={dialogRef}
            aria-labelledby="project-title"
            onCancel={event => { event.preventDefault(); onClose() }}
            onKeyDown={onKeyDown}
            onClick={event => { if (event.target === dialogRef.current) onClose() }}
            className="project-dialog m-0 h-dvh max-h-none w-screen max-w-none overflow-hidden bg-midnight p-0 text-foam sm:m-auto sm:h-[min(48rem,calc(100dvh-3rem))] sm:w-[min(74rem,calc(100vw-3rem))] sm:rounded-[28px] sm:ring-1 sm:ring-glow/20">
            {project && (
                <div className="flex h-full flex-col lg:flex-row">
                    <div className="relative h-60 shrink-0 overflow-hidden bg-abyss sm:h-72 lg:h-full lg:w-[52%]">
                        <img src={project.image} alt="" aria-hidden className="absolute inset-0 size-full scale-110 object-cover opacity-45 blur-2xl" />
                        <img src={project.image} alt={project.name} className="relative size-full object-contain p-4 lg:p-8" />
                    </div>

                    <div className="flex min-h-0 min-w-0 flex-1 flex-col">
                        <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto px-6 pt-8 pb-6 sm:px-10 sm:pt-10">
                            <div className="flex items-center justify-between gap-4 pr-12 text-sm">
                                <span className="text-glow">{text.projects.categories[project.category]}</span>
                                {index >= 0 && <span className="font-gauge text-xs text-foam/55">{fill(text.projects.position, { n: index + 1, total: list.length })}</span>}
                            </div>
                            <h2 id="project-title" className="mt-3 text-4xl leading-[0.95] font-bold tracking-[-0.03em] sm:text-5xl">{project.name}</h2>

                            {(project.url || project.vid) && (
                                <div className="mt-6 flex flex-wrap gap-3">
                                    {project.url && (
                                        <a href={project.url} target="_blank" rel="noreferrer"
                                            className="inline-flex items-center gap-2 rounded-full bg-signal px-5 py-2.5 font-semibold text-ink transition-transform hover:-translate-y-0.5">
                                            {isGithub ? <FaGithub aria-hidden /> : <LuLink aria-hidden />} {text.projects.code}
                                        </a>
                                    )}
                                    {project.vid && (
                                        <a href={project.vid} target="_blank" rel="noreferrer"
                                            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-semibold ring-1 ring-foam/30 transition-colors hover:bg-white/8 hover:ring-foam/60">
                                            <FaYoutube aria-hidden className="text-coral" /> {text.projects.video}
                                        </a>
                                    )}
                                </div>
                            )}

                            {project.technologies.length > 0 && (
                                <div className="mt-8">
                                    <h3 className="text-sm text-foam/60">{text.projects.builtWith}</h3>
                                    <div className="mt-2"><TechTags technologies={project.technologies} size="md" /></div>
                                </div>
                            )}

                            <div
                                className="project-log mt-8 max-w-[64ch] leading-relaxed text-foam/85"
                                // Descriptions come from our own YAML (trusted HTML).
                                dangerouslySetInnerHTML={{ __html: formatDescription(project.description) }} />
                        </div>

                        <nav aria-label={text.projects.title} className="flex shrink-0 items-stretch gap-2 border-t border-white/10 p-3 sm:p-4">
                            <button type="button" disabled={!previous} onClick={() => previous && onNavigate(previous)}
                                aria-label={text.projects.previous}
                                className="flex min-w-0 flex-1 items-center gap-2 rounded-2xl px-3 py-2 text-left transition-colors hover:bg-white/6 disabled:opacity-30">
                                <LuChevronLeft aria-hidden className="shrink-0 text-xl" />
                                <span className="truncate text-sm">{previous?.name}</span>
                            </button>
                            <button type="button" disabled={!next} onClick={() => next && onNavigate(next)}
                                aria-label={text.projects.next}
                                className="flex min-w-0 flex-1 items-center justify-end gap-2 rounded-2xl px-3 py-2 text-right transition-colors hover:bg-white/6 disabled:opacity-30">
                                <span className="truncate text-sm">{next?.name}</span>
                                <LuChevronRight aria-hidden className="shrink-0 text-xl" />
                            </button>
                        </nav>
                    </div>

                    <button type="button" onClick={onClose} aria-label={text.projects.close} autoFocus
                        className="glass absolute top-4 right-4 grid size-11 place-items-center rounded-full text-xl ring-1 ring-white/15 transition-colors hover:bg-white/15">
                        <LuX aria-hidden />
                    </button>
                </div>
            )}
        </dialog>
    )
}

export default ProjectModal
