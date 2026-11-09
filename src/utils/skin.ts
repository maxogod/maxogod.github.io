// Visual skins (drafts): `ocean` (default), `neon` (cyberpunk), `brass` (steampunk / art deco).
// Preview with `?skin=neon` or `?skin=brass` before the hash, e.g. http://localhost:3000/?skin=neon#/
// The skin sets <html data-skin>; colors and fonts are CSS variables overridden in src/index.css.

export const SKINS = ['ocean', 'neon', 'brass'] as const
export type Skin = typeof SKINS[number]

const FONTS: Record<Skin, string | null> = {
    ocean: null,
    neon: 'family=Chakra+Petch:wght@400;500;600;700&family=Share+Tech+Mono',
    brass: 'family=Limelight&family=Spectral:wght@400;500;600&family=Special+Elite',
}

export const getSkin = (): Skin => {
    const param = new URLSearchParams(window.location.search).get('skin')
    return SKINS.includes(param as Skin) ? param as Skin : 'ocean'
}

export const applySkin = () => {
    const skin = getSkin()
    document.documentElement.dataset.skin = skin
    const fonts = FONTS[skin]
    if (!fonts) return
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = `https://fonts.googleapis.com/css2?${fonts}&display=swap`
    document.head.appendChild(link)
}

/** Reads a CSS custom property from <html>, for canvas drawing. */
export const cssVar = (name: string, fallback: string) =>
    getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback
