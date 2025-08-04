
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

export {
    isDarkModeOn,
    setCurrentTheme,
    isEnglishModeOn,
    setCurrentLanguage,
}