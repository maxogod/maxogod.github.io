import { ReactNode, useState } from "react";
import { navbarContext } from "./navbarContext";

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

export { NavbarContextProvider }
