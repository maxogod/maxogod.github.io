
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Contact from "./pages/Contact"
import Enjoy from "./pages/Enjoy"
import Home from "./pages/Home"
import Projects from "./pages/Projects"
import Navbar from "./shared/Navbar"
import ProjectsByType from "./components/ProjectsByType"

const Router = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={
                    <div className="flex flex-wrap bg-dark-background-p3 overflow-x-hidden">
                        <Home />
                        <Projects />
                        <Enjoy />
                        <Contact />
                    </div>
                } />
                <Route path="/projects/:projectType" element={<ProjectsByType />} />
                <Route path="*" element={<div>404</div>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router