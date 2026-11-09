import { useContext, useEffect, useState } from "react"
import { gameContext } from "../context/gameContext"
import { SONAR_EVENT } from "../utils/game"

/** Expanding sonar rings from the depth readout, one burst per ping. Listens to the event itself so a ping re-renders nothing else. */
export const SonarPing = () => {
    const [burst, setBurst] = useState(0)

    useEffect(() => {
        const onPing = () => setBurst(b => b + 1)
        window.addEventListener(SONAR_EVENT, onPing)
        return () => window.removeEventListener(SONAR_EVENT, onPing)
    }, [])

    if (burst === 0) return null

    // No box-shadow: a glow on a screen-sized scaled layer is very costly on phones. 220vmax reaches the far corner.
    return (
        <div key={burst} aria-hidden className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
            {[0, 0.25].map(delay => (
                <span
                    key={delay}
                    className="absolute size-[220vmax] animate-sonar rounded-full border-4 border-glow/60 opacity-0 will-change-[transform,opacity] md:shadow-[0_0_40px_var(--color-glow),inset_0_0_40px_var(--color-glow)]"
                    style={{ left: 'calc(100% - 44px)', top: 'calc(100% - 44px)', animationDelay: `${delay}s` }} />
            ))}
        </div>
    )
}

/** A whale swims by when the cheat code is entered. */
export const Whale = () => {
    const { whaleCount } = useContext(gameContext)
    const [finished, setFinished] = useState(0)

    if (whaleCount === finished) return null

    return (
        <div aria-hidden className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
            <svg
                key={whaleCount}
                viewBox="0 0 420 170"
                onAnimationEnd={() => setFinished(whaleCount)}
                className="absolute top-[58%] left-0 w-[min(70vw,680px)] animate-whale opacity-90 drop-shadow-[0_0_30px_rgb(111_243_224/0.35)]">
                <path d="M34 92 C 70 40 210 26 310 50 C 356 62 392 78 404 96 C 384 120 320 132 236 130 C 160 128 86 120 44 104Z" fill="#0d2c4c" stroke="#6ff3e0" strokeOpacity="0.5" strokeWidth="2" />
                <path d="M44 100 L4 62 Q20 86 12 92 Q22 96 6 132Z" fill="#0d2c4c" stroke="#6ff3e0" strokeOpacity="0.5" strokeWidth="2" />
                <path d="M226 126 Q206 156 178 164 Q206 136 210 124Z" fill="#0d2c4c" stroke="#6ff3e0" strokeOpacity="0.5" strokeWidth="2" />
                {[0, 1, 2, 3, 4].map(i => (
                    <path key={i} d={`M${250 + i * 22} ${118 - i} q 14 2 26 -2`} fill="none" stroke="#6ff3e0" strokeOpacity="0.3" strokeWidth="1.5" />
                ))}
                <circle cx="352" cy="88" r="3.5" fill="#eaf7ff" />
                <path d="M330 52 q 6 -26 -4 -44 M336 50 q 14 -20 18 -40" fill="none" stroke="#eaf7ff" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" />
            </svg>
        </div>
    )
}
