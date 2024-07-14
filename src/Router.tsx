
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Contact from "./pages/Contact"
import Home from "./pages/Home"
import Projects from "./pages/Projects"
import Navbar from "./shared/Navbar"
import ProjectsByType from "./components/ProjectsByType"
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Router = () => {
    return (
        <BrowserRouter>
            <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} draggable pauseOnHover={false} theme="dark" transition={Flip} />
            <Navbar />
            <Routes>
                <Route path="/" element={
                    <div className="flex flex-wrap bg-dark-background-p3 overflow-x-hidden">
                        <Home />
                        <Projects />
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