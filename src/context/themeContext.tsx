import React, { ReactNode, createContext, useEffect, useState } from "react";
import { isDarkModeOn } from "../utils/localStorage";
import { darkAccent, darkBG1, darkBG2, darkBG3, darkBG4, darkBorders, darkBubble, darkButton, darkNavbarTray, darkPopUp, darkStar, darkText, darkWaves, lightAccent, lightBG1, lightBG2, lightBG3, lightBG4, lightBorders, lightBubble, lightButton, lightNavbarTray, lightPopUp, lightStar, lightText, lightWaves } from "../utils/themeUtils";

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

const ThemeContextProvider = ({ children }: { children: ReactNode }) => {

    const [darkMode, setDarkMode] = useState(isDarkModeOn());

    const [backgroundP1, setBackgroundP1] = useState(darkMode ? darkBG1 : lightBG1)
    const [backgroundP2, setBackgroundP2] = useState(darkMode ? darkBG2 : lightBG2)
    const [backgroundP3, setBackgroundP3] = useState(darkMode ? darkBG3 : lightBG3)
    const [backgroundP4, setBackgroundP4] = useState(darkMode ? darkBG4 : lightBG4)
    const [star, setStar] = useState(darkMode ? darkStar : lightStar)
    const [waves, setWaves] = useState(darkMode ? darkWaves : lightWaves)
    const [accentColor, setAccentColor] = useState(darkMode ? darkAccent : lightAccent)
    const [popUpColor, setPopUpColor] = useState(darkMode ? darkPopUp : lightPopUp)
    const [textColor, setTextColor] = useState(darkMode ? darkText : lightText)
    const [buttonColor, setButtonColor] = useState(darkMode ? darkButton : lightButton)
    const [navbarTrayColor, setNavbarTrayColor] = useState(darkMode ? darkNavbarTray : lightNavbarTray)
    const [borderColor, setBorderColor] = useState(darkMode ? darkBorders : lightBorders)
    const [bubbleColor, setBubbleColor] = useState(darkMode ? darkBubble : lightBubble)

    useEffect(() => {
        setBackgroundP1(darkMode ? darkBG1 : lightBG1)
        setBackgroundP2(darkMode ? darkBG2 : lightBG2)
        setBackgroundP3(darkMode ? darkBG3 : lightBG3)
        setBackgroundP4(darkMode ? darkBG4 : lightBG4)
        setStar(darkMode ? darkStar : lightStar)
        setWaves(darkMode ? darkWaves : lightWaves)
        setAccentColor(darkMode ? darkAccent : lightAccent)
        setPopUpColor(darkMode ? darkPopUp : lightPopUp)
        setTextColor(darkMode ? darkText : lightText)
        setButtonColor(darkMode ? darkButton : lightButton)
        setNavbarTrayColor(darkMode ? darkNavbarTray : lightNavbarTray)
        setBorderColor(darkMode ? darkBorders : lightBorders)
        setBubbleColor(darkMode ? darkBubble : lightBubble)
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
                    waves,
                    accentColor,
                    popUpColor,
                    textColor,
                    buttonColor,
                    navbarTrayColor,
                    borderColor,
                    bubbleColor,
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