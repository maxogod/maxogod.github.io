import { useContext } from "react"
import { languageContext } from "../context/languageContext"
import type { ZoneId } from "../utils/languageUtils"

/** Section title with the depth reading where that section starts. */
const SectionHeading = ({ id, depth, zone, title }: { id: string, depth: number, zone: ZoneId, title: string }) => {

    const { text, englishMode } = useContext(languageContext)
    const meters = new Intl.NumberFormat(englishMode ? 'en' : 'es-AR').format(depth)

    return (
        <header className="flex flex-col gap-3">
            <p className="skin-depth flex items-center gap-3 font-gauge text-xs text-glow/85">
                <span>{meters} m</span>
                <span aria-hidden className="h-px w-10 bg-glow/40" />
                <span>{text.zones[zone]}</span>
            </p>
            <h2 id={id} className="skin-heading text-5xl leading-[0.95] font-bold tracking-[-0.03em] [font-stretch:92%] sm:text-7xl">
                {title}
            </h2>
        </header>
    )
}

export default SectionHeading
