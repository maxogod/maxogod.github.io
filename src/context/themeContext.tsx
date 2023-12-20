import React, { ReactNode, createContext, useEffect, useState } from "react";
import { isDarkModeOn } from "../utils/localStorage";
import { darkBG1, darkBG2, darkBG3, darkBG4, darkStar, lightBG1, lightBG2, lightBG3, lightBG4, lightStar } from "../utils/themeUtils";

interface themeContextType {
    darkMode: boolean,
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>,
    backgroundP1: string,
    backgroundP2: string,
    backgroundP3: string,
    backgroundP4: string,
    star: string,
}

const themeContext = createContext<themeContextType>({
    darkMode: false,
    setDarkMode: () => { },
    backgroundP1: '',
    backgroundP2: '',
    backgroundP3: '',
    backgroundP4: '',
    star: '',
})

const ThemeContextProvider = ({ children }: { children: ReactNode }) => {

    const [darkMode, setDarkMode] = useState(isDarkModeOn());

    const [backgroundP1, setBackgroundP1] = useState(darkMode ? darkBG1 : lightBG1)
    const [backgroundP2, setBackgroundP2] = useState(darkMode ? darkBG2 : lightBG2)
    const [backgroundP3, setBackgroundP3] = useState(darkMode ? darkBG3 : lightBG3)
    const [backgroundP4, setBackgroundP4] = useState(darkMode ? darkBG4 : lightBG4)
    const [star, setStar] = useState(darkMode ? darkStar : lightStar)

    useEffect(() => {
        setBackgroundP1(darkMode ? darkBG1 : lightBG1)
        setBackgroundP2(darkMode ? darkBG2 : lightBG2)
        setBackgroundP3(darkMode ? darkBG3 : lightBG3)
        setBackgroundP4(darkMode ? darkBG4 : lightBG4)
        setStar(darkMode ? darkStar : lightStar)
    }, [darkMode])

    return (
        <themeContext.Provider
            value={
                {
                    darkMode,
                    setDarkMode,
                    backgroundP1,
                    backgroundP2,
                    backgroundP3,
                    backgroundP4,
                    star,
                }
            }>
            {children}
        </themeContext.Provider>
    )
}

export {
    themeContext,
    ThemeContextProvider,
}