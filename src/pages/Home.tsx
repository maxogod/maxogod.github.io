import { useContext, useState } from 'react'
import maxo from '../assets/maxo.png'
import { languageContext } from '../context/languageContext'
import AboutMePopUp from '../components/AboutMePopUp'

const Home = () => {
    // TODO dark - bright mode

    const [isPopUpOpen, setIsPopUpOpen] = useState(false)

    const { homePageText } = useContext(languageContext)

    const handleTogglePopUp = () => {
        setIsPopUpOpen(!isPopUpOpen)
    }

    return (
        <>
            {isPopUpOpen && <AboutMePopUp handleTogglePopUp={handleTogglePopUp} />}
            <div
                id="about"
                className='w-screen h-screen flex sm:flex-row flex-col bg-blue-400 gap-5 px-5 py-10'>
                <img
                    src={maxo}
                    alt="my picture"
                    className='aspect-square object-cover w-52 h-52 rounded-full' />
                <div className='w-full sm:mt-16 sm:w-auto'>
                    <h1>
                        &gt; {homePageText.title}
                        <br />
                        &gt; {homePageText.subTitle}
                    </h1>
                    <button
                        onClick={handleTogglePopUp}
                        className='bg-black text-white p-2 rounded-lg mt-2'>
                        {homePageText.about}
                    </button>
                </div>
            </div>
        </>
    )
}

export default Home