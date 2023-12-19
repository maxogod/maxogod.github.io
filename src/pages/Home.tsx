import { useContext, useState } from 'react'
import maxo from '../assets/maxo.png'
import pfp from '../assets/pfp.jpg'
import { languageContext } from '../context/languageContext'
import AboutMePopUp from '../components/AboutMePopUp'

const Home = () => {
    // TODO dark - bright mode

    const [image, setImage] = useState(maxo)

    const [isPopUpOpen, setIsPopUpOpen] = useState(false)

    const { homePageText } = useContext(languageContext)

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

    return (
        <>
            {isPopUpOpen && <AboutMePopUp handleTogglePopUp={handleTogglePopUp} />}
            <div
                id="about"
                className='w-screen h-screen flex sm:flex-row flex-col bg-blue-400 gap-5 px-5 py-10'>
                <div
                    onClick={handleChangeImage}
                    className='cursor-pointer relative aspect-square w-52 h-52 flex justify-center items-center'>
                    <img
                        src={image}
                        alt="my picture"
                        className='object-cover w-52 h-52 rounded-full z-10' />
                    <div className='absolute w-32 h-32 bg-white rounded-full animate-ping'></div>
                </div>
                <div className='w-full sm:mt-16 sm:w-auto'>
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
                <div className='h-full flex justify-center items-end text-white animate-pulse'>ICON</div>
            </div>
        </>
    )
}

export default Home