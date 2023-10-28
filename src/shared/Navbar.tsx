import { useState } from 'react'

import { isDarkModeOn } from '../utils/localStorage'

import { BsFillSunFill } from 'react-icons/bs'
import { BsFillMoonFill } from 'react-icons/bs'
import { GiHamburgerMenu } from 'react-icons/gi'

const Navbar = () => {

    const [showPopup, setShowPopup] = useState(true)

    return (
        <div className="h-12 flex justify-end items-center px-5 py-1">
            <button onClick={() => setShowPopup(!showPopup)} className="h-full">
                <GiHamburgerMenu className='text-2xl text-blue-800' />
            </button>
            {showPopup && <NavbarPopup />}
        </div>
    )
}

function NavbarPopup() {

    const [darkMode, setDarkMode] = useState(isDarkModeOn())


    const handleThemeChange = () => {
        setDarkMode(!darkMode)
    }

    return (
        <div className="bg-white absolute top-10 flex justify-end items-center px-5 py-1">
            <button onClick={handleThemeChange} className="h-full">
                {darkMode ? <BsFillSunFill className='text-2xl text-blue-800' /> : <BsFillMoonFill className='text-2xl text-blue-800' />}
            </button>
        </div>
    )
}

export default Navbar