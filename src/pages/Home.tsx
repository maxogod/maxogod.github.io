import { useContext, useEffect, useRef, useState } from 'react'
import maxo from '../assets/maxo.png'
import pfp from '../assets/pfp.jpg'
import { languageContext } from '../context/languageContext'
import AboutMePopUp from '../components/AboutMePopUp'
import { MdOutlineKeyboardDoubleArrowDown } from 'react-icons/md'
import wavesSvg from '../assets/waves.svg'
import starsSvg from '../assets/stars.svg'
import { navbarContext } from '../context/navbarContext'
import { themeContext } from '../context/themeContext'
import { colorTransition } from '../utils/themeUtils'

const Home = () => {

    const [image, setImage] = useState(maxo)

    const [isPopUpOpen, setIsPopUpOpen] = useState(false)

    const { backgroundP1, star, waves, accentColor, textColor, buttonColor } = useContext(themeContext)
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
        if (isPopUpOpen) {
            document.getElementById('body')?.classList.remove('overflow-hidden');
        } else {
            document.getElementById('body')?.classList.add('overflow-hidden');
        }
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
                className={`${backgroundP1} ${colorTransition} w-screen h-screen relative flex sm:flex-row flex-col gap-5 px-5 py-10`}>
                <div
                    className='relative aspect-square w-40 h-40 sm:w-52 sm:h-52 flex justify-center items-center'>
                    <img
                        ref={targetRef}
                        onMouseEnter={handleChangeImage}
                        onMouseLeave={handleChangeImage}
                        onClick={handleChangeImage}
                        src={image}
                        alt="my picture"
                        className='object-cover w-40 h-40 sm:w-52 sm:h-52 rounded-full z-10' />
                    <div className={`${accentColor} ${colorTransition} absolute w-24 h-24 sm:w-32 sm:h-32 rounded-full animate-ping`}></div>
                </div>
                <div className={`w-full sm:mt-16 sm:w-auto z-10 ${textColor} ${colorTransition}`}>
                    <h1>
                        &gt; {homePageText.title}
                        <br />
                        &gt; {homePageText.subTitle}
                    </h1>
                    <button
                        aria-label="about me section"
                        onClick={handleTogglePopUp}
                        className={`${buttonColor} p-2 rounded-3xl mt-2`}>
                        {homePageText.about}
                    </button>
                </div>
                <div className='absolute bottom-10 left-[45%] text-white z-10 animate-pulse'>
                    <MdOutlineKeyboardDoubleArrowDown className='text-5xl' />
                </div>

                <div className={`${star} ${colorTransition} shadow-2xl w-36 h-36 rounded-bl-full absolute top-0 right-0 z-10`}></div>

                <img alt='stars' src={starsSvg} className={`${colorTransition} overflow-hidden opacity-60 animate-pulse w-56 absolute top-2 left-1/4 z-0 p-5`}></img>
                <img alt='stars' src={starsSvg} className={`${colorTransition} overflow-hidden opacity-60 animate-pulse w-56 absolute top-32 left-1/3 z-0 p-20`}></img>
                <img alt='stars' src={starsSvg} className={`${colorTransition} overflow-hidden opacity-60 animate-pulse w-56 absolute -top-10 left-1/2 z-0 p-16`}></img>
                <img alt='stars' src={starsSvg} className={`${colorTransition} overflow-hidden opacity-60 animate-pulse w-56 absolute top-11 left-2/3 z-0 p-11`}></img>

                <img alt='waves' src={wavesSvg} className={`${waves} ${colorTransition} overflow-visible absolute bottom-0 left-0 h-96 w-full object-cover z-0`}></img>
            </div>
        </>
    )
}

export default Home
