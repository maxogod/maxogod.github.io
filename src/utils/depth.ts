import type { SectionId, ZoneId } from './languageUtils'

// Scroll position -> depth in meters. Each home section starts at a real ocean zone boundary,
// and the bottom of the page is the Challenger Deep.
export const SECTION_DEPTHS: { id: SectionId; depth: number }[] = [
    { id: 'surface', depth: 0 },
    { id: 'about', depth: 40 },
    { id: 'projects', depth: 200 },
    { id: 'contact', depth: 1000 },
    { id: 'abyss', depth: 4000 },
]
export const BOTTOM_DEPTH = 10935

export interface DepthSnapshot {
    depth: number
    zone: ZoneId
    section: SectionId
    /** 0..1 scroll progress of the whole page. */
    progress: number
    /** 0..1 position of each section's top, same order as SECTION_DEPTHS. */
    marks: number[]
}

export const zoneFor = (depth: number): ZoneId => {
    if (depth < 8) return 'surface'
    if (depth < 200) return 'sunlight'
    if (depth < 1000) return 'twilight'
    if (depth < 4000) return 'midnight'
    return 'abyss'
}

const interpolate = (x: number, points: { x: number; y: number }[]): number => {
    if (x <= points[0].x) return points[0].y
    for (let i = 1; i < points.length; i++) {
        const a = points[i - 1]
        const b = points[i]
        if (x <= b.x) return a.y + ((x - a.x) / Math.max(1, b.x - a.x)) * (b.y - a.y)
    }
    return points[points.length - 1].y
}

/** Water temperature in °C (rough open-ocean profile). */
export const temperatureAt = (depth: number) =>
    interpolate(depth, [
        { x: 0, y: 24 }, { x: 200, y: 15 }, { x: 1000, y: 5 }, { x: 4000, y: 2 }, { x: BOTTOM_DEPTH, y: 1.5 },
    ])

export const pressureAt = (depth: number) => 1 + depth / 10.06

let snapshot: DepthSnapshot = { depth: 0, zone: 'surface', section: 'surface', progress: 0, marks: [] }
/** Viewport y of the hero waterline (raw, updated every measure; read by the canvas). */
let waterlineY = 0
let rawDepth = 0
const listeners = new Set<() => void>()
let frame = 0

const sameMarks = (a: number[], b: number[]) => a.length === b.length && a.every((v, i) => Math.abs(v - b[i]) < 0.001)

const measure = () => {
    frame = 0
    const vh = window.innerHeight
    const y = window.scrollY
    const max = Math.max(1, document.documentElement.scrollHeight - vh)
    const eye = vh * 0.35

    const anchors: { x: number; y: number }[] = []
    const marks: number[] = []
    let section: SectionId = 'surface'
    for (const s of SECTION_DEPTHS) {
        const el = document.getElementById(s.id)
        if (!el) continue
        const top = el.getBoundingClientRect().top + y
        anchors.push({ x: s.id === 'surface' ? eye : top, y: s.depth })
        marks.push(Math.min(1, top / max))
        if (y + eye >= top) section = s.id
    }
    anchors.push({ x: max + eye, y: BOTTOM_DEPTH })

    rawDepth = anchors.length > 1 ? interpolate(y + eye, anchors) : 0
    const wl = document.getElementById('waterline')
    waterlineY = wl ? wl.getBoundingClientRect().top : -1

    const depth = Math.round(rawDepth)
    const progress = Math.min(1, y / max)
    const next: DepthSnapshot = {
        depth,
        zone: zoneFor(depth),
        section,
        progress: Math.abs(progress - snapshot.progress) < 0.0005 ? snapshot.progress : progress,
        marks: sameMarks(marks, snapshot.marks) ? snapshot.marks : marks,
    }
    if (
        next.depth !== snapshot.depth || next.section !== snapshot.section ||
        next.progress !== snapshot.progress || next.marks !== snapshot.marks
    ) {
        snapshot = next
        listeners.forEach(l => l())
    }
}

export const requestMeasure = () => {
    if (!frame) frame = requestAnimationFrame(measure)
}

/** Starts listening to scroll/resize. Returns a cleanup function. */
export const startDepthTracking = () => {
    window.addEventListener('scroll', requestMeasure, { passive: true })
    window.addEventListener('resize', requestMeasure)
    const observer = new ResizeObserver(requestMeasure)
    observer.observe(document.body)
    measure()
    return () => {
        window.removeEventListener('scroll', requestMeasure)
        window.removeEventListener('resize', requestMeasure)
        observer.disconnect()
        cancelAnimationFrame(frame)
        frame = 0
    }
}

export const subscribeDepth = (listener: () => void) => {
    listeners.add(listener)
    return () => { listeners.delete(listener) }
}

export const getDepthSnapshot = () => snapshot
export const getRawDepth = () => rawDepth
export const getWaterlineY = () => waterlineY

/** Smooth-scrolls to a home section by id. */
export const scrollToSection = (id: SectionId) => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (id === 'surface') {
        window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
        return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
}
