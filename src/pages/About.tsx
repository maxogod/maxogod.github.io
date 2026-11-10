import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { LuChevronDown } from 'react-icons/lu'
import { languageContext } from '../context/languageContext'
import SectionHeading from '../components/SectionHeading'
import Treasure from '../components/Treasure'
import { useReducedMotion } from '../hooks/useReducedMotion'
import portrait from '../assets/pfp.jpg'
import presenting from '../assets/fiubaton_presenting.jpg'
import thanking from '../assets/fiubaton_thanking.jpg'
import team from '../assets/tpf.jpg'

const photos = [presenting, thanking, team]
const SLIDE_MS = 4500
const rivets = Array.from({ length: 10 }, (_, i) => i * 36)

/** Auto-advancing photo carousel; hovering or focusing it pauses and reveals the caption. */
const Carousel = ({ captions }: { captions: string[] }) => {
    const reduced = useReducedMotion()
    const [index, setIndex] = useState(0)
    const [paused, setPaused] = useState(false)

    useEffect(() => {
        if (paused || reduced) return
        const id = window.setInterval(() => setIndex(i => (i + 1) % photos.length), SLIDE_MS)
        return () => window.clearInterval(id)
    }, [paused, reduced, index])

    return (
        <div
            className="group relative rounded-[2rem] bg-[conic-gradient(from_210deg,#9db6c8,#3d5d76,#c9dbe6,#45657e,#9db6c8)] p-4 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.6)] sm:p-5"
            onPointerEnter={() => setPaused(true)}
            onPointerLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}>
            {['top-1 sm:top-[5px]', 'bottom-1 sm:bottom-[5px]'].map(pos => (
                <div key={pos} aria-hidden className={`absolute inset-x-8 flex justify-between ${pos}`}>
                    {rivets.slice(0, 8).map(angle => (
                        <span key={angle} className="size-2.5 rounded-full bg-[#dbe7ef] shadow-[inset_-1px_-1px_2px_rgb(0_0_0/0.5)]" />
                    ))}
                </div>
            ))}

            <div className="relative h-72 overflow-hidden rounded-2xl bg-abyss ring-4 ring-[#2a465c] sm:h-[28rem]">
                {photos.map((src, i) => (
                    <img
                        key={src}
                        src={src}
                        alt={captions[i] ?? ''}
                        loading={i === 0 ? 'eager' : 'lazy'} decoding="async"
                        aria-hidden={i !== index}
                        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${i === index ? 'opacity-100' : 'opacity-0'}`} />
                ))}

                {/* Water tint and glass reflection over the photo */}
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgb(255_255_255/0.14),transparent_28%),linear-gradient(to_top,rgb(6_58_99/0.35),transparent_45%)] shadow-[inset_0_0_70px_rgb(2_8_20/0.65)]" />

                <div className="glass absolute top-3 right-3 flex items-center gap-2 rounded-full px-3 py-2 ring-1 ring-white/10">
                    <span className="font-gauge text-[0.65rem] text-glow">{String(index + 1).padStart(2, '0')}/{String(photos.length).padStart(2, '0')}</span>
                    {photos.map((src, i) => (
                        <button
                            key={src}
                            type="button"
                            aria-label={captions[i]}
                            aria-current={i === index}
                            onClick={() => setIndex(i)}
                            className={`h-2 rounded-full transition-all ${i === index ? 'w-5 bg-glow' : 'w-2 bg-foam/40 hover:bg-foam/70'}`} />
                    ))}
                </div>

                <p className="glass pointer-events-none absolute inset-x-3 bottom-3 translate-y-2 rounded-xl px-4 py-3 text-sm text-foam opacity-0 ring-1 ring-glow/25 transition-[opacity,translate] duration-300 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 sm:text-base">
                    {captions[index]}
                </p>
            </div>
        </div>
    )
}

const chipClass = 'rounded-full bg-white/7 px-3 py-1 text-sm ring-1 ring-white/12'
const CHIP_GAP = 6

/** Toolbox chip: lifts and glows on hover, and releases a few bubbles when pressed. */
const Chip = ({ children }: { children: string }) => {
    const [bubbles, setBubbles] = useState<{ id: number, left: number, drift: number, size: number }[]>([])
    const nextId = useRef(0)

    const burst = () => {
        const fresh = Array.from({ length: 4 }, () => ({
            id: nextId.current++,
            left: 15 + Math.random() * 70,
            drift: Math.round(Math.random() * 24 - 12),
            size: 5 + Math.round(Math.random() * 5),
        }))
        setBubbles(b => [...b, ...fresh])
    }

    return (
        <button
            type="button"
            onClick={burst}
            className={`${chipClass} relative cursor-pointer transition-[translate,background-color,box-shadow] hover:-translate-y-0.5 hover:bg-glow/15 hover:ring-glow/40 active:translate-y-0 focus-visible:ring-glow/60`}>
            {children}
            {bubbles.map(b => (
                <span
                    key={b.id}
                    aria-hidden
                    onAnimationEnd={() => setBubbles(list => list.filter(x => x.id !== b.id))}
                    className="pointer-events-none absolute top-0 animate-bubble rounded-full bg-glow/30 ring-1 ring-glow/70"
                    style={{ left: `${b.left}%`, width: b.size, height: b.size, '--drift': `${b.drift}px` } as React.CSSProperties} />
            ))}
        </button>
    )
}

/** Toolbox row: collapses to a single line of chips ending in "…", expanded by default from the sm breakpoint up. */
const ToolboxGroup = ({ label, items }: { label: string, items: string[] }) => {
    const [open, setOpen] = useState(() => window.matchMedia('(min-width: 40rem)').matches)
    const [fit, setFit] = useState(items.length)
    const rowRef = useRef<HTMLElement>(null)
    const measureRef = useRef<HTMLSpanElement>(null)
    const id = `toolbox-${label.replace(/\W+/g, '-').toLowerCase()}`

    // Count how many chips share the first line together with the "…" chip, using an invisible copy of the full list.
    useLayoutEffect(() => {
        const row = rowRef.current, measure = measureRef.current
        if (!row || !measure) return
        const compute = () => {
            const chips = Array.from(measure.children) as HTMLElement[]
            const ellipsis = chips.pop()
            if (!ellipsis) return
            const width = row.clientWidth
            let used = 0, count = 0
            for (let i = 0; i < chips.length; i++) {
                const next = used + (count ? CHIP_GAP : 0) + chips[i].offsetWidth
                const reserve = i < chips.length - 1 ? CHIP_GAP + ellipsis.offsetWidth : 0
                if (next + reserve > width) break
                used = next
                count++
            }
            setFit(Math.max(1, count))
        }
        compute()
        const observer = new ResizeObserver(compute)
        observer.observe(row)
        return () => observer.disconnect()
    }, [items])

    const collapsible = fit < items.length
    const shown = open || !collapsible ? items : items.slice(0, fit)

    return (
        <div className="contents">
            <dt className="pt-1 text-sm text-foam/60">
                <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={id}
                    onClick={() => setOpen(o => !o)}
                    className="flex items-center gap-1.5 text-left transition-colors hover:text-foam">
                    {label}
                    <LuChevronDown aria-hidden className={`shrink-0 transition-transform ${open ? '' : '-rotate-90'}`} />
                </button>
            </dt>
            <dd id={id} ref={rowRef} className="relative flex flex-wrap gap-1.5">
                {shown.map(item => <Chip key={item}>{item}</Chip>)}
                {!open && collapsible && (
                    <button type="button" aria-label={label} onClick={() => setOpen(true)} className={`${chipClass} transition-colors hover:bg-white/15`}>…</button>
                )}
                <span ref={measureRef} aria-hidden className="pointer-events-none invisible absolute inset-x-0 top-0 flex flex-wrap gap-1.5">
                    {items.map(item => <span key={item} className={chipClass}>{item}</span>)}
                    <span className={chipClass}>…</span>
                </span>
            </dd>
        </div>
    )
}

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
                                    <ToolboxGroup key={group.label} label={group.label} items={group.items} />
                                ))}
                            </dl>
                        </div>
                    </div>
                </div>

                <div className="mt-24">
                    <Carousel captions={text.about.photos} />
                </div>
            </div>

            <Treasure id="compass" className="bottom-[34%] left-[3%] sm:left-[45%]" />
        </section>
    )
}

export default About
