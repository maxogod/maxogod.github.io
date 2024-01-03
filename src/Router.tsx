
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Contact from "./pages/Contact"
import Enjoy from "./pages/Enjoy"
import Home from "./pages/Home"
import Projects from "./pages/Projects"
import Navbar from "./shared/Navbar"

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <>
                        <Navbar />
                        <div className="flex flex-wrap bg-dark-background-p3 overflow-x-hidden">
                            <Home />
                            <Projects />
                            <Enjoy />
                            <Contact />
                        </div>
                    </>
                } />
                <Route path="/projects" element={<div>hi</div>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router