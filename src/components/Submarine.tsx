/** Side view of the submarine, facing right. */
const Submarine = ({ className = '', title }: { className?: string, title?: string }) => (
    <svg viewBox="0 0 124 66" className={className} role={title ? 'img' : undefined} aria-hidden={title ? undefined : true}>
        {title && <title>{title}</title>}
        <path d="M66 10V3h12" fill="none" stroke="#d98a2b" strokeWidth="3" strokeLinecap="round" />
        <rect x="50" y="9" width="28" height="20" rx="7" fill="#f4a43a" />
        <path d="M17 26 3 15l4 17Z M17 54 3 64l4-17Z" fill="#e8952a" />
        <ellipse cx="4" cy="40" rx="2.5" ry="9" fill="#d98a2b" />
        <rect x="9" y="24" width="106" height="33" rx="16.5" fill="#ffb648" />
        <path d="M25 50h80a10 10 0 0 1-8 7H25a16 16 0 0 1-8-7Z" fill="#e8952a" />
        <path d="M30 29h62" stroke="#ffd38c" strokeWidth="3" strokeLinecap="round" />
        {[40, 62, 84].map(cx => (
            <g key={cx}>
                <circle cx={cx} cy="40" r="6.5" fill="#0a3a63" stroke="#d98a2b" strokeWidth="2" />
                <circle cx={cx} cy="40" r="3.4" fill="#6ff3e0" />
            </g>
        ))}
        <circle cx="112" cy="40" r="2.5" fill="#fff3c4" />
    </svg>
)

export default Submarine
