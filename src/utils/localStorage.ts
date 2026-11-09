// Storage access throws when it's blocked (private mode, disabled site data).
const read = (key: string): string | null => {
    try {
        return localStorage.getItem(key)
    } catch {
        return null
    }
}

const write = (key: string, value: string) => {
    try {
        localStorage.setItem(key, value)
    } catch {
        // blocked: skip saving
    }
}

const isDarkModeOn = () => read('darkModeOn') === 'true'

const setCurrentTheme = (darkModeOn: boolean) => write('darkModeOn', darkModeOn ? 'true' : 'false')

const isEnglishModeOn = () => {
    const englishModeOn = read('englishModeOn')
    if (englishModeOn) return englishModeOn === 'true'
    const userLanguage = (navigator.language || 'en').split('-')[0]
    return userLanguage !== 'es'
}

const setCurrentLanguage = (englishModeOn: boolean) => write('englishModeOn', englishModeOn ? 'true' : 'false')

const isSoundOn = () => read('soundOn') !== 'false'

const setSoundOn = (on: boolean) => write('soundOn', on ? 'true' : 'false')

const loadJson = <T,>(key: string): Partial<T> => {
    const raw = read(key)
    if (!raw) return {}
    try {
        const parsed: unknown = JSON.parse(raw)
        return typeof parsed === 'object' && parsed !== null ? parsed as Partial<T> : {}
    } catch {
        return {}
    }
}

const saveJson = (key: string, value: unknown) => write(key, JSON.stringify(value))

export {
    isDarkModeOn,
    setCurrentTheme,
    isEnglishModeOn,
    setCurrentLanguage,
    isSoundOn,
    setSoundOn,
    loadJson,
    saveJson,
}
