import { useContext, useState } from 'react'
import fiubaton_thanking from '../assets/fiubaton_thanking.jpg'
import fiubaton_presenting from '../assets/fiubaton_presenting.jpg'
import fiubaton_winners from '../assets/fiubaton_winners.jpg'
import { IoCaretBackOutline } from 'react-icons/io5'
import { themeContext } from '../context/themeContext'

const AboutImageCarrousel = () => {

    const imgs = [
        fiubaton_presenting,
        fiubaton_thanking,
        fiubaton_winners,
    ]

    const [currentImage, setCurrentImage] = useState(0)

    const { borderColor } = useContext(themeContext)

    const next = () => {
        if (currentImage === imgs.length - 1) { // if it's the last image
            setCurrentImage(0) // go back to first img
            return
        }
        setCurrentImage(currentImage + 1)
    }

    const prev = () => {
        if (currentImage === 0) { // if it's the first image
            setCurrentImage(imgs.length - 1) // jump to last img
            return
        }
        setCurrentImage(currentImage - 1)
    }

    return (
        <div className={`relative sm:w-80 w-60 aspect-square`}>
            <img
                src={imgs[currentImage]}
                alt="thanking fiubaton organizers"
                className='h-full w-full object-cover rounded-md' />
            <button
                onClick={next}
                className={`absolute text-black bg-white shadow-lg shadow-black mr-1 text-sm p-1 rounded-full top-1/2 right-0`}>
                <IoCaretBackOutline className='rotate-180' />
            </button>
            <button
                onClick={prev}
                className={`absolute text-black bg-white shadow-lg shadow-black ml-1 text-sm p-1 rounded-full top-1/2 left-0`}>
                <IoCaretBackOutline />
            </button>

            <div className='absolute bottom-2 w-full flex gap-1 justify-center'>
                {Array.from({ length: imgs.length }).map((_, index) => (
                    <div key={index} className={`${index === currentImage ? 'bg-white' : 'bg-slate-600 opacity-60'} shadow-sm shadow-black rounded-full w-2 h-2`}></div>
                ))
                }
            </div>
        </div>
    )
}

export default AboutImageCarrousel