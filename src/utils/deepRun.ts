// World units: the playfield is always H units tall; its width follows the canvas aspect ratio.

export const H = 240
const SUB_X = 70
const FLOOR = H - 14
const TOP = 16
const BOTTOM = H - 28

interface Mine { kind: 'mine'; x: number; baseY: number; y: number; r: number; amp: number; phase: number }
interface Rock { kind: 'rock'; x: number; w: number; h: number; fromTop: boolean }
type Obstacle = Mine | Rock
interface Pearl { x: number; y: number; taken: boolean }
interface Dot { x: number; y: number; r: number; v: number }
interface Trail { x: number; y: number; r: number; life: number }

export interface World {
    width: number
    t: number
    dist: number
    speed: number
    y: number
    vy: number
    obstacles: Obstacle[]
    pearls: Pearl[]
    nextSpawn: number
    bonus: number
    snow: Dot[]
    trail: Trail[]
    trailTimer: number
    flash: number
}

const rand = (a: number, b: number) => a + Math.random() * (b - a)
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v))

export const createWorld = (width: number): World => ({
    width,
    t: 0,
    dist: 0,
    speed: 110,
    y: H / 2,
    vy: 0,
    obstacles: [],
    pearls: [],
    nextSpawn: width * 0.5,
    bonus: 0,
    snow: Array.from({ length: 46 }, () => ({ x: Math.random() * width, y: Math.random() * H, r: rand(0.4, 1.6), v: rand(0.15, 0.6) })),
    trail: [],
    trailTimer: 0,
    flash: 0,
})

export const score = (w: World) => Math.floor(w.dist / 8) + w.bonus

const spawn = (w: World) => {
    const x = w.width + 40
    if (Math.random() < 0.5) {
        const baseY = rand(34, BOTTOM - 20)
        const amp = Math.random() < 0.45 ? 0 : rand(10, 34)
        w.obstacles.push({ kind: 'mine', x, baseY, y: baseY, r: rand(9, 13), amp, phase: rand(0, 6) })
        if (Math.random() < 0.6) {
            const py = baseY > H / 2 ? rand(30, baseY - 56) : rand(baseY + 56, BOTTOM)
            w.pearls.push({ x: x + rand(0, 40), y: clamp(py, 26, BOTTOM), taken: false })
        }
    } else {
        const fromTop = Math.random() < 0.4
        const h = rand(H * 0.26, H * 0.5)
        const width = rand(26, 44)
        w.obstacles.push({ kind: 'rock', x, w: width, h, fromTop })
        if (Math.random() < 0.6) {
            w.pearls.push({ x: x + width / 2, y: fromTop ? rand(h + 30, BOTTOM) : rand(26, FLOOR - h - 30), taken: false })
        }
    }
    w.nextSpawn = w.dist + rand(170, 250) * (w.speed / 110) ** 0.35
}

const circleRect = (cx: number, cy: number, r: number, x: number, y: number, rw: number, rh: number) => {
    const nx = clamp(cx, x, x + rw)
    const ny = clamp(cy, y, y + rh)
    return (cx - nx) ** 2 + (cy - ny) ** 2 < r * r
}

/** Advances the world. Returns what happened this frame. */
export const step = (w: World, dt: number, up: boolean) => {
    const events = { crashed: false, pearl: false }
    w.t += dt
    w.speed = Math.min(320, 110 + w.t * 5.5)
    const dx = w.speed * dt
    w.dist += dx

    w.vy = clamp(w.vy + (up ? -440 : 230) * dt, -190, 210)
    w.y += w.vy * dt
    if (w.y < TOP) { w.y = TOP; w.vy = Math.max(0, w.vy) }
    if (w.y > BOTTOM) { w.y = BOTTOM; w.vy = Math.min(0, w.vy) }

    for (const o of w.obstacles) {
        o.x -= dx
        if (o.kind === 'mine') o.y = o.baseY + Math.sin(w.t * 1.8 + o.phase) * o.amp
    }
    w.obstacles = w.obstacles.filter(o => o.x > -80)
    for (const p of w.pearls) p.x -= dx
    w.pearls = w.pearls.filter(p => p.x > -20 && !p.taken)

    for (const s of w.snow) {
        s.x -= dx * s.v
        s.y += 6 * dt * s.v
        if (s.x < 0) s.x += w.width
        if (s.y > H) s.y -= H
    }

    w.trailTimer -= dt
    if (w.trailTimer <= 0) {
        w.trailTimer = 0.05
        w.trail.push({ x: SUB_X - 32, y: w.y + rand(-3, 3), r: rand(1.4, 3.4), life: 1 })
    }
    for (const b of w.trail) {
        b.x -= dx * 0.55
        b.y -= 16 * dt
        b.life -= dt * 1.5
    }
    w.trail = w.trail.filter(b => b.life > 0)

    if (w.dist >= w.nextSpawn) spawn(w)

    const hull = [{ x: SUB_X + 14, y: w.y, r: 9 }, { x: SUB_X - 10, y: w.y + 1, r: 9 }]
    for (const o of w.obstacles) {
        for (const c of hull) {
            const hit = o.kind === 'mine'
                ? Math.hypot(c.x - o.x, c.y - o.y) < c.r + o.r * 0.85
                : circleRect(c.x, c.y, c.r, o.x + o.w * 0.2, o.fromTop ? 0 : FLOOR - o.h + 8, o.w * 0.6, o.h - 8 + (o.fromTop ? 0 : 14))
            if (hit) events.crashed = true
        }
    }
    for (const p of w.pearls) {
        if (Math.hypot(SUB_X + 4 - p.x, w.y - p.y) < 18) {
            p.taken = true
            w.bonus += 25
            events.pearl = true
        }
    }
    if (events.crashed) w.flash = 1
    return events
}

const drawSub = (ctx: CanvasRenderingContext2D, w: World) => {
    ctx.save()
    ctx.translate(SUB_X, w.y)
    ctx.rotate(clamp(w.vy / 700, -0.22, 0.22))

    const beam = ctx.createLinearGradient(28, 0, 190, 0)
    beam.addColorStop(0, 'rgba(255, 240, 190, 0.32)')
    beam.addColorStop(1, 'rgba(255, 240, 190, 0)')
    ctx.fillStyle = beam
    ctx.beginPath()
    ctx.moveTo(28, -3)
    ctx.lineTo(190, -44)
    ctx.lineTo(190, 44)
    ctx.lineTo(28, 3)
    ctx.fill()

    ctx.fillStyle = '#e8952a'
    ctx.beginPath()
    ctx.moveTo(-22, -5); ctx.lineTo(-33, -14); ctx.lineTo(-30, 0); ctx.lineTo(-33, 14); ctx.lineTo(-22, 5)
    ctx.fill()
    ctx.strokeStyle = '#d98a2b'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(6, -18); ctx.lineTo(6, -24); ctx.lineTo(12, -24)
    ctx.stroke()
    ctx.fillStyle = '#f4a43a'
    ctx.beginPath()
    ctx.roundRect(-4, -19, 16, 10, 4)
    ctx.fill()
    ctx.fillStyle = '#ffb648'
    ctx.beginPath()
    ctx.roundRect(-28, -11, 58, 22, 11)
    ctx.fill()
    for (const x of [-12, 1, 14]) {
        ctx.fillStyle = '#0a3a63'
        ctx.beginPath(); ctx.arc(x, 0, 3.6, 0, Math.PI * 2); ctx.fill()
        ctx.fillStyle = '#6ff3e0'
        ctx.beginPath(); ctx.arc(x, 0, 2, 0, Math.PI * 2); ctx.fill()
    }
    ctx.restore()
}

export const draw = (ctx: CanvasRenderingContext2D, w: World, scale: number, labels: { score: string, best: string, bestValue: number }) => {
    ctx.setTransform(scale, 0, 0, scale, 0, 0)

    const bg = ctx.createLinearGradient(0, 0, 0, H)
    bg.addColorStop(0, '#08294c')
    bg.addColorStop(1, '#020814')
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, w.width, H)

    ctx.fillStyle = 'rgba(234, 247, 255, 0.35)'
    for (const s of w.snow) {
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill()
    }

    ctx.fillStyle = '#0c2238'
    ctx.beginPath()
    ctx.moveTo(0, H)
    for (let x = 0; x <= w.width + 10; x += 10) ctx.lineTo(x, FLOOR + Math.sin((x + w.dist) * 0.03) * 3)
    ctx.lineTo(w.width, H)
    ctx.fill()

    for (const o of w.obstacles) {
        if (o.kind === 'rock') {
            ctx.fillStyle = '#0f2a45'
            ctx.strokeStyle = '#1f4a70'
            ctx.lineWidth = 1.5
            ctx.beginPath()
            if (o.fromTop) {
                ctx.moveTo(o.x, 0); ctx.lineTo(o.x + o.w * 0.25, o.h * 0.6); ctx.lineTo(o.x + o.w * 0.5, o.h)
                ctx.lineTo(o.x + o.w * 0.72, o.h * 0.55); ctx.lineTo(o.x + o.w, 0)
            } else {
                ctx.moveTo(o.x, H); ctx.lineTo(o.x + o.w * 0.2, FLOOR - o.h * 0.55); ctx.lineTo(o.x + o.w * 0.45, FLOOR - o.h)
                ctx.lineTo(o.x + o.w * 0.72, FLOOR - o.h * 0.6); ctx.lineTo(o.x + o.w, H)
            }
            ctx.closePath()
            ctx.fill()
            ctx.stroke()
        } else {
            ctx.strokeStyle = '#5b7792'
            ctx.lineWidth = 2
            for (let i = 0; i < 8; i++) {
                const a = (i / 8) * Math.PI * 2 + w.t * 0.4
                ctx.beginPath()
                ctx.moveTo(o.x + Math.cos(a) * o.r * 0.8, o.y + Math.sin(a) * o.r * 0.8)
                ctx.lineTo(o.x + Math.cos(a) * (o.r + 5), o.y + Math.sin(a) * (o.r + 5))
                ctx.stroke()
            }
            ctx.fillStyle = '#2b3d52'
            ctx.beginPath(); ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2); ctx.fill()
            ctx.fillStyle = `rgba(255, 90, 110, ${0.45 + Math.sin(w.t * 7 + o.phase) * 0.45})`
            ctx.beginPath(); ctx.arc(o.x - o.r * 0.25, o.y - o.r * 0.25, 2.4, 0, Math.PI * 2); ctx.fill()
        }
    }

    for (const p of w.pearls) {
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 13)
        glow.addColorStop(0, 'rgba(201, 255, 246, 0.7)')
        glow.addColorStop(1, 'rgba(111, 243, 224, 0)')
        ctx.fillStyle = glow
        ctx.beginPath(); ctx.arc(p.x, p.y, 13, 0, Math.PI * 2); ctx.fill()
        ctx.fillStyle = '#f4fffd'
        ctx.beginPath(); ctx.arc(p.x, p.y, 4.5, 0, Math.PI * 2); ctx.fill()
    }

    ctx.strokeStyle = 'rgba(234, 247, 255, 0.5)'
    ctx.lineWidth = 1
    for (const b of w.trail) {
        ctx.globalAlpha = b.life
        ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2); ctx.stroke()
    }
    ctx.globalAlpha = 1

    drawSub(ctx, w)

    if (w.flash > 0) {
        ctx.fillStyle = `rgba(255, 122, 144, ${w.flash * 0.35})`
        ctx.fillRect(0, 0, w.width, H)
    }

    ctx.font = '600 11px "Martian Mono", ui-monospace, monospace'
    ctx.textBaseline = 'top'
    ctx.fillStyle = '#ffb648'
    ctx.textAlign = 'left'
    ctx.fillText(`${labels.score} ${score(w)}`, 14, 12)
    ctx.fillStyle = 'rgba(234, 247, 255, 0.6)'
    ctx.textAlign = 'right'
    ctx.fillText(`${labels.best} ${Math.max(labels.bestValue, score(w))}`, w.width - 14, 12)
}
