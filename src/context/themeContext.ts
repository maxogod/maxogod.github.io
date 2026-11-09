import React, { createContext } from "react";

interface themeContextType {
    darkMode: boolean,
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>,
}

const themeContext = createContext<themeContextType>({
    darkMode: false,
    setDarkMode: () => { },
})

export type { themeContextType }
export { themeContext }
