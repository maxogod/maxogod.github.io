import { useContext, useEffect, useRef } from "react"
import { toast } from "react-toastify"
import { GiFireworkRocket, GiPresent, GiPumpkinLantern } from "react-icons/gi"
import { languageContext } from "../context/languageContext"
import { getSeason } from "../utils/season"
import { useReducedMotion } from "../hooks/useReducedMotion"

const BATS = [
    { top: '10%', size: 'w-10', duration: '19s', delay: '0s' },
    { top: '22%', size: 'w-7', duration: '24s', delay: '-8s' },
    { top: '6%', size: 'w-6', duration: '28s', delay: '-15s' },
    { top: '30%', size: 'w-8', duration: '21s', delay: '-4s' },
    { top: '16%', size: 'w-5', duration: '32s', delay: '-22s' },
]

const Bat = ({ className }: { className: string }) => (
    <svg viewBox="0 0 64 30" className={`season-flap ${className}`}>
        <path d="M32 9c-1-3-2-5-3-6l-1 4c-3-4-9-6-14-3C9 1 3 3 0 10c5-1 9 1 11 6 3-3 8-3 11 1l10 9 10-9c3-4 8-4 11-1 2-5 6-7 11-6-3-7-9-9-14-6-5-3-11-1-14 3l-1-4c-1 1-2 3-3 6Z" fill="#14081f" />
    </svg>
)

const Pumpkin = () => (
    <svg viewBox="0 0 80 66" className="size-full">
        <path d="M38 12c0-6 2-10 7-12l2 3c-4 2-5 5-5 9Z" fill="#3d6b2a" />
        <ellipse cx="22" cy="40" rx="18" ry="24" fill="#e8681a" />
        <ellipse cx="58" cy="40" rx="18" ry="24" fill="#e8681a" />
        <ellipse cx="40" cy="40" rx="20" ry="26" fill="#ff8a2a" />
        <g fill="#ffd34d" className="season-flicker">
            <path d="M24 32l8-8 6 9Z M56 32l-8-8-6 9Z" />
            <path d="M20 46c6 8 34 8 40 0l-6 2-3 5-4-5-7 6-7-6-4 5-3-5Z" />
        </g>
    </svg>
)

const Iceberg = () => (
    <svg viewBox="0 0 120 96" className="size-full">
        <path d="M6 96 24 62l18 8 18-30 22 22 14-10 18 44Z" fill="#eef8ff" />
        <path d="M60 40l22 22-8 34H44l6-26Z" fill="#cfe6f5" />
        <g transform="translate(70 4)">
            <path d="M14 0 4 18h20Z M14 10 0 32h28Z M14 22-2 46h32Z" fill="#1f7a4a" />
            <rect x="11" y="46" width="6" height="10" fill="#6b3b1a" />
            <path d="m14-6 2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1Z" fill="#ffd34d" />
            {[[8, 26, '#ff4d5a'], [20, 34, '#ffd34d'], [6, 40, '#5ab0ff'], [22, 16, '#ff4d5a']].map(([x, y, c]) => (
                <circle key={`${x}-${y}`} cx={x as number} cy={y as number} r="2.4" fill={c as string} className="season-twinkle" />
            ))}
        </g>
    </svg>
)

const BULB_COLORS = ['#ff4d5a', '#3fd17a', '#ffd34d', '#5ab0ff']

/** String lights sagging across the top of the hero. */
const Garland = () => {
    const bulbs: { x: number; y: number; c: string; d: number }[] = []
    for (let seg = 0; seg < 6; seg++) {
        for (const t of [0.15, 0.38, 0.62, 0.85]) {
            const y = (1 - t) ** 2 * 6 + 2 * (1 - t) * t * 46 + t ** 2 * 6
            bulbs.push({ x: seg * 240 + t * 240, y: y + 6, c: BULB_COLORS[bulbs.length % 4], d: (bulbs.length % 5) * 0.35 })
        }
    }
    let wire = 'M0 6'
    for (let x = 240; x <= 1440; x += 240) wire += ` Q${x - 120} 46 ${x} 6`
    return (
        <svg viewBox="0 0 1440 70" preserveAspectRatio="xMidYMin slice" className="absolute inset-x-0 top-14 h-16 w-full sm:top-16">
            <path d={wire} fill="none" stroke="#1d2b3a" strokeWidth="2" />
            {bulbs.map(b => (
                <g key={b.x}>
                    <rect x={b.x - 2.5} y={b.y - 4} width="5" height="5" fill="#1d2b3a" />
                    <ellipse cx={b.x} cy={b.y + 6} rx="5" ry="7" fill={b.c} className="season-twinkle" style={{ animationDelay: `${b.d}s`, filter: `drop-shadow(0 0 6px ${b.c})` }} />
                </g>
            ))}
        </svg>
    )
}

const FIREWORK_COLORS = ['#ffd27a', '#ff7a90', '#6ff3e0', '#ffffff', '#c9a7ff']

interface Spark { x: number; y: number; px: number; py: number; vx: number; vy: number; life: number; color: string }
interface Rocket { x: number; y: number; vy: number; targetY: number; color: string }

/** Fireworks over the sea, only animated while the hero is on screen. */
const Fireworks = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext('2d')
        if (!canvas || !ctx) return
        const state = { w: 0, h: 0, dpr: 1, raf: 0, last: 0, nextLaunch: 0, visible: true, rockets: [] as Rocket[], sparks: [] as Spark[] }

        const resize = () => {
            state.dpr = Math.min(window.devicePixelRatio || 1, 2)
            state.w = canvas.clientWidth
            state.h = canvas.clientHeight
            canvas.width = Math.round(state.w * state.dpr)
            canvas.height = Math.round(state.h * state.dpr)
        }
        const explode = (r: Rocket) => {
            const count = 60 + Math.floor(Math.random() * 30)
            for (let i = 0; i < count; i++) {
                const a = (i / count) * Math.PI * 2
                const speed = 70 + Math.random() * 130
                const color = Math.random() < 0.8 ? r.color : FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)]
                state.sparks.push({ x: r.x, y: r.y, px: r.x, py: r.y, vx: Math.cos(a) * speed, vy: Math.sin(a) * speed, life: 1 + Math.random() * 0.6, color })
            }
        }
        const frame = (now: number) => {
            const dt = Math.min(0.05, (now - state.last) / 1000 || 0)
            state.last = now
            if (now > state.nextLaunch) {
                state.nextLaunch = now + 350 + Math.random() * 750
                state.rockets.push({
                    x: state.w * (0.08 + Math.random() * 0.84), y: state.h, vy: -(state.h * (0.9 + Math.random() * 0.5)),
                    targetY: state.h * (0.15 + Math.random() * 0.4), color: FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)],
                })
            }
            ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0)
            ctx.clearRect(0, 0, state.w, state.h)
            ctx.globalCompositeOperation = 'lighter'
            for (const r of state.rockets) {
                r.y += r.vy * dt
                r.vy *= 0.985
                ctx.fillStyle = r.color
                ctx.fillRect(r.x - 1, r.y, 2, 6)
                if (r.y <= r.targetY) { explode(r); r.y = -999 }
            }
            state.rockets = state.rockets.filter(r => r.y > -100)
            for (const s of state.sparks) {
                s.px = s.x; s.py = s.y
                s.vx *= 0.975; s.vy = s.vy * 0.975 + 55 * dt
                s.x += s.vx * dt; s.y += s.vy * dt
                s.life -= dt * 0.75
                ctx.globalAlpha = Math.max(0, Math.min(1, s.life))
                ctx.strokeStyle = s.color
                ctx.lineWidth = 2.5
                ctx.beginPath(); ctx.moveTo(s.px, s.py); ctx.lineTo(s.x, s.y); ctx.stroke()
                ctx.fillStyle = s.color
                ctx.globalAlpha *= 0.35
                ctx.beginPath(); ctx.arc(s.x, s.y, 4, 0, Math.PI * 2); ctx.fill()
            }
            ctx.globalAlpha = 1
            ctx.globalCompositeOperation = 'source-over'
            state.sparks = state.sparks.filter(s => s.life > 0)
            if (state.visible) state.raf = requestAnimationFrame(frame)
        }

        resize()
        const observer = new IntersectionObserver(([entry]) => {
            state.visible = entry.isIntersecting
            cancelAnimationFrame(state.raf)
            if (state.visible) { state.last = performance.now(); state.raf = requestAnimationFrame(frame) }
        })
        observer.observe(canvas)
        window.addEventListener('resize', resize)
        return () => {
            cancelAnimationFrame(state.raf)
            observer.disconnect()
            window.removeEventListener('resize', resize)
        }
    }, [])

    return <canvas ref={canvasRef} className="absolute inset-x-0 top-0 w-full" style={{ height: 'var(--waterline)' }} />
}

/** Sky decoration for the hero (behind the name). */
export const SeasonSky = () => {
    const season = getSeason()
    const reduceMotion = useReducedMotion()
    if (season === 'halloween') {
        return (
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
                {!reduceMotion && BATS.map(bat => (
                    <div key={bat.top} className="season-bat absolute left-0" style={{ top: bat.top, animationDuration: bat.duration, animationDelay: bat.delay }}>
                        <Bat className={bat.size} />
                    </div>
                ))}
            </div>
        )
    }
    if (season === 'christmas') {
        return (
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
                {!reduceMotion && <div className="season-snow absolute inset-x-0 top-0" style={{ height: 'calc(var(--waterline) + 4%)' }} />}
                <Garland />
            </div>
        )
    }
    if (season === 'newyear' && !reduceMotion) {
        return <div aria-hidden className="pointer-events-none absolute inset-0"><Fireworks /></div>
    }
    return null
}

/** Pumpkin or iceberg floating next to the sub. */
export const SeasonFloat = () => {
    const season = getSeason()
    if (season !== 'halloween' && season !== 'christmas') return null
    return (
        <div aria-hidden className={`pointer-events-none absolute right-[27%] hidden animate-bob [animation-delay:-1.5s] sm:block ${season === 'halloween' ? 'w-16 -translate-y-[62%] lg:w-20' : 'w-24 -translate-y-[72%] lg:w-28'}`} style={{ top: 'var(--waterline)' }}>
            {season === 'halloween' ? <Pumpkin /> : <Iceberg />}
        </div>
    )
}

/** Hat for the hero submarine; render inside the sub's positioned wrapper. */
export const SeasonHat = () => {
    const season = getSeason()
    if (!season) return null
    return (
        <svg viewBox="0 0 60 50" aria-hidden className="pointer-events-none absolute bottom-[80%] left-[36%] w-[32%]">
            {season === 'halloween' && (
                <g stroke="#ff8a2a" strokeWidth="1.5" strokeLinejoin="round">
                    <path d="M14 40 34 2c2 6 0 14 6 20l6 18Z" fill="#2a1240" />
                    <ellipse cx="30" cy="42" rx="29" ry="6" fill="#2a1240" />
                    <path d="M18 34h26l2 6H16Z" fill="#ff8a2a" stroke="none" />
                </g>
            )}
            {season === 'christmas' && (
                <g>
                    <path d="M12 40C16 18 30 4 48 10l-4 8c-8-2-12 8-10 22Z" fill="#e0303f" />
                    <circle cx="47" cy="13" r="6" fill="#ffffff" />
                    <rect x="8" y="36" width="40" height="10" rx="5" fill="#ffffff" />
                </g>
            )}
            {season === 'newyear' && (
                <g>
                    <path d="M18 44 30 4l12 40Z" fill="#ffd27a" />
                    <path d="M22 32h16l2 6H20Z M26 20h8l1 5h-10Z" fill="#ff7a90" />
                    <circle cx="30" cy="4" r="4" fill="#6ff3e0" />
                </g>
            )}
        </svg>
    )
}

const GREETING_ICONS = { halloween: GiPumpkinLantern, christmas: GiPresent, newyear: GiFireworkRocket }
let greeted = false

const alreadyGreeted = (key: string) => {
    try {
        return sessionStorage.getItem(key) !== null
    } catch {
        return false
    }
}

/** Shows the seasonal greeting once per browser session. */
export const SeasonGreeting = () => {
    const { text } = useContext(languageContext)
    const season = getSeason()

    useEffect(() => {
        if (!season || greeted) return
        const key = `seasonGreeting-${season}`
        if (alreadyGreeted(key)) return
        const Icon = GREETING_ICONS[season]
        const timer = setTimeout(() => {
            greeted = true
            try {
                sessionStorage.setItem(key, '1')
            } catch {
                // blocked: greet again next load
            }
            toast(
                <span className="flex items-center gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-signal/15 text-xl text-signal"><Icon aria-hidden /></span>
                    <span className="font-semibold">{text.seasons[season]}</span>
                </span>,
                { toastId: key, autoClose: 6000 },
            )
        }, 900)
        return () => clearTimeout(timer)
    }, [season, text])

    return null
}
