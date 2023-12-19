
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
        localStorage.setItem('englishModeOn', 'true');
        return true;
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