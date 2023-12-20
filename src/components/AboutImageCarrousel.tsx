import { useContext, useState } from 'react'
import fiubaton_thanking from '../assets/fiubaton_thanking.jpg'
import fiubaton_presenting from '../assets/fiubaton_presenting.jpg'
import fiubaton_winners from '../assets/fiubaton_winners.jpg'
import { BsArrowBarLeft, BsArrowBarRight } from 'react-icons/bs'
import { themeContext } from '../context/themeContext'

const AboutImageCarrousel = () => {

    const imgs = [
        fiubaton_thanking,
        fiubaton_presenting,
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
        <div className={`${borderColor} relative sm:w-80 w-60 aspect-square border-[3px] rounded-xl`}>
            <img
                src={imgs[currentImage]}
                alt="thanking fiubaton organizers"
                className='h-full w-full object-cover rounded-md' />
            <button
                onClick={next}
                className='absolute text-white mr-1 p-1 bg-blue-600 rounded-full top-1/2 right-0'>
                <BsArrowBarRight />
            </button>
            <button
                onClick={prev}
                className='absolute text-white ml-1 p-1 bg-blue-600 rounded-full top-1/2 left-0'>
                <BsArrowBarLeft />
            </button>
        </div>
    )
}

export default AboutImageCarrousel