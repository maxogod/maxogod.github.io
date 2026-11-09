import { technologyColors } from "../utils/projects"

/** Technology names with their color dot from data/technology_colors.yaml. */
const TechTags = ({ technologies, max, size = 'sm' }: { technologies: string[], max?: number, size?: 'sm' | 'md' }) => {
    const shown = max ? technologies.slice(0, max) : technologies
    const hidden = technologies.length - shown.length

    return (
        <ul className={`flex flex-wrap ${size === 'md' ? 'gap-2' : 'gap-1.5'}`}>
            {shown.map(technology => (
                <li
                    key={technology}
                    className={`inline-flex items-center gap-1.5 rounded-full bg-white/6 ring-1 ring-white/10 ${size === 'md' ? 'px-3 py-1 text-sm' : 'px-2.5 py-0.5 text-xs'} text-foam/85`}>
                    <span aria-hidden className={`size-2 rounded-full ${technologyColors[technology] ?? 'bg-foam/40'}`} />
                    {technology}
                </li>
            ))}
            {hidden > 0 && (
                <li className="inline-flex items-center rounded-full px-2 py-0.5 text-xs text-foam/55">+{hidden}</li>
            )}
        </ul>
    )
}

export default TechTags
