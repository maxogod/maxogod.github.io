import { memo, useContext, useEffect, useMemo, useRef } from "react"
import Tooltip from "@mui/material/Tooltip"
import { LuRadar } from "react-icons/lu"
import { languageContext } from "../context/languageContext"
import { gameContext } from "../context/gameContext"
import { getDepthSnapshot, pressureAt, scrollToSection, SECTION_DEPTHS, subscribeDepth, temperatureAt } from "../utils/depth"
import { useDepthValue } from "../hooks/useDepth"
import Submarine from "./Submarine"

// Split so scrolling only re-renders the small readout; the rail's sub marker is moved outside React.

/** Section rail with the sub marker (md+). */
const GaugeRail = memo(() => {
    const { text } = useContext(languageContext)
    const section = useDepthValue(s => s.section)
    const marks = useDepthValue(s => s.marks)
    const markerRef = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        const move = () => markerRef.current?.style.setProperty('--progress', String(getDepthSnapshot().progress))
        move()
        return subscribeDepth(move)
    }, [])

    return (
        <nav aria-label={text.hud.gauge} className="fixed top-1/2 right-3 z-30 hidden h-[44vh] w-8 -translate-y-[60%] md:block">
            <span aria-hidden className="absolute top-0 bottom-0 left-1/2 w-px bg-linear-to-b from-foam/55 via-foam/25 to-foam/10" />
            {SECTION_DEPTHS.map((s, i) => {
                const active = s.id === section
                return (
                    <Tooltip key={s.id} title={text.sections[s.id]} placement="left" arrow>
                        <button
                            type="button"
                            onClick={() => scrollToSection(s.id)}
                            aria-label={text.sections[s.id]}
                            aria-current={active ? 'location' : undefined}
                            className="absolute left-1/2 grid size-6 -translate-1/2 place-items-center"
                            style={{ top: `${(marks[i] ?? i / 4) * 100}%` }}>
                            <span aria-hidden className={`rounded-full border-2 transition-all duration-300 ${active ? 'size-3 border-signal bg-signal shadow-[0_0_10px_var(--color-signal)]' : 'size-2.5 border-foam/60 bg-midnight hover:border-foam'}`} />
                        </button>
                    </Tooltip>
                )
            })}
            {/* transform instead of top: no layout while scrolling */}
            <span
                ref={markerRef}
                aria-hidden
                className="pointer-events-none absolute top-0 right-[calc(50%+10px)] transition-transform duration-150 ease-out [transform:translateY(calc(var(--progress,0)*44vh-50%))]">
                <Submarine className="w-8 drop-shadow-[0_0_8px_rgb(255_182_72/0.45)]" />
            </span>
        </nav>
    )
})

/** Depth, zone, pressure and temperature. */
const GaugeReadout = () => {
    const { text, englishMode } = useContext(languageContext)
    const depth = useDepthValue(s => s.depth)
    const zone = useDepthValue(s => s.zone)

    const formats = useMemo(() => {
        const locale = englishMode ? 'en' : 'es-AR'
        return {
            meters: new Intl.NumberFormat(locale),
            pressure: new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }),
            temperature: new Intl.NumberFormat(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 }),
        }
    }, [englishMode])

    return (
        <div className="flex min-w-[7.5rem] flex-col leading-tight">
            <span className="font-gauge text-base font-semibold text-signal tabular-nums sm:text-lg">{formats.meters.format(depth)} m</span>
            <span className="text-xs text-foam/80">{text.zones[zone]}</span>
            <span className="mt-0.5 hidden gap-3 font-gauge text-[0.62rem] text-foam/50 tabular-nums sm:flex">
                <span>{formats.pressure.format(pressureAt(depth))} {text.hud.pressure}</span>
                <span>{formats.temperature.format(temperatureAt(depth))} °C</span>
            </span>
        </div>
    )
}

const SonarButton = memo(() => {
    const { text } = useContext(languageContext)
    const { sonarPing } = useContext(gameContext)
    return (
        <Tooltip title={`${text.hud.sonar} (${text.hud.sonarKey})`} placement="top" arrow>
            <button type="button" onClick={sonarPing} aria-label={text.hud.sonar} aria-keyshortcuts={text.hud.sonarKey}
                className="group grid size-11 place-items-center rounded-2xl bg-glow/12 text-xl text-glow ring-1 ring-glow/40 transition-[background-color,box-shadow] hover:bg-glow/25 hover:shadow-[0_0_24px_-4px_var(--color-glow)] sm:size-12">
                <LuRadar aria-hidden className="transition-transform duration-700 group-hover:rotate-180" />
            </button>
        </Tooltip>
    )
})

/** Right-edge instrument cluster: section rail, depth readout and sonar button. */
const DepthGauge = () => (
    <>
        <GaugeRail />
        <div className="glass fixed right-3 bottom-3 z-30 flex items-center gap-3 rounded-[20px] py-2 pr-2 pl-4 ring-1 ring-white/10 sm:right-4 sm:bottom-4">
            <GaugeReadout />
            <SonarButton />
        </div>
    </>
)

export default DepthGauge
