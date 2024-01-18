import { Tooltip } from '@mui/material'
import presenting from '../assets/fiubaton_presenting.jpg'
import Pokeball from './Pokeball'
const EnjoyImages = () => {

    return (
        <div className="relative flex gap-5 opacity-90 justify-center pt-36 sm:pt-20 flex-wrap sm:flex-nowrap">
            <Tooltip title='Friends' key={0}>
                <img
                    src={presenting}
                    alt='enjoy'
                    className={`w-36 h-36 sm:w-72 sm:h-72 2xl:w-96 2xl:h-96 border-2 border-blue-300 p-2 rounded-2xl object-cover sm:mt-36
                                        hover:brightness-125 ease-in-out duration-300`} />
            </Tooltip>


            <Tooltip title='Games' key={1}>
                <img
                    src={presenting}
                    alt='enjoy'
                    className={`w-36 h-36 sm:w-72 sm:h-72 2xl:w-96 2xl:h-96 border-2 border-blue-300 p-2 rounded-2xl object-cover
                                        hover:brightness-125 ease-in-out duration-300`} />
            </Tooltip>

            <Tooltip title='Exploring' key={2}>
                <img
                    src={presenting}
                    alt='enjoy'
                    className={`w-36 h-36 sm:w-72 sm:h-72 2xl:w-96 2xl:h-96 border-2 border-blue-300 p-2 rounded-2xl object-cover sm:mt-36
                    hover:brightness-125 ease-in-out duration-300`} />
            </Tooltip>

            <div className='absolute w-full h-full flex items-end'>
                <Pokeball />
            </div>
        </div>
    )
}

export default EnjoyImages