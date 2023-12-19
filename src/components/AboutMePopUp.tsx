import { useContext } from 'react'
import { languageContext } from '../context/languageContext'

const AboutMePopUp = ({ handleTogglePopUp }: { handleTogglePopUp: () => void }) => {

    const { homePageText } = useContext(languageContext)

    return (
        <div className='w-screen h-screen fixed p-16'>
            <div className='bg-black relative rounded-md opacity-20 w-full h-full'>
                <p
                    className='text-white absolute top-5 right-5 cursor-pointer'
                    onClick={handleTogglePopUp}>X</p>
            </div>
        </div>
    )
}

export default AboutMePopUp