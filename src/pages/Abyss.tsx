import { PointerEvent, useContext, useEffect, useRef } from "react"
import { LuArrowUp } from "react-icons/lu"
import { GiLockedChest, GiOpenTreasureChest } from "react-icons/gi"
import { languageContext } from "../context/languageContext"
import { gameContext } from "../context/gameContext"
import { fill } from "../utils/languageUtils"
import { BOTTOM_DEPTH, scrollToSection } from "../utils/depth"
import { SONAR_EVENT, TREASURES } from "../utils/game"
import SectionHeading from "../components/SectionHeading"
import Treasure from "../components/Treasure"
import DeepRun from "../components/DeepRun"

const YEAR = new Date().getFullYear()

/** Sea floor, rocks and an anglerfish; only visible under the headlight. */
const Seabed = () => (
    <svg viewBox="0 0 1440 360" preserveAspectRatio="xMidYMax slice" aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] w-full">
        <path d="M0 210 C 180 160 300 230 480 200 S 760 140 940 190 S 1240 240 1440 170 V360 H0Z" fill="#0b2036" />
        <path d="M0 270 C 220 230 380 290 620 260 S 1000 220 1180 262 S 1380 290 1440 270 V360 H0Z" fill="#102b47" />
        <path d="M180 214 l30 -70 l22 40 l18 -26 l26 70Z M1040 196 l40 -96 l28 54 l20 -30 l30 80Z" fill="#081a2d" />
        {/* anglerfish */}
        <g transform="translate(1130 236)">
            <path d="M0 0 C 30 -40 110 -40 130 0 C 110 34 30 34 0 0Z" fill="#14324f" />
            <path d="M130 0 l26 -20 v40Z" fill="#14324f" />
            <path d="M10 -2 l14 8 l8 -10 l8 10 l8 -10 l8 10 l6 -8" fill="none" stroke="#c9dbe6" strokeWidth="2" />
            <circle cx="28" cy="-12" r="4" fill="#c9dbe6" />
            <path d="M40 -24 C 30 -70 -20 -70 -26 -40" fill="none" stroke="#14324f" strokeWidth="3" />
            <circle cx="-26" cy="-38" r="16" fill="#6ff3e0" opacity="0.15" />
            <circle cx="-26" cy="-38" r="5" fill="#c9fff6" className="animate-glint" style={{ transformOrigin: '-26px -38px' }} />
        </g>
        {/* tube worms */}
        {[300, 330, 352, 760, 784].map((x, i) => (
            <g key={x}>
                <path d={`M${x} ${250 - (i % 2) * 8} v-${40 + i * 6}`} stroke="#d9e5ee" strokeOpacity="0.35" strokeWidth="5" strokeLinecap="round" />
                <circle cx={x} cy={210 - i * 6 - (i % 2) * 8} r="6" fill="#ff7a90" opacity="0.7" />
            </g>
        ))}
    </svg>
)

const Abyss = () => {

    const { text } = useContext(languageContext)
    const { progress } = useContext(gameContext)
    const sectionRef = useRef<HTMLElement>(null)
    const darkRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const timer = { id: 0 }
        const onPing = () => {
            darkRef.current?.classList.replace('opacity-100', 'opacity-30')
            clearTimeout(timer.id)
            timer.id = window.setTimeout(() => darkRef.current?.classList.replace('opacity-30', 'opacity-100'), 2600)
        }
        window.addEventListener(SONAR_EVENT, onPing)
        return () => {
            window.removeEventListener(SONAR_EVENT, onPing)
            clearTimeout(timer.id)
        }
    }, [])

    const moveLight = (event: PointerEvent<HTMLElement>) => {
        const section = sectionRef.current
        if (!section) return
        const rect = section.getBoundingClientRect()
        section.style.setProperty('--lx', `${event.clientX - rect.left}px`)
        section.style.setProperty('--ly', `${event.clientY - rect.top}px`)
    }

    const found = progress.treasures.length
    const total = TREASURES.length
    const allFound = found >= total
    const Chest = allFound ? GiOpenTreasureChest : GiLockedChest

    return (
        <section
            id="abyss"
            ref={sectionRef}
            aria-labelledby="abyss-title"
            onPointerMove={moveLight}
            onPointerDown={moveLight}
            className="relative flex min-h-[135svh] flex-col overflow-hidden bg-abyss px-5 pt-28 pb-28 sm:px-10 sm:pt-36 lg:px-16 [--lx:70%] [--ly:75%]">

            <Seabed />
            <Treasure id="coins" layer="z-[5]" className="bottom-[9%] left-[22%]" />
            <Treasure id="wheel" layer="z-[5]" className="right-[34%] bottom-[16%]" />

            {/* darkness, except around the headlight */}
            <div
                ref={darkRef}
                aria-hidden
                className="pointer-events-none absolute inset-0 z-[6] opacity-100 transition-opacity duration-700"
                style={{ background: 'radial-gradient(circle 220px at var(--lx) var(--ly), rgb(2 8 20 / 0) 0%, rgb(2 8 20 / 0.25) 45%, rgb(2 8 20 / 0.97) 100%)' }} />

            <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col gap-14 [&_a]:pointer-events-auto [&_button]:pointer-events-auto [&_[data-game]]:pointer-events-auto">
                <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                    <div className="flex flex-col gap-5">
                        <SectionHeading id="abyss-title" depth={BOTTOM_DEPTH} zone="abyss" title={text.abyss.title} />
                        <p className="max-w-[52ch] text-lg leading-relaxed text-foam/75">{text.abyss.text}</p>
                    </div>

                    <div className="flex items-center gap-4 rounded-[20px] bg-white/[0.04] p-4 ring-1 ring-white/10">
                        <Chest aria-hidden className={`text-5xl ${allFound ? 'text-signal drop-shadow-[0_0_14px_var(--color-signal)]' : 'text-foam/40'}`} />
                        <div className="flex flex-col gap-1">
                            <p className="font-semibold">{allFound ? text.abyss.treasuresDone : fill(text.abyss.treasures, { found, total })}</p>
                            {!allFound && <p className="max-w-[30ch] text-sm text-foam/60">{text.abyss.treasuresHint}</p>}
                        </div>
                    </div>
                </div>

                <DeepRun />

                <footer className="mt-auto flex flex-col items-start gap-4 pt-10 text-sm text-foam/55 sm:flex-row sm:items-center sm:justify-between">
                    <p>{text.abyss.footer}, {YEAR}</p>
                    <button
                        type="button"
                        onClick={() => scrollToSection('surface')}
                        className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-foam ring-1 ring-foam/25 transition-colors hover:bg-white/8">
                        <LuArrowUp aria-hidden /> {text.abyss.ascend}
                    </button>
                </footer>
            </div>
        </section>
    )
}

export default Abyss
