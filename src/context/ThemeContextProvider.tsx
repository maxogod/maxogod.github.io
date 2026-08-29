import { ReactNode, useState } from "react";
import { isDarkModeOn } from "../utils/localStorage";
import { themeContext } from "./themeContext";
import { darkAccent, darkBG1, darkBG2, darkBG3, darkBG4, darkBorders, darkBubble, darkButton, darkNavbarTray, darkPopUp, darkStar, darkText, darkWaves, lightAccent, lightBG1, lightBG2, lightBG3, lightBG4, lightBorders, lightBubble, lightButton, lightNavbarTray, lightPopUp, lightStar, lightText, lightWaves } from "../utils/themeUtils";

const ThemeContextProvider = ({ children }: { children: ReactNode }) => {

    const [darkMode, setDarkMode] = useState(isDarkModeOn());

    // Every one of these is a pure function of darkMode, so it is derived during
    // render instead of being mirrored into state and re-synced from an effect.
    const backgroundP1 = darkMode ? darkBG1 : lightBG1
    const backgroundP2 = darkMode ? darkBG2 : lightBG2
    const backgroundP3 = darkMode ? darkBG3 : lightBG3
    const backgroundP4 = darkMode ? darkBG4 : lightBG4
    const star = darkMode ? darkStar : lightStar
    const waves = darkMode ? darkWaves : lightWaves
    const accentColor = darkMode ? darkAccent : lightAccent
    const popUpColor = darkMode ? darkPopUp : lightPopUp
    const textColor = darkMode ? darkText : lightText
    const buttonColor = darkMode ? darkButton : lightButton
    const navbarTrayColor = darkMode ? darkNavbarTray : lightNavbarTray
    const borderColor = darkMode ? darkBorders : lightBorders
    const bubbleColor = darkMode ? darkBubble : lightBubble

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

export { ThemeContextProvider }
