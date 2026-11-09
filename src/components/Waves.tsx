// Three looping wave layers sitting on the hero waterline. Each path spans two identical
// 1440-unit periods, so translating it by -50% loops seamlessly.
const crest = (amplitude: number, invert = false) => {
    const mid = 30
    const peak = invert ? mid + amplitude : mid - amplitude
    let d = `M0 ${mid} Q180 ${peak} 360 ${mid}`
    for (let x = 720; x <= 2880; x += 360) d += ` T${x} ${mid}`
    return `${d} V64 H0Z`
}

const layers = [
    { d: crest(20, true), fill: 'color-mix(in oklab, var(--water-surface) 40%, white)', opacity: 0.55, className: 'animate-wave-slow -top-4', foam: false },
    { d: crest(14), fill: 'color-mix(in oklab, var(--water-surface) 70%, white)', opacity: 0.85, className: 'animate-wave -top-1', foam: false },
    { d: crest(10, true), fill: 'var(--water-surface)', opacity: 1, className: 'animate-wave-fast top-2', foam: true },
]

const Waves = () => (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 h-20 -translate-y-[62%] overflow-hidden" style={{ top: 'var(--waterline)' }}>
        {layers.map((layer, i) => (
            <svg
                key={i}
                viewBox="0 0 2880 64"
                preserveAspectRatio="none"
                className={`absolute left-0 h-full w-[200%] ${layer.className}`}
                style={{ opacity: layer.opacity, transition: 'fill 0.6s' }}>
                <path d={layer.d} style={{ fill: layer.fill }} stroke={layer.foam ? 'rgb(255 255 255 / 0.55)' : 'none'} strokeWidth={2} vectorEffect="non-scaling-stroke" />
            </svg>
        ))}
    </div>
)

export default Waves
