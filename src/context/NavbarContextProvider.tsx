import { ReactNode, useState } from "react";
import { navbarContext } from "./navbarContext";

const NavbarContextProvider = ({ children }: { children: ReactNode }) => {
    // Whether the hero image has scrolled out of view. Being on a sub-route also
    // forces the logo on, but that is derived from the router inside Navbar.
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
