// Tiny synthesized sound effects (no audio files). Only ever played in response to a user action.

let ctx: AudioContext | null = null
let enabled = true

export const setSoundEnabled = (on: boolean) => {
    enabled = on
}

const audio = (): AudioContext | null => {
    if (!enabled) return null
    try {
        ctx ??= new AudioContext()
    } catch {
        return null
    }
    if (ctx.state === 'suspended') void ctx.resume()
    return ctx
}

interface Tone {
    freq: number
    to?: number
    type?: OscillatorType
    start?: number
    dur?: number
    gain?: number
}

const tone = (c: AudioContext, { freq, to, type = 'sine', start = 0, dur = 0.15, gain = 0.12 }: Tone) => {
    const osc = c.createOscillator()
    const amp = c.createGain()
    const t = c.currentTime + start
    osc.type = type
    osc.frequency.setValueAtTime(freq, t)
    if (to) osc.frequency.exponentialRampToValueAtTime(to, t + dur)
    amp.gain.setValueAtTime(0.0001, t)
    amp.gain.exponentialRampToValueAtTime(gain, t + 0.012)
    amp.gain.exponentialRampToValueAtTime(0.0001, t + dur)
    osc.connect(amp).connect(c.destination)
    osc.start(t)
    osc.stop(t + dur + 0.05)
}

const noise = (c: AudioContext, dur: number, gain: number) => {
    const length = Math.floor(c.sampleRate * dur)
    const buffer = c.createBuffer(1, length, c.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / length) ** 2
    const src = c.createBufferSource()
    const filter = c.createBiquadFilter()
    const amp = c.createGain()
    filter.type = 'lowpass'
    filter.frequency.value = 700
    amp.gain.value = gain
    src.buffer = buffer
    src.connect(filter).connect(amp).connect(c.destination)
    src.start()
}

export const sounds = {
    pop: () => {
        const c = audio()
        if (!c) return
        tone(c, { freq: 500 + Math.random() * 400, to: 1300, dur: 0.07, gain: 0.1 })
    },
    ping: () => {
        const c = audio()
        if (!c) return
        tone(c, { freq: 1480, to: 1380, dur: 1.3, gain: 0.14 })
        tone(c, { freq: 1480, to: 1380, start: 0.42, dur: 0.9, gain: 0.04 })
    },
    collect: () => {
        const c = audio()
        if (!c) return
        ;[660, 880, 1320].forEach((freq, i) => tone(c, { freq, type: 'triangle', start: i * 0.07, dur: 0.22, gain: 0.09 }))
    },
    achieve: () => {
        const c = audio()
        if (!c) return
        tone(c, { freq: 523, type: 'triangle', dur: 0.35, gain: 0.08 })
        tone(c, { freq: 784, type: 'triangle', start: 0.1, dur: 0.4, gain: 0.08 })
        tone(c, { freq: 1046, type: 'sine', start: 0.2, dur: 0.6, gain: 0.07 })
    },
    pearl: () => {
        const c = audio()
        if (!c) return
        tone(c, { freq: 1200, to: 1800, type: 'sine', dur: 0.12, gain: 0.07 })
    },
    crash: () => {
        const c = audio()
        if (!c) return
        noise(c, 0.7, 0.5)
        tone(c, { freq: 140, to: 40, type: 'sawtooth', dur: 0.5, gain: 0.08 })
    },
}
