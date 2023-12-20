import { useContext, useEffect, useRef, useState } from 'react'
import maxo from '../assets/maxo.png'
import pfp from '../assets/pfp.jpg'
import { languageContext } from '../context/languageContext'
import AboutMePopUp from '../components/AboutMePopUp'
import { MdOutlineKeyboardDoubleArrowDown } from 'react-icons/md'
import waves from '../assets/waves.svg'
import { navbarContext } from '../context/navbarContext'
import { themeContext } from '../context/themeContext'

const Home = () => {

    const [image, setImage] = useState(maxo)

    const [isPopUpOpen, setIsPopUpOpen] = useState(false)

    const { backgroundP1, star } = useContext(themeContext)

    const { homePageText } = useContext(languageContext)
    const { setShowLogo } = useContext(navbarContext) // to show logo on navbar when scrolling

    const targetRef = useRef(null);

    useEffect(() => {
        const options = {
            root: null, // use the viewport as the root
            rootMargin: '0px',
            threshold: 0.5, // 0 to 1: ratio of target element's visibility
        };

        const callback = (entries: any) => {
            entries.forEach((entry: any) => {
                // If the target element is more than 50% out of view
                if (entry.isIntersecting) {
                    setShowLogo(false);
                } else {
                    setShowLogo(true);
                }
            });
        };

        const observer = new IntersectionObserver(callback, options);

        if (targetRef.current) {
            observer.observe(targetRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const handleTogglePopUp = () => {
        setIsPopUpOpen(!isPopUpOpen)
    }

    const handleChangeImage = () => {
        if (image === maxo) {
            setImage(pfp)
            return
        }
        setImage(maxo)
    }

    const onEscapePress = (event: any) => {
        if (event.keyCode === 27) {
            setIsPopUpOpen(false)
        }
    }

    return (
        <>
            {isPopUpOpen && <AboutMePopUp handleTogglePopUp={handleTogglePopUp} />}
            <div
                onKeyDown={onEscapePress}
                id="about"
                className={`${backgroundP1} w-screen h-screen relative flex sm:flex-row flex-col gap-5 px-5 py-10`}>
                <div
                    className='relative aspect-square w-52 h-52 flex justify-center items-center'>
                    <img
                        ref={targetRef}
                        onMouseEnter={handleChangeImage}
                        onMouseLeave={handleChangeImage}
                        onClick={handleChangeImage}
                        src={image}
                        alt="my picture"
                        className='object-cover w-52 h-52 rounded-full z-10' />
                    <div className='absolute w-32 h-32 bg-white rounded-full animate-ping'></div>
                </div>
                <div className='w-full sm:mt-16 sm:w-auto z-10'>
                    <h1>
                        &gt; {homePageText.title}
                        <br />
                        &gt; {homePageText.subTitle}
                    </h1>
                    <button
                        onClick={handleTogglePopUp}
                        className='bg-black text-white 
                        hover:bg-white hover:text-black transition-all duration-500 
                         p-2 rounded-lg mt-2'>
                        {homePageText.about}
                    </button>
                </div>
                <div className='absolute bottom-10 left-[45%] z-10 text-white animate-pulse'>
                    <MdOutlineKeyboardDoubleArrowDown className='text-5xl' />
                </div>

                <div className={`${star} shadow-2xl w-36 h-36 rounded-bl-full absolute top-0 right-0`}></div>
                <img src={waves} className='overflow-hidden absolute bottom-0 left-0 h-96 w-full object-cover z-0 saturate-200 brightness-[.65]'></img>
            </div>
        </>
    )
}

export default Home