import React, { createContext } from "react";

interface themeContextType {
    darkMode: boolean,
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>,
    backgroundP1: string,
    backgroundP2: string,
    backgroundP3: string,
    backgroundP4: string,
    star: string,
    waves: string,
    accentColor: string,
    popUpColor: string,
    textColor: string,
    buttonColor: string,
    navbarTrayColor: string,
    borderColor: string,
    bubbleColor: string,
}

const themeContext = createContext<themeContextType>({
    darkMode: false,
    setDarkMode: () => { },
    backgroundP1: '',
    backgroundP2: '',
    backgroundP3: '',
    backgroundP4: '',
    star: '',
    waves: '',
    accentColor: '',
    popUpColor: '',
    textColor: '',
    buttonColor: '',
    navbarTrayColor: '',
    borderColor: '',
    bubbleColor: '',
})

export type { themeContextType }
export { themeContext }
