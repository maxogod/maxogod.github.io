import React, { ReactNode, createContext, useState } from "react";

interface navbarContextType {
    showLogo: boolean,
    setShowLogo: React.Dispatch<React.SetStateAction<boolean>>,
    showBackButton: boolean,
    setShowBackButton: React.Dispatch<React.SetStateAction<boolean>>,
}

const navbarContext = createContext<navbarContextType>({
    showLogo: false,
    setShowLogo: () => { },
    showBackButton: false,
    setShowBackButton: () => { },
})

const NavbarContextProvider = ({ children }: { children: ReactNode }) => {
    const [showLogo, setShowLogo] = useState(false);
    const [showBackButton, setShowBackButton] = useState(false)

    return (
        <navbarContext.Provider
            value={
                {
                    showLogo,
                    setShowLogo,
                    showBackButton,
                    setShowBackButton,
                }
            }>
            {children}
        </navbarContext.Provider>
    )
}

export {
    navbarContext,
    NavbarContextProvider,
}