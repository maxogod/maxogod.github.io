import React, { ReactNode, createContext, useState } from "react";

interface navbarContextType {
    showLogo: boolean,
    setShowLogo: React.Dispatch<React.SetStateAction<boolean>>,
}

const navbarContext = createContext<navbarContextType>({
    showLogo: false,
    setShowLogo: () => { },
})

const NavbarContextProvider = ({ children }: { children: ReactNode }) => {
    const [showLogo, setShowLogo] = useState(false);

    return (
        <navbarContext.Provider
            value={
                {
                    showLogo,
                    setShowLogo,
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