import { getSkin } from "../utils/skin"

// Skin-specific decoration. Everything here is aria-hidden scenery; the default `ocean` skin renders nothing.
const skin = getSkin()

/** Small deterministic PRNG so buildings look the same on every load. */
const seeded = (seed: number) => () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
}

const NEON = ['#00f0ff', '#ff2bd6', '#fcee0a', '#ffd6f5']

interface Tower { x: number; w: number; h: number; windows: { x: number; y: number; c: string }[]; sign?: { x: number; y: number; h: number; c: string }; antenna: boolean }

const neonTowers = (seed: number, count: number, maxH: number, lit: number): Tower[] => {
    const rand = seeded(seed)
    const towers: Tower[] = []
    let x = -20
    for (let i = 0; i < count && x < 1460; i++) {
        const w = 38 + rand() * 62
        const h = maxH * (0.3 + rand() * 0.7)
        const windows = []
        for (let wy = 12; wy < h - 8; wy += 11) {
            for (let wx = 6; wx < w - 8; wx += 9) {
                if (rand() < lit) windows.push({ x: x + wx, y: 320 - h + wy, c: NEON[Math.floor(rand() * NEON.length)] })
            }
        }
        const sign = rand() < 0.3 ? { x: x + w - 6, y: 320 - h + 20, h: Math.min(90, h * 0.5), c: NEON[Math.floor(rand() * 2)] } : undefined
        towers.push({ x, w, h, windows, sign, antenna: rand() < 0.35 })
        x += w + rand() * 8
    }
    return towers
}

const NeonSkyline = ({ seed, maxH, lit, body }: { seed: number, maxH: number, lit: number, body: string }) => {
    const towers = neonTowers(seed, 40, maxH, lit)
    return (
        <svg viewBox="0 0 1440 320" preserveAspectRatio="xMidYMax slice" className="size-full">
            <defs>
                <filter id={`neon-glow-${seed}`} x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="b" />
                    <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
            </defs>
            {towers.map(t => (
                <g key={t.x}>
                    {t.antenna && <path d={`M${t.x + t.w / 2} ${320 - t.h} v-26`} stroke={body} strokeWidth="3" />}
                    {t.antenna && <circle cx={t.x + t.w / 2} cy={320 - t.h - 26} r="2.5" fill="#ff2b4f" />}
                    <rect x={t.x} y={320 - t.h} width={t.w} height={t.h} fill={body} />
                    {t.windows.map(w => <rect key={`${w.x}-${w.y}`} x={w.x} y={w.y} width="4" height="5" fill={w.c} opacity="0.75" />)}
                    {t.sign && <rect x={t.sign.x} y={t.sign.y} width="7" height={t.sign.h} rx="2" fill={t.sign.c} filter={`url(#neon-glow-${seed})`} />}
                </g>
            ))}
        </svg>
    )
}

/** Stepped art-deco towers with long lit window strips. */
const DecoCity = ({ seed, maxH, color, light }: { seed: number, maxH: number, color: string, light: string }) => {
    const rand = seeded(seed)
    const towers = []
    let x = -10
    while (x < 1450) {
        const w = 60 + rand() * 70
        const h = maxH * (0.35 + rand() * 0.65)
        towers.push({ x, w, h, spire: rand() < 0.5, dome: rand() < 0.2 })
        x += w + 14 + rand() * 40
    }
    return (
        <svg viewBox="0 0 1440 400" preserveAspectRatio="xMidYMax slice" className="size-full">
            {towers.map(t => {
                const top = 400 - t.h
                const tiers = [0, 1, 2].map(i => ({ x: t.x + i * t.w * 0.14, w: t.w * (1 - i * 0.28), y: top + i * -18 }))
                return (
                    <g key={t.x} fill={color}>
                        {tiers.map((tier, i) => <rect key={i} x={tier.x} y={tier.y} width={tier.w} height={400 - tier.y} />)}
                        {t.spire && <path d={`M${t.x + t.w / 2 - 6} ${top - 36} L${t.x + t.w / 2} ${top - 110} L${t.x + t.w / 2 + 6} ${top - 36}Z`} />}
                        {t.dome && <path d={`M${t.x + 4} ${top} a ${t.w / 2 - 4} ${t.w / 2 - 4} 0 0 1 ${t.w - 8} 0Z`} fill={light} opacity="0.18" />}
                        {/* sunburst crown */}
                        {[-2, -1, 0, 1, 2].map(r => (
                            <path key={r} d={`M${t.x + t.w / 2} ${top - 36} l${r * 9} -16`} stroke={light} strokeOpacity="0.45" strokeWidth="1.5" />
                        ))}
                        {[0.2, 0.4, 0.6, 0.8].map(f => (
                            <rect key={f} x={t.x + t.w * f - 2} y={top + 20} width="4" height={t.h * 0.7} fill={light} opacity={0.25 + ((t.x * f) % 1) * 0.35} />
                        ))}
                    </g>
                )
            })}
        </svg>
    )
}

const Lighthouse = () => (
    <svg viewBox="0 0 140 280" className="size-full">
        <path d="M0 280 C 14 236 36 226 60 230 C 84 222 118 238 140 280Z" fill="#1c1a1c" />
        <path d="M50 236 L58 78 H82 L90 236Z" fill="#c9b18a" />
        {[100, 140, 180, 220].map(y => <path key={y} d={`M${51 + (236 - y) * 0.05} ${y} H${89 - (236 - y) * 0.05} v-16 H${52 + (236 - y) * 0.05}Z`} fill="#8a3a28" />)}
        <rect x="52" y="70" width="36" height="8" fill="#3a2a15" />
        <rect x="58" y="44" width="24" height="26" fill="#ffd27a" />
        <path d="M58 44 H82 M64 44 V70 M76 44 V70" stroke="#3a2a15" strokeWidth="2" />
        <path d="M54 44 L70 26 L86 44Z" fill="#3a2a15" />
        <circle cx="70" cy="57" r="22" fill="#ffd27a" opacity="0.25" />
    </svg>
)

export const HeroScenery = () => {
    if (skin === 'neon') {
        return (
            <div aria-hidden>
                <div className="neon-rain pointer-events-none absolute inset-0" />
                <div className="absolute inset-x-0 h-[30%] opacity-70" style={{ bottom: 'calc(100% - var(--waterline))' }}>
                    <NeonSkyline seed={7} maxH={260} lit={0.08} body="#2a0f4a" />
                </div>
                <div className="absolute inset-x-0 h-[22%]" style={{ bottom: 'calc(100% - var(--waterline))' }}>
                    <NeonSkyline seed={42} maxH={300} lit={0.22} body="#0c0322" />
                </div>
                {/* reflection on the water */}
                <div className="neon-reflection absolute inset-x-0 h-[26%] -scale-y-100 opacity-35 blur-[2px]" style={{ top: 'var(--waterline)' }}>
                    <NeonSkyline seed={42} maxH={300} lit={0.22} body="#0c0322" />
                </div>
            </div>
        )
    }
    if (skin === 'brass') {
        return (
            <div aria-hidden>
                <div className="absolute top-[4%] left-[8%] h-28 w-[46%] rounded-full bg-[#2b2622] opacity-80 blur-2xl" />
                <div className="absolute top-[14%] left-[40%] h-24 w-[50%] rounded-full bg-[#3a3027] opacity-70 blur-2xl" />
                <div className="absolute top-[24%] left-[-6%] h-20 w-[40%] rounded-full bg-[#4a3a2a] opacity-60 blur-2xl" />
                <div className="absolute inset-x-0 h-[16%] opacity-35" style={{ bottom: 'calc(100% - var(--waterline))' }}>
                    <DecoCity seed={11} maxH={300} color="#2a2220" light="#ffcf7a" />
                </div>
                <div className="absolute hidden w-24 -translate-y-full sm:block lg:w-28" style={{ top: 'calc(var(--waterline) + 14px)', right: '24%' }}>
                    <div className="brass-beam absolute top-[17%] right-[50%] h-40 w-[70vw] origin-right" />
                    <Lighthouse />
                </div>
            </div>
        )
    }
    return null
}

/** The sunken city behind the About section. */
export const CityScenery = () => {
    if (skin === 'neon') {
        return (
            <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] opacity-30">
                <NeonSkyline seed={99} maxH={320} lit={0.06} body="#1a0838" />
            </div>
        )
    }
    if (skin === 'brass') {
        return (
            <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[75%] opacity-45">
                <DecoCity seed={5} maxH={380} color="#0b2423" light="#ffcf7a" />
            </div>
        )
    }
    return null
}

/** Sea floor replacement for the Abyss. */
export const AbyssScenery = () => {
    if (skin !== 'neon') return null
    return (
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%] overflow-hidden [perspective:420px]">
            <div className="neon-grid absolute inset-x-[-50%] bottom-0 h-[200%] origin-bottom [transform:rotateX(62deg)]" />
        </div>
    )
}

/** Full-screen finish: scanlines (neon) or a dark vignette (brass). */
export const SkinOverlay = () => {
    if (skin === 'neon') return <div aria-hidden className="neon-scanlines pointer-events-none fixed inset-0 z-[45]" />
    if (skin === 'brass') return <div aria-hidden className="brass-vignette pointer-events-none fixed inset-0 z-[2]" />
    return null
}
