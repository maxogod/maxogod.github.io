import { useContext, useEffect, useState } from 'react'
import type { KeyboardEvent as ReactKeyboardEvent, MouseEvent as ReactMouseEvent, ReactNode } from 'react'

import { hasSeenNavbarHint, setCurrentLanguage, setCurrentTheme, setNavbarHintSeen } from '../utils/localStorage'

import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs'
import { TiArrowBackOutline as TbArrowBack } from 'react-icons/ti'
import { GiHamburgerMenu } from 'react-icons/gi'
import { FaQuestion, FaLaptop } from 'react-icons/fa'
import { IoMdMail } from 'react-icons/io'
import { IoLanguageSharp } from 'react-icons/io5'
import logo from '../assets/pokeball.png'
import { useLocation, useNavigate } from 'react-router-dom'

import { languageContext } from '../context/languageContext'
import { navbarContext } from '../context/navbarContext'
import { themeContext } from '../context/themeContext'
import { colorTransition } from '../utils/themeUtils'
import { Tooltip } from '@mui/material'

const icons: Record<string, ReactNode> = {
    '#about': <FaQuestion />,
    '#projects': <FaLaptop />,
    '#contact': <IoMdMail />,
}

const Navbar = () => {

    const [showPopup, setShowPopup] = useState(false)

    const navigate = useNavigate()
    const location = useLocation()

    const { showLogo: hasScrolledPastHero } = useContext(navbarContext)
    const { navbarGoBack } = useContext(languageContext)

    // Derived from the router rather than read off window.location.hash in an
    // effect, so it stays correct on navigation without any state syncing.
    const isSubRoute = location.pathname !== '/'
    const showBackButton = isSubRoute
    const showLogo = isSubRoute || hasScrolledPastHero

    const onEscapePress = (event: ReactKeyboardEvent<HTMLElement>) => {
        if (event.key === 'Escape') {
            setShowPopup(false)
        }
    }

    const handleLogoClick = () => {
        setShowPopup(false)

        if (!isSubRoute) {
            window.scrollTo({
                top: 0,
            });
            return
        }

        navigate('/')
    }

    const handleBack = () => {
        navigate(-1)
        setShowPopup(false)
    }

    // One-off hint that shows where the menu lives. It fires only on a visitor's
    // very first page open -- not on later visits, and not when coming back from a
    // project view. The flag is set when the tray actually opens rather than up
    // front, so StrictMode's double-invoked effect in dev does not consume it.
    useEffect(() => {
        if (isSubRoute || hasSeenNavbarHint()) return

        const timer = setTimeout(() => {
            setNavbarHintSeen()
            setShowPopup(true)
        }, 500)

        const timer_out = setTimeout(() => {
            setShowPopup(false);
        }, 5000);

        return () => {
            clearTimeout(timer)
            clearTimeout(timer_out)
            // Leaving the home route: drop the tray so it does not reappear on return.
            setShowPopup(false)
        }
    }, [isSubRoute])

    return (
        <nav
            onKeyDown={onEscapePress}
            className={`h-16 ${showLogo && 'bg-quaternary/5'}
             w-screen fixed z-20 flex ${showLogo ? 'justify-between' : 'justify-end'}
              items-center px-5 py-1`}>

            <div className='h-full flex gap-5'>
                {showLogo && <img
                    onClick={handleLogoClick}
                    src={logo}
                    alt="logo"
                    className='h-full cursor-pointer drop-shadow-lg' />}

                {showBackButton && <Tooltip title={navbarGoBack} placement="bottom" arrow>
                    <button
                        aria-label="Go back"
                        onClick={handleBack}
                        className='h-full'>
                        <TbArrowBack className='text-2xl text-white' />
                    </button>
                </Tooltip>}
            </div>

            {!showBackButton &&
                <button
                    aria-label="Open navigation menu"
                    onClick={() => setShowPopup(!showPopup)} className="h-full">
                    <GiHamburgerMenu className='text-2xl text-blue-800' />
                </button>
            }
            {showPopup && !isSubRoute && <NavbarPopup />}
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

    const handleOnClick = (e: ReactMouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()

        const targetId = e.currentTarget.getAttribute('href')?.substring(1);
        if (!targetId) return
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    }

    return (
        <div className={`${navbarTrayColor} ${colorTransition} rounded-md absolute top-10 right-10 w-36 flex gap-3 flex-wrap justify-end items-center px-5 py-2`}>
            <div className='w-full flex justify-center gap-3'>
                <button
                    aria-label="Change theme to light"
                    onClick={handleThemeChange}
                    disabled={!darkMode}>
                    <BsFillSunFill className={`text-2xl ${darkMode ? '' : 'text-gray-500'}`} />
                </button>
                <button
                    aria-label="Change theme to dark"
                    onClick={handleThemeChange}
                    disabled={darkMode}>
                    <BsFillMoonFill className={`text-2xl ${darkMode ? 'text-gray-500' : ''}`} />
                </button>
            </div>

            <hr className='bg-black h-[2px] opacity-20 w-full' />

            <button
                aria-label="Change language"
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
                            href={navbarLinks[key]}
                            className="w-full text-xs flex justify-center">
                            {key} {icons[navbarLinks[key]]}
                        </a>
                    </div>
                )
            }

        </div>
    )
}

export default Navbar
