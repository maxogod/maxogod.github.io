
import { useLayoutEffect } from "react"
import { HashRouter, Routes, Route } from "react-router-dom"
import Contact from "./pages/Contact"
import Home from "./pages/Home"
import Projects from "./pages/Projects"
import Navbar from "./shared/Navbar"
import ProjectsByType from "./components/ProjectsByType"
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let homeScrollY = 0

const HomeSections = () => {
    useLayoutEffect(() => {
        window.scrollTo(0, homeScrollY)
        const remember = () => { homeScrollY = window.scrollY }
        window.addEventListener('scroll', remember)
        return () => window.removeEventListener('scroll', remember)
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
