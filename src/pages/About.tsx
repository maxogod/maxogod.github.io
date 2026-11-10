import { useContext } from 'react'
import { languageContext } from '../context/languageContext'
import SectionHeading from '../components/SectionHeading'
import Treasure from '../components/Treasure'
import portrait from '../assets/pfp.jpg'
import presenting from '../assets/fiubaton_presenting.jpg'
import thanking from '../assets/fiubaton_thanking.jpg'
import winners from '../assets/fiubaton_winners.jpg'

const photos = [presenting, thanking, winners]
const rivets = Array.from({ length: 10 }, (_, i) => i * 36)

/** Round porthole window around the portrait. */
const Porthole = ({ src, alt }: { src: string, alt: string }) => (
    <div className="relative aspect-square w-full max-w-[16rem] sm:max-w-[22rem] rounded-full bg-[conic-gradient(from_210deg,#9db6c8,#3d5d76,#c9dbe6,#45657e,#9db6c8)] p-4 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.6)] sm:p-5">
        {rivets.map(angle => (
            <span
                key={angle}
                aria-hidden
                className="absolute size-2.5 -translate-1/2 rounded-full bg-[#dbe7ef] shadow-[inset_-1px_-1px_2px_rgb(0_0_0/0.5)]"
                style={{
                    left: `${50 + 47.2 * Math.cos(angle * Math.PI / 180)}%`,
                    top: `${50 + 47.2 * Math.sin(angle * Math.PI / 180)}%`,
                }} />
        ))}
        <div className="relative size-full overflow-hidden rounded-full ring-4 ring-[#2a465c]">
            <img src={src} alt={alt} loading="lazy" decoding="async" className="size-full object-cover object-[50%_30%]" />
            <span aria-hidden className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_25%,rgb(255_255_255/0.35),transparent_45%)]" />
            <span aria-hidden className="absolute inset-0 rounded-full shadow-[inset_0_0_40px_rgb(6_37_68/0.55)]" />
        </div>
    </div>
)

const About = () => {

    const { text } = useContext(languageContext)

    return (
        <section id="about" aria-labelledby="about-title" className="water-about relative overflow-hidden px-5 pt-28 pb-12 sm:px-10 sm:pt-36 sm:pb-16 lg:px-16">
            <div className="relative z-10 mx-auto max-w-6xl">
                <SectionHeading id="about-title" depth={40} zone="sunlight" title={text.about.title} />

                <div className="mt-14 grid items-center gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
                    <div className="flex justify-center lg:justify-start">
                        <Porthole src={portrait} alt={text.about.portrait} />
                    </div>

                    <div className="flex flex-col gap-10">
                        <div className="flex flex-col gap-4">
                            <p className="text-xl font-semibold text-glow">{text.about.subtitle}</p>
                            <p className="max-w-[60ch] text-lg leading-relaxed text-foam/85">{text.about.text}</p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold">{text.about.toolboxTitle}</h3>
                            <dl className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-[auto_1fr]">
                                {text.about.toolbox.map(group => (
                                    <div key={group.label} className="contents">
                                        <dt className="pt-1 text-sm text-foam/60">{group.label}</dt>
                                        <dd className="flex flex-wrap gap-1.5">
                                            {group.items.map(item => (
                                                <span key={item} className="rounded-full bg-white/7 px-3 py-1 text-sm ring-1 ring-white/12">{item}</span>
                                            ))}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </div>

                <figure className="mt-24">
                    <div className="grid grid-cols-6 gap-3 sm:gap-4">
                        {photos.map((src, i) => (
                            <img
                                key={src}
                                src={src}
                                alt={text.about.photos[i] ?? ''}
                                loading="lazy" decoding="async"
                                className={`h-44 w-full rounded-2xl object-cover ring-1 ring-white/10 sm:h-64 ${i === 0 ? 'col-span-6 sm:col-span-3' : i === 1 ? 'col-span-3 sm:col-span-2' : 'col-span-3 sm:col-span-1'}`} />
                        ))}
                    </div>
                    <figcaption className="mt-3 text-sm text-foam/65">{text.about.photosCaption}</figcaption>
                </figure>
            </div>

            <Treasure id="compass" className="bottom-[34%] left-[3%] sm:left-[45%]" />
        </section>
    )
}

export default About
