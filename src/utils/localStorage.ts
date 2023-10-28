
const isDarkModeOn = () => {
    const darkModeOn = localStorage.getItem('darkModeOn');
    if (!darkModeOn) {
        localStorage.setItem('darkModeOn', 'false');
        return false;
    }
    return darkModeOn === 'true' ? true : false;
}

const setCurrentTheme = (darkModeOn: Boolean) => {
    localStorage.setItem('darkModeOn', darkModeOn ? 'true' : 'false');
}

export {
    isDarkModeOn,
    setCurrentTheme
}