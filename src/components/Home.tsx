import maxo from '../assets/maxo.png'

const Home = () => {
    // TODO dark - bright mode
    return (
        <>
            <div id="home-information" className='m-10 flex gap-5 items-center'>
                <img
                    src={maxo}
                    alt="my picture"
                    className='aspect-square object-cover w-52 rounded-full' />
                <div className='pb-10'>
                    <h1>
                        &gt; Hi i'm Maxo
                        <br />
                        &gt; Welcome to my portfolio!
                    </h1>
                    <button className='bg-black text-white p-2 rounded-lg mt-2'>About me</button>
                </div>
            </div>

        </>
    )
}

export default Home