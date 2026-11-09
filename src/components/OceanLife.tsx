import { useContext, useEffect, useRef } from "react"
import { gameContext } from "../context/gameContext"
import { getRawDepth, getWaterlineY } from "../utils/depth"
import { SONAR_EVENT } from "../utils/game"
import { bubbleAt, createOcean, drawOcean, Pointer, popBubble, resizeOcean, scatter, shiftOcean, stepOcean } from "../utils/oceanLife"
import { useReducedMotion } from "../hooks/useReducedMotion"
import { getSeason, SEASON_LIFE } from "../utils/season"

// Clicks on these never pop bubbles.
const INTERACTIVE = 'a, button, input, textarea, select, label, dialog, [data-game], [role="dialog"]'

/** Fixed canvas between section backgrounds and content: fish, jellyfish, bubbles, marine snow. */
const OceanLife = () => {

    const canvasRef = useRef<HTMLCanvasElement>(null)
    const { popBubble: countPop } = useContext(gameContext)
    const countPopRef = useRef(countPop)
    const reduceMotion = useReducedMotion()

    useEffect(() => { countPopRef.current = countPop }, [countPop])

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext('2d')
        if (!canvas || !ctx || reduceMotion) return

        const season = getSeason()
        const ocean = createOcean(window.innerWidth, window.innerHeight, season ? SEASON_LIFE[season] : undefined)
        const pointer: Pointer = { x: -999, y: -999, active: false }
        // Mutable loop state lives in one object (closures share it).
        const loop = { dpr: 1, lastScroll: window.scrollY, last: performance.now(), raf: 0 }

        const resize = () => {
            loop.dpr = Math.min(window.devicePixelRatio || 1, 2)
            canvas.width = Math.round(window.innerWidth * loop.dpr)
            canvas.height = Math.round(window.innerHeight * loop.dpr)
            resizeOcean(ocean, window.innerWidth, window.innerHeight)
        }
        resize()

        const surface = () => {
            const y = getWaterlineY()
            return y > 0 ? y : -1
        }

        const frame = (now: number) => {
            const dt = Math.min(0.05, (now - loop.last) / 1000)
            loop.last = now
            const scroll = window.scrollY
            if (scroll !== loop.lastScroll) {
                shiftOcean(ocean, scroll - loop.lastScroll)
                loop.lastScroll = scroll
            }
            const surfaceY = surface()
            stepOcean(ocean, dt, pointer, surfaceY)
            ctx.setTransform(loop.dpr, 0, 0, loop.dpr, 0, 0)
            drawOcean(ctx, ocean, getRawDepth(), surfaceY)
            loop.raf = requestAnimationFrame(frame)
        }
        loop.raf = requestAnimationFrame(frame)

        const onMove = (event: PointerEvent) => {
            pointer.x = event.clientX
            pointer.y = event.clientY
            pointer.active = true
            const target = event.target as HTMLElement | null
            const overBubble = !target?.closest(INTERACTIVE) && bubbleAt(ocean, event.clientX, event.clientY, surface()) >= 0
            document.body.style.cursor = overBubble ? 'pointer' : ''
        }
        const onLeave = () => { pointer.active = false }
        const onUp = (event: PointerEvent) => { if (event.pointerType !== 'mouse') pointer.active = false }
        const onDown = (event: PointerEvent) => {
            if ((event.target as HTMLElement | null)?.closest(INTERACTIVE)) return
            const index = bubbleAt(ocean, event.clientX, event.clientY, surface())
            if (index < 0) return
            popBubble(ocean, index)
            countPopRef.current()
        }
        const onPing = () => scatter(ocean, window.innerWidth / 2, window.innerHeight / 2)

        window.addEventListener('resize', resize)
        window.addEventListener('pointermove', onMove, { passive: true })
        window.addEventListener('pointerdown', onDown)
        window.addEventListener('pointerup', onUp)
        document.documentElement.addEventListener('pointerleave', onLeave)
        window.addEventListener(SONAR_EVENT, onPing)
        return () => {
            cancelAnimationFrame(loop.raf)
            window.removeEventListener('resize', resize)
            window.removeEventListener('pointermove', onMove)
            window.removeEventListener('pointerdown', onDown)
            window.removeEventListener('pointerup', onUp)
            document.documentElement.removeEventListener('pointerleave', onLeave)
            window.removeEventListener(SONAR_EVENT, onPing)
            document.body.style.cursor = ''
        }
    }, [reduceMotion])

    if (reduceMotion) return null

    return <canvas ref={canvasRef} aria-hidden className="pointer-events-none fixed inset-0 z-[1] size-full" />
}

export default OceanLife
