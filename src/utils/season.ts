// October: halloween, December: christmas, January 1-15: newyear.
// `?theme=` overrides the date (`none` disables it); without it, the date's season is written to the URL.
// Called "season" in code because "theme" already means day/night.

export const SEASONS = ['halloween', 'christmas', 'newyear'] as const
export type Season = typeof SEASONS[number]

const PARAM = 'theme'

/** Fish colors and jellyfish "r, g, b" per season. */
export const SEASON_LIFE: Record<Season, { reef: string[]; jelly: string }> = {
    halloween: { reef: ['#ff8a2a', '#9b5cff', '#7dff6a', '#ffb648'], jelly: '235, 240, 255' },
    christmas: { reef: ['#ff4d5a', '#3fd17a', '#ffd34d', '#ffffff'], jelly: '255, 214, 120' },
    newyear: { reef: ['#ffd27a', '#e8e8f0', '#ff7a90', '#c9a7ff'], jelly: '255, 210, 122' },
}

export const seasonForDate = (date: Date): Season | null => {
    const month = date.getMonth()
    if (month === 9) return 'halloween'
    if (month === 11) return 'christmas'
    if (month === 0 && date.getDate() <= 15) return 'newyear'
    return null
}

let current: Season | null = null

/** Resolves the season, syncs `?theme=` in the URL and sets <html data-season>. Call once at startup. */
export const initSeason = (now = new Date()): Season | null => {
    const url = new URL(window.location.href)
    const param = url.searchParams.get(PARAM)

    if (param === 'none') {
        current = null
    } else if (SEASONS.includes(param as Season)) {
        current = param as Season
    } else {
        current = seasonForDate(now)
        if (current) url.searchParams.set(PARAM, current)
        else url.searchParams.delete(PARAM)
        if (url.href !== window.location.href) window.history.replaceState(window.history.state, '', url)
    }

    if (current) document.documentElement.dataset.season = current
    else delete document.documentElement.dataset.season
    return current
}

export const getSeason = () => current
