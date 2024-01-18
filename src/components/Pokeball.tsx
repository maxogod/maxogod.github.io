import fishing from '../assets/fishing.png'

const Pokeball = () => {
    return (
        <div className='hidden z-20 sm:flex items-baseline justify-end mt-20 overflow-hidden'>
            <img
                src={fishing}
                alt="pokeball"
                className='w-20 mr-48 cursor-pointer' />
        </div>
    )
}

export default Pokeball