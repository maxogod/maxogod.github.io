import { useContext } from 'react'
import { LuArrowDown } from 'react-icons/lu'
import { languageContext } from '../context/languageContext'
import Waves from '../components/Waves'
import Submarine from '../components/Submarine'
import Treasure from '../components/Treasure'
import { scrollToSection } from '../utils/depth'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { HeroScenery } from '../components/SkinScenery'

const rays = ['left-[6%] delay-0', 'left-[27%] [animation-delay:-3s]', 'left-[49%] [animation-delay:-6s]', 'left-[71%] [animation-delay:-1.5s]']

const Name = ({ first, last }: { first: string, last: string }) => (
    <>
        <span className="block sm:inline">{first}</span>{' '}
        <span className="block sm:inline">{last}</span>
    </>
)

const nameClasses = 'font-extrabold leading-[0.84] tracking-[-0.045em] [font-stretch:88%] text-[clamp(3.6rem,17vw,7.5rem)] sm:whitespace-nowrap sm:text-[clamp(4.5rem,11.4vw,11.5rem)]'

const Hero = () => {

    const { text } = useContext(languageContext)
    const reduceMotion = useReducedMotion()

    return (
        <section
            id="surface"
            aria-label={text.sections.surface}
            className="water-hero relative min-h-[100svh] overflow-hidden [--waterline:46%] sm:[--waterline:50%]">

            {/* Refraction filter for the submerged half of the name. */}
            <svg aria-hidden className="absolute size-0">
                <filter id="refraction" x="-5%" y="-20%" width="110%" height="140%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.008 0.05" numOctaves="2" seed="4">
                        {!reduceMotion && <animate attributeName="baseFrequency" dur="9s" values="0.008 0.05;0.011 0.07;0.008 0.05" repeatCount="indefinite" />}
                    </feTurbulence>
                    <feDisplacementMap in="SourceGraphic" scale="16" />
                </filter>
            </svg>

            {/* Sky */}
            <div aria-hidden className="night-stars absolute inset-x-0 top-0 opacity-0 transition-opacity duration-700 dark:opacity-90" style={{ height: 'var(--waterline)' }} />
            <div aria-hidden className="hero-sun absolute right-[10%] top-[12%] size-20 rounded-full bg-[var(--sun)] shadow-[0_0_60px_20px_color-mix(in_oklab,var(--sun)_45%,transparent)] transition-all duration-700 sm:size-28 dark:shadow-[0_0_40px_6px_rgb(233_239_255/0.25),inset_-14px_-6px_0_rgb(160_175_215/0.45)]" />

            <HeroScenery />

            {/* Light rays under the surface */}
            {rays.map(ray => (
                <div
                    key={ray}
                    aria-hidden
                    className={`hero-ray absolute h-[60%] w-[11vw] origin-top animate-sway bg-linear-to-b from-white/25 to-transparent mix-blend-soft-light dark:from-white/10 ${ray}`}
                    style={{ top: 'var(--waterline)' }} />
            ))}

            <div id="waterline" aria-hidden className="absolute inset-x-0" style={{ top: 'var(--waterline)' }} />

            {/* Name: dry half above the waterline... */}
            <div className="absolute inset-x-0 -translate-y-1/2 px-5 sm:px-10 lg:px-16" style={{ top: 'var(--waterline)' }}>
                <h1 className={`hero-name hero-name-top ${nameClasses} text-ink transition-colors duration-700 [clip-path:inset(0_0_50%_0)] dark:text-foam`}>
                    <Name first={text.hero.firstName} last={text.hero.lastName} />
                </h1>
            </div>

            <Waves />

            {/* ...and the submerged half, refracted. */}
            <div aria-hidden className="pointer-events-none absolute inset-x-0 -translate-y-1/2 px-5 sm:px-10 lg:px-16" style={{ top: 'var(--waterline)' }}>
                <p className={`hero-name hero-name-bottom ${nameClasses} translate-y-[0.04em] text-[#bfeaff]/85 [clip-path:inset(50%_0_0_0)] [filter:url(#refraction)] dark:text-[#8fc3e6]/75`}>
                    <Name first={text.hero.firstName} last={text.hero.lastName} />
                </p>
            </div>

            <button
                type="button"
                onClick={() => scrollToSection('about')}
                aria-label={text.hero.sub}
                title={text.hero.sub}
                className="absolute right-[3%] w-20 -translate-y-[78%] sm:right-[9%] sm:w-44"
                style={{ top: 'var(--waterline)' }}>
                <Submarine className="w-full animate-bob drop-shadow-[0_10px_14px_rgb(6_37_68/0.35)]" />
            </button>

            <Treasure id="map" className="left-[58%] -translate-y-[70%] animate-bob [animation-delay:-2s] sm:left-[64%]" style={{ top: 'var(--waterline)' }} />

            <div className="absolute inset-x-0 bottom-[7%] z-10 flex flex-col items-start gap-6 px-5 sm:bottom-[9%] sm:px-10 lg:px-16">
                <p className="max-w-[34ch] text-lg leading-snug font-medium text-foam [text-shadow:0_1px_12px_rgb(6_37_68/0.45)] sm:text-2xl">
                    {text.hero.tagline}
                </p>
                <button
                    type="button"
                    onClick={() => scrollToSection('about')}
                    className="skin-cta group inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3 font-semibold text-ink shadow-[0_8px_30px_-6px_rgb(255_182_72/0.7)] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0">
                    {text.hero.dive}
                    <LuArrowDown aria-hidden className="transition-transform duration-300 group-hover:translate-y-0.5" />
                </button>
            </div>
        </section>
    )
}

export default Hero
