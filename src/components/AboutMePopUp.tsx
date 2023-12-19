import { useContext } from 'react'
import { languageContext } from '../context/languageContext'
import AboutImageCarrousel from './AboutImageCarrousel'

const AboutMePopUp = ({ handleTogglePopUp }: { handleTogglePopUp: () => void }) => {

    const { aboutMeText } = useContext(languageContext)

    return (
        <div className='w-screen h-screen fixed p-2 sm:p-16 z-20'>
            <div className='bg-white text-black relative rounded-md bg-opacity-80
            flex sm:flex-nowrap flex-wrap justify-center sm:justify-between 
            overflow-y-scroll items-start px-3 py-12 sm:p-10 w-full h-full'>
                <p
                    className='absolute top-0 left-0 bg-red-400 w-10 text-center rounded-r-full h-6 cursor-pointer'
                    onClick={handleTogglePopUp}>X</p>

                <AboutImageCarrousel />

                <div className='p-2 sm:w-fit'>
                    <h1 className='font-bold mb-8'>{aboutMeText.title}</h1>
                    <p className='text-xs'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit ut eveniet eligendi natus soluta tempora veniam iure eos, quibusdam nobis. Quos vitae possimus itaque repudiandae amet recusandae consequatur pariatur vel!
                        Repellat, aliquam id. Dolore, suscipit eos quidem iste animi odio perspiciatis temporibus perferendis ratione. Nobis eaque, repudiandae earum ipsa, illo ipsum architecto deleniti ab quidem molestiae libero sit, sequi necessitatibus.
                        Ea ad sint necessitatibus corporis mollitia saepe nesciunt aperiam sit temporibus nam molestias qui voluptatem exercitationem hic reiciendis aspernatur harum accusantium nobis atque explicabo consequatur facere, voluptas obcaecati. Sequi, quia.
                        Corrupti sapiente dolores blanditiis ad eius vitae assumenda enim natus debitis nostrum at sed excepturi, consequuntur quas in, praesentium itaque quibusdam ullam iste, eaque magnam facere libero omnis. Id, nihil?
                        Accusantium fuga in pariatur maiores explicabo quis accusamus, excepturi voluptatum placeat distinctio atque at tempore libero facilis aperiam quod recusandae dolorum veniam minima quae veritatis quibusdam delectus eaque. Culpa, magni!
                        Aliquid nemo, numquam, necessitatibus aliquam consequuntur doloribus blanditiis quis mollitia iste obcaecati libero dignissimos? Sed, et repellendus ipsam commodi laborum modi non velit ad inventore beatae sunt optio maxime officiis.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AboutMePopUp