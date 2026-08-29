import React, { createContext } from "react";

interface navbarContextType {
    showLogo: boolean,
    setShowLogo: React.Dispatch<React.SetStateAction<boolean>>,
}

const navbarContext = createContext<navbarContextType>({
    showLogo: false,
    setShowLogo: () => { },
})

export type { navbarContextType }
export { navbarContext }
