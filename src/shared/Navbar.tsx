import { useContext, useState } from 'react'

import { setCurrentLanguage, setCurrentTheme } from '../utils/localStorage'

import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs'
import { GiHamburgerMenu } from 'react-icons/gi'
import { FaQuestion, FaLaptop, FaStar } from 'react-icons/fa'
import { IoMdMail } from 'react-icons/io'
import { IoLanguageSharp } from 'react-icons/io5'
import logo from '../assets/poke.png'

import { languageContext } from '../context/languageContext'
import { navbarContext } from '../context/navbarContext'
import { themeContext } from '../context/themeContext'
import { colorTransition } from '../utils/themeUtils'

const icons = {
    '#about': <FaQuestion />,
    '#projects': <FaLaptop />,
    '#enjoy': <FaStar />,
    '#contact': <IoMdMail />,
}

const Navbar = () => {

    const [showPopup, setShowPopup] = useState(false)

    const { showLogo } = useContext(navbarContext)

    const onEscapePress = (event: any) => {
        if (event.keyCode === 27) {
            setShowPopup(false)
        }
    }

    const handleLogoClick = () => {
        window.scrollTo({
            top: 0,
        });
        setShowPopup(false)
    }

    return (
        <nav
            onKeyDown={onEscapePress}
            className={`h-12 ${showLogo && 'bg-quaternary bg-opacity-5'}
             w-screen fixed z-20 flex ${showLogo ? 'justify-between' : 'justify-end'}
              items-center px-5 py-1`}>

            {showLogo && <img
                onClick={handleLogoClick}
                src={logo}
                alt="logo"
                className='h-full cursor-pointer drop-shadow-2xl' />}

            <button onClick={() => setShowPopup(!showPopup)} className="h-full">
                <GiHamburgerMenu className='text-2xl text-blue-800' />
            </button>
            {showPopup && <NavbarPopup />}
        </nav>
    )
}

function NavbarPopup() {

    const { darkMode, setDarkMode, navbarTrayColor } = useContext(themeContext)
    const { englishMode, setEnglishMode, navbarLinks } = useContext(languageContext)

    const handleThemeChange = () => {
        setDarkMode(!darkMode)
        setCurrentTheme(!darkMode) // update localstorage
    }

    const handleLanguageChange = () => {
        setEnglishMode(!englishMode)
        setCurrentLanguage(!englishMode)
    }

    const handleOnClick = (e: any) => {
        e.preventDefault()

        const targetId = e.currentTarget.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    }

    return (
        <div className={`${navbarTrayColor} ${colorTransition} bg-opacity-70 rounded-md absolute top-10 right-10 w-36 flex gap-3 flex-wrap justify-end items-center px-5 py-2`}>
            <div className='w-full flex justify-center gap-3'>
                <button
                    onClick={handleThemeChange}
                    disabled={!darkMode}>
                    <BsFillSunFill className={`text-2xl ${darkMode ? '' : 'text-gray-500'}`} />
                </button>
                <button
                    onClick={handleThemeChange}
                    disabled={darkMode}>
                    <BsFillMoonFill className={`text-2xl ${darkMode ? 'text-gray-500' : ''}`} />
                </button>
            </div>

            <hr className='bg-black h-[2px] opacity-20 w-full' />

            <button
                onClick={handleLanguageChange}
                className="w-full text-xs flex justify-center">
                {englishMode ? 'Español' : 'English'} <IoLanguageSharp />
            </button>

            {
                Object.keys(navbarLinks).map((key: string, index: number) =>
                    <div
                        key={index}
                        className='flex w-full gap-3 flex-wrap justify-end items-center'>
                        <hr className='bg-black h-[2px] opacity-20 w-full' />
                        <a
                            onClick={handleOnClick}
                            href={(navbarLinks as any)[key]}
                            className="w-full text-xs flex justify-center">
                            {key} {(icons as any)[(navbarLinks as any)[key]]}
                        </a>
                    </div>
                )
            }

        </div>
    )
}

export default Navbar