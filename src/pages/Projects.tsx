import { useContext, useMemo, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { CATEGORIES, Project } from "../@types/ProjectType"
import { languageContext } from "../context/languageContext"
import { gameContext } from "../context/gameContext"
import { Filter, findMoreCard, listProjects, PROJECTS_PER_PAGE, projectPath } from "../utils/projects"
import { useIsMobile } from "../hooks/useIsMobile"
import SectionHeading from "../components/SectionHeading"
import ProjectCard, { MoreCard } from "../components/ProjectCard"
import ProjectModal from "../components/ProjectModal"
import Treasure from "../components/Treasure"

const Projects = ({ filter, slug }: { filter: Filter, slug?: string }) => {

    const { text, projects } = useContext(languageContext)
    const { openProject } = useContext(gameContext)
    const navigate = useNavigate()
    const openedFromPage = useRef(false)

    const list = useMemo(() => listProjects(projects, filter), [projects, filter])
    const moreCard = useMemo(() => findMoreCard(projects), [projects])
    const counts = useMemo(() => ({
        all: listProjects(projects, 'all').length,
        ...Object.fromEntries(CATEGORIES.map(c => [c, listProjects(projects, c).length])),
    }) as Record<Filter, number>, [projects])

    const isMobile = useIsMobile()
    const pageSize = isMobile ? PROJECTS_PER_PAGE.mobile : PROJECTS_PER_PAGE.desktop
    const [paging, setPaging] = useState({ filter, pages: 1 })
    const pages = paging.filter === filter ? paging.pages : 1
    // A deep-linked project beyond the first page must still be rendered.
    const linkedIndex = slug ? list.findIndex(p => p.slug === slug) : -1
    const visibleCount = Math.max(pages * pageSize, linkedIndex + 1)
    const visible = list.slice(0, visibleCount)
    const remaining = list.length - visible.length

    const selected = slug ? list.find(p => p.slug === slug) ?? null : null

    const open = (project: Project) => {
        openedFromPage.current = true
        openProject(project.slug)
        navigate(projectPath(filter, project.slug))
    }

    const navigateTo = (project: Project) => {
        openProject(project.slug)
        navigate(projectPath(filter, project.slug), { replace: true })
    }

    const close = () => {
        // Pop the history entry we pushed when opening, so Back doesn't reopen the modal.
        if (openedFromPage.current) {
            openedFromPage.current = false
            navigate(-1)
        } else {
            navigate(projectPath(filter), { replace: true })
        }
    }

    const filters: Filter[] = ['all', ...CATEGORIES]

    return (
        <section id="projects" aria-labelledby="projects-title" className="water-projects relative px-5 pt-24 pb-28 sm:px-10 sm:pt-32 sm:pb-36 lg:px-16">
            <div className="relative z-10 mx-auto max-w-6xl">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <SectionHeading id="projects-title" depth={200} zone="twilight" title={text.projects.title} />
                    <p className="max-w-[46ch] text-lg text-foam/80">{text.projects.intro}</p>
                </div>

                <div role="group" aria-label={text.projects.title} className="mt-12 -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
                    {filters.map(f => {
                        const active = f === filter
                        return (
                            <button
                                key={f}
                                type="button"
                                aria-pressed={active}
                                onClick={() => navigate(projectPath(f), { replace: true })}
                                className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${active
                                    ? 'bg-foam text-ink'
                                    : 'bg-white/6 text-foam/80 ring-1 ring-white/12 hover:bg-white/12 hover:text-foam'}`}>
                                {f === 'all' ? text.projects.all : text.projects.short[f]}
                                <span className={`font-gauge text-[0.7rem] ${active ? 'text-ink/60' : 'text-foam/45'}`}>{counts[f]}</span>
                            </button>
                        )
                    })}
                </div>

                {filter !== 'all' && (
                    <p className="mt-6 text-sm text-foam/60">{text.projects.categories[filter]}</p>
                )}

                <ul className="mt-8 grid auto-rows-auto gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {visible.map((project, i) => (
                        <ProjectCard
                            key={`${project.category}-${project.slug}`}
                            project={project}
                            featured={i === 0}
                            showCategory={filter === 'all'}
                            onOpen={open} />
                    ))}
                    {moreCard && remaining === 0 && <MoreCard project={moreCard} />}
                </ul>

                {remaining > 0 && (
                    <div className="mt-10 flex justify-center">
                        <button
                            type="button"
                            onClick={() => setPaging({ filter, pages: Math.ceil(visibleCount / pageSize) + 1 })}
                            className="inline-flex items-center gap-2 rounded-full bg-white/6 px-6 py-3 text-sm font-medium text-foam/90 ring-1 ring-white/12 transition-colors duration-200 hover:bg-white/12 hover:text-foam">
                            {text.projects.loadMore}
                            <span className="font-gauge text-[0.7rem] text-foam/45">{remaining}</span>
                        </button>
                    </div>
                )}
            </div>

            <Treasure id="pearl" className="right-[4%] bottom-12 sm:right-[8%]" />

            <ProjectModal project={selected} list={list} onClose={close} onNavigate={navigateTo} />
        </section>
    )
}

export default Projects
