// Colors come from --sub-* CSS variables (see src/index.css) so each skin can repaint the sub.
const v = (name: string) => ({ fill: `var(--sub-${name})` })
const edge = { stroke: 'var(--sub-edge)', strokeWidth: 2 }

/** Side view of the submarine (faces right). Shared by the hero, the depth gauge and the favicon. */
const Submarine = ({ className = '', title }: { className?: string, title?: string }) => (
    <svg viewBox="0 0 124 66" className={className} role={title ? 'img' : undefined} aria-hidden={title ? undefined : true}>
        {title && <title>{title}</title>}
        <path d="M66 10V3h12" fill="none" style={{ stroke: 'var(--sub-dark)' }} strokeWidth="3" strokeLinecap="round" />
        <rect x="50" y="9" width="28" height="20" rx="7" style={{ ...v('tower'), ...edge }} />
        <path d="M17 26 3 15l4 17Z M17 54 3 64l4-17Z" style={{ ...v('fin'), ...edge }} />
        <ellipse cx="4" cy="40" rx="2.5" ry="9" style={v('dark')} />
        <rect x="9" y="24" width="106" height="33" rx="16.5" style={{ ...v('hull'), ...edge }} />
        <path d="M25 50h80a10 10 0 0 1-8 7H25a16 16 0 0 1-8-7Z" style={v('fin')} />
        <path d="M30 29h62" style={{ stroke: 'var(--sub-shine)' }} strokeWidth="3" strokeLinecap="round" />
        {[40, 62, 84].map(cx => (
            <g key={cx}>
                <circle cx={cx} cy="40" r="6.5" style={{ ...v('frame'), stroke: 'var(--sub-dark)', strokeWidth: 2 }} />
                <circle cx={cx} cy="40" r="3.4" style={v('glass')} />
            </g>
        ))}
        <circle cx="112" cy="40" r="2.5" style={v('lamp')} />
    </svg>
)

export default Submarine
