import { ReactNode, useLayoutEffect, useState } from "react";
import { isDarkModeOn } from "../utils/localStorage";
import { themeContext } from "./themeContext";

// Colors are CSS variables in src/index.css keyed off <html data-theme>, as is Tailwind's `dark:`.
const ThemeContextProvider = ({ children }: { children: ReactNode }) => {

    const [darkMode, setDarkMode] = useState(isDarkModeOn);

    useLayoutEffect(() => {
        document.documentElement.dataset.theme = darkMode ? 'dark' : 'light'
    }, [darkMode])

    return (
        <themeContext.Provider value={{ darkMode, setDarkMode }}>
            {children}
        </themeContext.Provider>
    )
}

export { ThemeContextProvider }
