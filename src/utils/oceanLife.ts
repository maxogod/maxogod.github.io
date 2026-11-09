// Ambient sea life drawn on a fixed, full-viewport canvas. Which creatures show depends on depth:
// reef fish near the surface, lanternfish in the twilight zone, jellyfish and marine snow deeper.

type Kind = 'reef' | 'lantern'

interface School { x: number; y: number; dir: 1 | -1; speed: number; drift: number; kind: Kind }
interface Fish { x: number; y: number; vx: number; vy: number; ox: number; oy: number; size: number; color: string; school: School; wag: number; face: number }
interface Jelly { x: number; y: number; size: number; phase: number; drift: number }
interface Bubble { x: number; y: number; r: number; vy: number; phase: number }
interface Snow { x: number; y: number; r: number; vy: number }
interface Spark { x: number; y: number; vx: number; vy: number; life: number }

/** Fish colors and jellyfish color ("r, g, b"); seasons override the defaults. */
export interface LifePalette { reef: string[]; jelly: string }

export const defaultPalette: LifePalette = {
    reef: ['#ffb648', '#ff7a90', '#6ff3e0', '#ffe27a', '#8fd3ff'],
    jelly: '111, 243, 224',
}

export interface Ocean {
    jelly: string
    w: number
    h: number
    schools: School[]
    fish: Fish[]
    jellies: Jelly[]
    bubbles: Bubble[]
    snow: Snow[]
    sparks: Spark[]
    t: number
}

const rand = (a: number, b: number) => a + Math.random() * (b - a)
const pick = <T,>(items: T[]) => items[Math.floor(Math.random() * items.length)]
const smooth = (edge0: number, edge1: number, x: number) => {
    const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)))
    return t * t * (3 - 2 * t)
}

const newBubble = (o: Ocean, anywhere = false): Bubble => ({
    x: rand(0, o.w),
    y: anywhere ? rand(0, o.h) : o.h + rand(10, 260),
    r: Math.random() < 0.25 ? rand(8, 15) : rand(2.5, 8),
    vy: rand(22, 60),
    phase: rand(0, Math.PI * 2),
})

export const createOcean = (w: number, h: number, palette: LifePalette = defaultPalette): Ocean => {
    const small = w < 700
    const o: Ocean = { jelly: palette.jelly, w, h, schools: [], fish: [], jellies: [], bubbles: [], snow: [], sparks: [], t: 0 }
    const addSchool = (kind: Kind, count: number) => {
        const school: School = { x: rand(0, w), y: rand(h * 0.2, h * 0.85), dir: Math.random() < 0.5 ? 1 : -1, speed: rand(22, 46), drift: rand(0, 10), kind }
        o.schools.push(school)
        const color = pick(palette.reef)
        for (let i = 0; i < count; i++) {
            const ox = rand(-70, 70)
            const oy = rand(-34, 34)
            o.fish.push({
                x: school.x + ox, y: school.y + oy, vx: 0, vy: 0, ox, oy,
                size: kind === 'reef' ? rand(5, 8) : rand(3.5, 5.5),
                color: kind === 'reef' ? (Math.random() < 0.8 ? color : pick(palette.reef)) : '#9fb8d6',
                school, wag: rand(0, 6), face: school.dir,
            })
        }
    }
    for (let i = 0; i < (small ? 2 : 3); i++) addSchool('reef', small ? 5 : 7)
    for (let i = 0; i < (small ? 2 : 3); i++) addSchool('lantern', small ? 6 : 9)
    for (let i = 0; i < (small ? 3 : 5); i++) o.jellies.push({ x: rand(0, w), y: rand(0, h), size: rand(12, 26), phase: rand(0, 6), drift: rand(-8, 8) })
    for (let i = 0; i < (small ? 12 : 22); i++) o.bubbles.push(newBubble(o, true))
    for (let i = 0; i < (small ? 40 : 80); i++) o.snow.push({ x: rand(0, w), y: rand(0, h), r: rand(0.5, 1.8), vy: rand(4, 14) })
    return o
}

export const resizeOcean = (o: Ocean, w: number, h: number) => {
    o.w = w
    o.h = h
}

const wrapY = (y: number, h: number) => (y < -120 ? y + h + 240 : y > h + 120 ? y - h - 240 : y)

/** Moves everything by a scroll delta so creatures drift past as you dive (parallax). */
export const shiftOcean = (o: Ocean, dy: number) => {
    for (const s of o.schools) s.y = wrapY(s.y - dy * 0.45, o.h)
    for (const f of o.fish) {
        f.y -= dy * 0.45
        if (Math.abs(f.y - f.school.y) > 300) f.y = f.school.y + f.oy
    }
    for (const j of o.jellies) j.y = wrapY(j.y - dy * 0.6, o.h)
    for (const s of o.snow) s.y = wrapY(s.y - dy * 0.8, o.h)
    for (const b of o.bubbles) b.y -= dy * 0.3
}

export interface Pointer { x: number; y: number; active: boolean }

export const stepOcean = (o: Ocean, dt: number, pointer: Pointer, surfaceY: number) => {
    o.t += dt
    for (const s of o.schools) {
        s.x += s.dir * s.speed * dt
        s.y += Math.sin(o.t * 0.3 + s.drift) * 8 * dt
        if (s.x > o.w + 160) { s.x = -160; s.y = rand(o.h * 0.15, o.h * 0.9) }
        if (s.x < -160) { s.x = o.w + 160; s.y = rand(o.h * 0.15, o.h * 0.9) }
    }
    for (const f of o.fish) {
        const tx = f.school.x + f.ox + Math.sin(o.t * 0.9 + f.wag) * 8
        const ty = f.school.y + f.oy + Math.cos(o.t * 0.7 + f.wag) * 6
        f.vx += (tx - f.x) * 1.6 * dt
        f.vy += (ty - f.y) * 1.6 * dt
        if (pointer.active) {
            const dx = f.x - pointer.x
            const dy = f.y - pointer.y
            const d = Math.hypot(dx, dy)
            if (d < 140 && d > 0.1) {
                const push = (140 - d) * 9 * dt
                f.vx += (dx / d) * push
                f.vy += (dy / d) * push
            }
        }
        f.vx *= 0.94
        f.vy *= 0.94
        const speed = Math.hypot(f.vx, f.vy)
        if (speed > 260) { f.vx *= 260 / speed; f.vy *= 260 / speed }
        f.x += (f.vx + f.school.dir * f.school.speed * 0.9) * dt
        f.y += f.vy * dt
        const heading = f.vx + f.school.dir * f.school.speed
        if (Math.abs(heading) > 4) f.face += ((heading > 0 ? 1 : -1) - f.face) * Math.min(1, dt * 6)
        // a school that drifted off-screen snaps its stragglers back
        if (Math.abs(f.x - f.school.x) > 400) f.x = f.school.x + f.ox
        if (f.y < surfaceY + 12) f.vy += 60 * dt
    }
    for (const j of o.jellies) {
        const pulse = Math.max(0, Math.sin(o.t * 1.6 + j.phase))
        j.y -= (4 + pulse * 18) * dt
        j.x += Math.sin(o.t * 0.2 + j.phase) * j.drift * dt
        if (j.y < -80) { j.y = o.h + 80; j.x = rand(0, o.w) }
    }
    for (let i = 0; i < o.bubbles.length; i++) {
        const b = o.bubbles[i]
        b.y -= b.vy * dt
        b.x += Math.sin(o.t * 2 + b.phase) * 14 * dt
        if (b.y < Math.max(-30, surfaceY + b.r) || b.y > o.h + 600) o.bubbles[i] = newBubble(o)
    }
    for (const s of o.snow) {
        s.y += s.vy * dt
        if (s.y > o.h + 10) { s.y = -10; s.x = rand(0, o.w) }
    }
    for (const p of o.sparks) {
        p.x += p.vx * dt
        p.y += p.vy * dt
        p.vy -= 30 * dt
        p.life -= dt * 2.2
    }
    o.sparks = o.sparks.filter(p => p.life > 0)
}

/** Pushes every fish away from a point (sonar ping). */
export const scatter = (o: Ocean, x: number, y: number) => {
    for (const f of o.fish) {
        const dx = f.x - x
        const dy = f.y - y
        const d = Math.max(30, Math.hypot(dx, dy))
        f.vx += (dx / d) * 320
        f.vy += (dy / d) * 320
    }
}

/** Returns the index of a visible bubble under the point, or -1. */
export const bubbleAt = (o: Ocean, x: number, y: number, surfaceY: number) =>
    o.bubbles.findIndex(b => b.y > surfaceY && Math.hypot(b.x - x, b.y - y) < b.r + 10)

export const popBubble = (o: Ocean, index: number) => {
    const b = o.bubbles[index]
    for (let i = 0; i < 9; i++) {
        const a = (i / 9) * Math.PI * 2
        o.sparks.push({ x: b.x, y: b.y, vx: Math.cos(a) * rand(40, 110), vy: Math.sin(a) * rand(40, 110), life: 1 })
    }
    o.bubbles[index] = newBubble(o)
}

const drawFish = (ctx: CanvasRenderingContext2D, f: Fish, t: number, kind: Kind) => {
    const len = f.size * 2.4
    const wag = Math.sin(t * 12 + f.wag) * f.size * 0.35
    ctx.save()
    ctx.translate(f.x, f.y)
    ctx.scale(f.face < 0 ? -1 : 1, 1)
    ctx.fillStyle = f.color
    ctx.beginPath()
    ctx.moveTo(-len * 0.5, 0)
    ctx.lineTo(-len * 0.95, -f.size * 0.6 + wag)
    ctx.lineTo(-len * 0.95, f.size * 0.6 + wag)
    ctx.closePath()
    ctx.fill()
    ctx.beginPath()
    ctx.ellipse(0, 0, len * 0.55, f.size * 0.55, 0, 0, Math.PI * 2)
    ctx.fill()
    if (kind === 'lantern') {
        ctx.fillStyle = '#6ff3e0'
        for (let i = -1; i <= 1; i++) {
            ctx.beginPath(); ctx.arc(i * len * 0.18, f.size * 0.3, 0.9, 0, Math.PI * 2); ctx.fill()
        }
    }
    ctx.fillStyle = '#062544'
    ctx.beginPath(); ctx.arc(len * 0.3, -f.size * 0.12, Math.max(0.9, f.size * 0.13), 0, Math.PI * 2); ctx.fill()
    ctx.restore()
}

const drawJelly = (ctx: CanvasRenderingContext2D, j: Jelly, t: number, rgb: string) => {
    const pulse = Math.sin(t * 1.6 + j.phase)
    const w = j.size * (1 + pulse * 0.08)
    const h = j.size * (0.75 - pulse * 0.08)
    const glow = ctx.createRadialGradient(j.x, j.y, 0, j.x, j.y, j.size * 2.4)
    glow.addColorStop(0, `rgba(${rgb}, 0.22)`)
    glow.addColorStop(1, `rgba(${rgb}, 0)`)
    ctx.fillStyle = glow
    ctx.beginPath(); ctx.arc(j.x, j.y, j.size * 2.4, 0, Math.PI * 2); ctx.fill()

    ctx.strokeStyle = `rgba(${rgb}, 0.35)`
    ctx.lineWidth = 1.2
    for (let i = -2; i <= 2; i++) {
        ctx.beginPath()
        const x0 = j.x + i * w * 0.32
        ctx.moveTo(x0, j.y)
        for (let k = 1; k <= 6; k++) {
            ctx.lineTo(x0 + Math.sin(t * 2 + k * 0.8 + i) * 3, j.y + k * j.size * 0.35)
        }
        ctx.stroke()
    }
    ctx.fillStyle = `rgba(${rgb}, 0.28)`
    ctx.strokeStyle = `rgba(${rgb}, 0.8)`
    ctx.beginPath()
    ctx.ellipse(j.x, j.y, w, h, 0, Math.PI, 0)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
}

export const drawOcean = (ctx: CanvasRenderingContext2D, o: Ocean, depth: number, surfaceY: number) => {
    ctx.clearRect(0, 0, o.w, o.h)
    ctx.save()
    if (surfaceY > 0) {
        ctx.beginPath()
        ctx.rect(0, surfaceY + 6, o.w, o.h)
        ctx.clip()
    }

    const snowAlpha = smooth(150, 700, depth) * 0.6
    if (snowAlpha > 0.01) {
        ctx.fillStyle = `rgba(234, 247, 255, ${snowAlpha})`
        for (const s of o.snow) {
            ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill()
        }
    }

    const reef = 1 - smooth(120, 380, depth)
    const lantern = smooth(140, 360, depth) * (1 - smooth(2600, 4300, depth))
    for (const f of o.fish) {
        const alpha = f.school.kind === 'reef' ? reef : lantern
        if (alpha < 0.02) continue
        ctx.globalAlpha = alpha * (f.school.kind === 'reef' ? 0.9 : 0.75)
        drawFish(ctx, f, o.t, f.school.kind)
    }

    const jelly = smooth(700, 1200, depth)
    if (jelly > 0.02) {
        ctx.globalAlpha = jelly
        for (const j of o.jellies) drawJelly(ctx, j, o.t, o.jelly)
    }

    ctx.globalAlpha = 1 - smooth(1500, 6000, depth) * 0.5
    for (const b of o.bubbles) {
        ctx.fillStyle = 'rgba(234, 247, 255, 0.08)'
        ctx.strokeStyle = 'rgba(234, 247, 255, 0.55)'
        ctx.lineWidth = 1.2
        ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)'
        ctx.beginPath(); ctx.arc(b.x, b.y, b.r * 0.6, Math.PI * 1.1, Math.PI * 1.45); ctx.stroke()
    }

    ctx.globalAlpha = 1
    ctx.fillStyle = 'rgba(234, 247, 255, 0.85)'
    for (const p of o.sparks) {
        ctx.globalAlpha = p.life
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2); ctx.fill()
    }
    ctx.globalAlpha = 1
    ctx.restore()
}
