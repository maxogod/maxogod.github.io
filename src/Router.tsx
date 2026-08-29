
import { useEffect } from "react"
import { HashRouter, Routes, Route } from "react-router-dom"
import Contact from "./pages/Contact"
import Home from "./pages/Home"
import Projects from "./pages/Projects"
import Navbar from "./shared/Navbar"
import ProjectsByType from "./components/ProjectsByType"
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HOME_SCROLL_KEY = 'homeScrollY'

// The home route is one long scrolling page, so leaving it for a project view and
// coming back should land exactly where the visitor was. The browser's own
// restoration is disabled in main.tsx, and :root has `scroll-behavior: smooth`,
// so the position is restored explicitly and instantly instead of animating.
const HomeSections = () => {
    useEffect(() => {
        const saved = sessionStorage.getItem(HOME_SCROLL_KEY)
        if (saved) {
            window.scrollTo({ top: Number(saved), behavior: 'instant' })
        }
        return () => {
            sessionStorage.setItem(HOME_SCROLL_KEY, String(window.scrollY))
        }
    }, [])

    return (
        <div className="flex flex-wrap bg-dark-background-p3 overflow-x-hidden">
            <Home />
            <Projects />
            <Contact />
        </div>
    )
}

const Router = () => {
    return (
        <HashRouter>
            <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} draggable pauseOnHover={false} theme="dark" transition={Flip} />
            <Navbar />
            <Routes>
                <Route path="/" element={<HomeSections />} />
                <Route path="/projects/:projectType" element={<ProjectsByType />} />
                <Route path="*" element={<div>404</div>} />
            </Routes>
        </HashRouter>
    )
}

export default Router
