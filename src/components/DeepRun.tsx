import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { LuPlay, LuRotateCcw } from "react-icons/lu"
import { languageContext } from "../context/languageContext"
import { gameContext } from "../context/gameContext"
import { createWorld, draw, H, score, step, World } from "../utils/deepRun"
import { sounds } from "../utils/sound"

type Phase = 'idle' | 'playing' | 'paused' | 'over'

const UP_KEYS = [' ', 'arrowup', 'w']

const DeepRun = () => {

    const { text } = useContext(languageContext)
    const { progress, recordScore } = useContext(gameContext)

    const wrapRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const worldRef = useRef<World | null>(null)
    const upRef = useRef(false)
    const phaseRef = useRef<Phase>('idle')
    const bestRef = useRef(progress.best)
    const labelsRef = useRef({ score: text.game.score, best: text.game.best })

    const [phase, setPhaseState] = useState<Phase>('idle')
    const [result, setResult] = useState({ score: 0, newBest: false })

    useEffect(() => { bestRef.current = progress.best }, [progress.best])
    useEffect(() => { labelsRef.current = { score: text.game.score, best: text.game.best } }, [text])

    const setPhase = useCallback((next: Phase) => {
        phaseRef.current = next
        setPhaseState(next)
    }, [])

    const render = useCallback(() => {
        const canvas = canvasRef.current
        const world = worldRef.current
        const ctx = canvas?.getContext('2d')
        if (!canvas || !world || !ctx) return
        draw(ctx, world, canvas.height / H, { ...labelsRef.current, bestValue: bestRef.current })
    }, [])

    useEffect(() => {
        const wrap = wrapRef.current
        const canvas = canvasRef.current
        if (!wrap || !canvas) return
        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2)
            const { width, height } = wrap.getBoundingClientRect()
            if (!width || !height) return
            canvas.width = Math.round(width * dpr)
            canvas.height = Math.round(height * dpr)
            const worldWidth = H * (width / height)
            if (worldRef.current) worldRef.current.width = worldWidth
            else worldRef.current = createWorld(worldWidth)
            render()
        }
        const observer = new ResizeObserver(resize)
        observer.observe(wrap)
        return () => observer.disconnect()
    }, [render])

    // The HUD labels are drawn on the canvas.
    useEffect(() => { if (phaseRef.current !== 'playing') render() }, [text, render])

    useEffect(() => {
        if (phase !== 'playing') return
        const loop = { raf: 0, last: performance.now() }
        const tick = (now: number) => {
            const world = worldRef.current
            if (!world) return
            const dt = Math.min(0.05, (now - loop.last) / 1000)
            loop.last = now
            const events = step(world, dt, upRef.current)
            if (events.pearl) sounds.pearl()
            render()
            if (events.crashed) {
                sounds.crash()
                const final = score(world)
                const newBest = recordScore(final)
                setResult({ score: final, newBest })
                setPhase('over')
                return
            }
            loop.raf = requestAnimationFrame(tick)
        }
        loop.raf = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(loop.raf)
    }, [phase, recordScore, render, setPhase])

    useEffect(() => {
        if (phase !== 'playing') return
        const onDown = (event: KeyboardEvent) => {
            const key = event.key.toLowerCase()
            if (UP_KEYS.includes(key)) {
                event.preventDefault()
                upRef.current = true
            }
            if (key === 'escape') setPhase('paused')
        }
        const onUp = (event: KeyboardEvent) => {
            if (UP_KEYS.includes(event.key.toLowerCase())) upRef.current = false
        }
        window.addEventListener('keydown', onDown)
        window.addEventListener('keyup', onUp)
        return () => {
            window.removeEventListener('keydown', onDown)
            window.removeEventListener('keyup', onUp)
            upRef.current = false
        }
    }, [phase, setPhase])

    useEffect(() => {
        const wrap = wrapRef.current
        if (!wrap) return
        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting && phaseRef.current === 'playing') setPhase('paused')
        }, { threshold: 0.35 })
        observer.observe(wrap)
        return () => observer.disconnect()
    }, [setPhase])

    const start = () => {
        const wrap = wrapRef.current
        if (!wrap) return
        const { width, height } = wrap.getBoundingClientRect()
        worldRef.current = createWorld(H * (width / Math.max(1, height)))
        upRef.current = false
        setPhase('playing')
        wrap.focus({ preventScroll: true })
    }

    const resume = () => {
        setPhase('playing')
        wrapRef.current?.focus({ preventScroll: true })
    }

    const press = (down: boolean) => {
        if (phaseRef.current === 'playing') upRef.current = down
    }

    return (
        <div
            ref={wrapRef}
            data-game
            tabIndex={-1}
            role="group"
            aria-label={text.game.label}
            onPointerDown={event => {
                if ((event.target as HTMLElement).closest('button')) return
                event.currentTarget.setPointerCapture(event.pointerId)
                press(true)
            }}
            onPointerUp={() => press(false)}
            onPointerCancel={() => press(false)}
            className="relative aspect-[4/3] w-full overflow-hidden rounded-[26px] bg-abyss ring-1 ring-glow/25 shadow-[0_0_60px_-20px_var(--color-glow)] outline-none select-none sm:aspect-[21/9]"
            style={{ touchAction: phase === 'playing' ? 'none' : 'auto' }}>
            <canvas ref={canvasRef} aria-hidden className="absolute inset-0 size-full" />

            {phase !== 'playing' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-abyss/55 p-6 text-center backdrop-blur-[2px]">
                    {phase === 'over' ? (
                        <>
                            <p className="text-sm text-coral">{text.game.over}</p>
                            <p className="font-gauge text-4xl text-signal sm:text-5xl">{result.score}</p>
                            {result.newBest && <p className="text-sm text-glow">{text.game.newBest}</p>}
                        </>
                    ) : (
                        <h3 className="text-3xl font-bold tracking-tight sm:text-4xl">{phase === 'paused' ? text.game.paused : text.game.title}</h3>
                    )}
                    {phase !== 'paused' && <p className="max-w-[44ch] text-sm text-foam/75 sm:text-base">{text.game.howTo}</p>}
                    <button
                        type="button"
                        onClick={phase === 'paused' ? resume : start}
                        className="mt-1 inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3 font-semibold text-ink shadow-[0_8px_30px_-6px_rgb(255_182_72/0.7)] transition-transform hover:-translate-y-0.5">
                        {phase === 'over' ? <LuRotateCcw aria-hidden /> : <LuPlay aria-hidden />}
                        {phase === 'over' ? text.game.again : phase === 'paused' ? text.game.resume : text.game.start}
                    </button>
                    {progress.best > 0 && <p className="font-gauge text-xs text-foam/55">{text.game.best} {progress.best}</p>}
                </div>
            )}
        </div>
    )
}

export default DeepRun
