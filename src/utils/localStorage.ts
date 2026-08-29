
const isDarkModeOn = () => {
    const darkModeOn = localStorage.getItem('darkModeOn');
    if (!darkModeOn) {
        localStorage.setItem('darkModeOn', 'false');
        return false;
    }
    return darkModeOn === 'true' ? true : false;
}

const setCurrentTheme = (darkModeOn: boolean) => {
    localStorage.setItem('darkModeOn', darkModeOn ? 'true' : 'false');
}

const isEnglishModeOn = () => {
    const englishModeOn = localStorage.getItem('englishModeOn')
    if (!englishModeOn) {
        let userLanguage = navigator.language || navigator.language;
        userLanguage = userLanguage.split('-')[0]
        if (userLanguage === 'es') {
            localStorage.setItem('englishModeOn', 'false');
            return false;
        } else {
            localStorage.setItem('englishModeOn', 'true');
            return true;
        }

    }
    return englishModeOn === 'true' ? true : false
}

const setCurrentLanguage = (englishModeOn: boolean) => {
    localStorage.setItem('englishModeOn', englishModeOn ? 'true' : 'false')
}

// The navbar tray auto-opens once, to point out where the menu is. Persisted so
// it does not reappear on later visits or when returning from a project view.
const hasSeenNavbarHint = () => {
    return localStorage.getItem('navbarHintSeen') === 'true'
}

const setNavbarHintSeen = () => {
    localStorage.setItem('navbarHintSeen', 'true')
}

export {
    isDarkModeOn,
    setCurrentTheme,
    isEnglishModeOn,
    setCurrentLanguage,
    hasSeenNavbarHint,
    setNavbarHintSeen,
}