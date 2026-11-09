import { useContext, useEffect, useLayoutEffect, useRef } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { CATEGORIES, CategoryId } from "../@types/ProjectType"
import { languageContext } from "../context/languageContext"
import { startDepthTracking, scrollToSection } from "../utils/depth"
import { Filter } from "../utils/projects"
import Hero from "./Hero"
import About from "./About"
import Projects from "./Projects"
import Contact from "./Contact"
import Abyss from "./Abyss"
import OceanLife from "../components/OceanLife"
import TopBar from "../components/TopBar"
import DepthGauge from "../components/DepthGauge"
import Logbook from "../components/Logbook"
import { SonarPing, Whale } from "../components/Overlays"
import { SkinOverlay } from "../components/SkinScenery"

// Routes: "/" and "/projects/:filter[/:slug]". The page never unmounts; the route only drives the
// project filter and which project's modal is open.
const parseRoute = (pathname: string): { filter: Filter, slug?: string } | null => {
    if (pathname === '/' || pathname === '') return { filter: 'all' }
    const match = pathname.match(/^\/projects\/([^/]+)(?:\/([^/]+))?\/?$/)
    if (!match) return null
    const [, filter, slug] = match
    if (filter !== 'all' && !CATEGORIES.includes(filter as CategoryId)) return null
    return { filter: filter as Filter, slug }
}

const Dive = () => {

    const { text } = useContext(languageContext)
    const location = useLocation()
    const route = parseRoute(location.pathname)
    const deepLinked = useRef(location.pathname !== '/')

    useEffect(() => startDepthTracking(), [])

    // Opening a /projects/... link directly lands on the projects section.
    useLayoutEffect(() => {
        if (!deepLinked.current) return
        deepLinked.current = false
        document.getElementById('projects')?.scrollIntoView()
    }, [])

    if (!route) return <Navigate to="/" replace />

    return (
        <>
            <button
                type="button"
                onClick={() => scrollToSection('projects')}
                className="sr-only fixed top-3 left-3 z-50 rounded-full bg-signal px-4 py-2 font-semibold text-ink focus:not-sr-only">
                {text.nav.skip}
            </button>
            <OceanLife />
            <TopBar />
            <DepthGauge />
            <main>
                <Hero />
                <About />
                <Projects filter={route.filter} slug={route.slug} />
                <Contact />
                <Abyss />
            </main>
            <SonarPing />
            <Whale />
            <Logbook />
            <SkinOverlay />
        </>
    )
}

export default Dive
