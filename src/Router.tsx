import { HashRouter, Routes, Route } from "react-router-dom"
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dive from "./pages/Dive"

const Router = () => {
    return (
        <HashRouter>
            <ToastContainer
                position="top-right"
                autoClose={3200}
                hideProgressBar
                newestOnTop
                closeOnClick
                pauseOnHover
                draggable
                theme="dark"
                transition={Slide}
                style={{ top: '4.75rem' }} />
            <Routes>
                <Route path="*" element={<Dive />} />
            </Routes>
        </HashRouter>
    )
}

export default Router
