import { useContext, useState } from 'react'

import { isDarkModeOn, setCurrentLanguage, setCurrentTheme } from '../utils/localStorage'

import { BsFillSunFill } from 'react-icons/bs'
import { BsFillMoonFill } from 'react-icons/bs'
import { GiHamburgerMenu } from 'react-icons/gi'
import { languageContext } from '../context/languageContext'

const Navbar = () => {

    const [showPopup, setShowPopup] = useState(false)

    return (
        <div className="h-12 w-screen fixed top-0 left-0 flex justify-end items-center px-5 py-1">
            <button onClick={() => setShowPopup(!showPopup)} className="h-full">
                <GiHamburgerMenu className='text-2xl text-blue-800' />
            </button>
            {showPopup && <NavbarPopup />}
        </div>
    )
}

function NavbarPopup() {

    const [darkMode, setDarkMode] = useState(isDarkModeOn())

    const { englishMode, setEnglishMode, navbarLinks } = useContext(languageContext)

    const handleThemeChange = () => {
        setDarkMode(!darkMode)
        setCurrentTheme(!darkMode) // update localstorage
    }

    const handleLanguageChange = () => {
        setEnglishMode(!englishMode)
        setCurrentLanguage(!englishMode)
    }

    return (
        <div className="bg-white rounded-md absolute top-10 w-36 flex gap-3 flex-wrap justify-end items-center px-5 py-2">
            <div className='w-full flex justify-center gap-3'>
                <button
                    onClick={handleThemeChange}
                    disabled={!darkMode}>
                    <BsFillSunFill className={`text-2xl ${darkMode ? 'text-blue-800' : 'text-gray-500'}`} />
                </button>
                <button
                    onClick={handleThemeChange}
                    disabled={darkMode}>
                    <BsFillMoonFill className={`text-2xl ${darkMode ? 'text-gray-500' : 'text-blue-800'}`} />
                </button>
            </div>

            <hr className='text-black w-full' />

            <button
                onClick={handleLanguageChange}
                className="w-full text-xs flex justify-center text-blue-800">
                {englishMode ? 'cambiar a ES' : 'switch to EN'}
            </button>

            {
                Object.keys(navbarLinks).map((key: string, index: number) =>
                    <div
                        key={index}
                        className='flex w-full gap-3 flex-wrap justify-end items-center'>
                        <hr className='text-black w-full' />
                        <a
                            href={(navbarLinks as any)[key]}
                            className="w-full text-xs flex justify-center text-blue-800">
                            {key}
                        </a>
                    </div>
                )
            }

        </div>
    )
}

export default Navbar