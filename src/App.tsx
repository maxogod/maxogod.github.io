import Contact from "./pages/Contact"
import Enjoy from "./pages/Enjoy"
import Home from "./pages/Home"
import Projects from "./pages/Projects"
import { LanguageContextProvider } from "./context/languageContext"
import Navbar from "./shared/Navbar"
import { NavbarContextProvider } from "./context/navbarContext"
import { ThemeContextProvider } from "./context/themeContext"

function App() {

  return (
    <ThemeContextProvider>
      <LanguageContextProvider>
        <NavbarContextProvider>
          <Navbar />
          <div className="flex flex-wrap">
            <Home />
            <Projects />
            <Enjoy />
            <Contact />
          </div>
        </NavbarContextProvider>
      </LanguageContextProvider>
    </ThemeContextProvider>
  )
}

export default App
