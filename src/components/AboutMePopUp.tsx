import { useContext } from 'react'
import { languageContext } from '../context/languageContext'
import AboutImageCarrousel from './AboutImageCarrousel'
import { LuSwords } from 'react-icons/lu'
import { themeContext } from '../context/themeContext'

const AboutMePopUp = ({ handleTogglePopUp }: { handleTogglePopUp: () => void }) => {

    const { popUpColor } = useContext(themeContext)
    const { aboutMeText } = useContext(languageContext)

    return (
        <div className='w-screen h-screen fixed p-2 sm:p-16 z-20 flex justify-center items-center'>
            <div className={`${popUpColor} relative rounded-md bg-opacity-80
            flex sm:flex-nowrap flex-wrap justify-center sm:justify-between 
            overflow-y-scroll items-start px-3 py-12 sm:p-10 w-[70rem] h-full`}>
                <LuSwords
                    className='absolute top-0 left-0 bg-red-400 text-black hover:text-white ease-in-out duration-300 w-10 text-center rounded-r-full h-6 cursor-pointer'
                    onClick={handleTogglePopUp} />

                <AboutImageCarrousel />

                <div className='p-2 sm:w-fit'>
                    <h1 className='font-bold mb-8'>{aboutMeText.title}</h1>
                    <p className='text-md'>
                        {aboutMeText.text}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AboutMePopUp