import { LanguageContextProvider } from "./context/languageContext"
import { NavbarContextProvider } from "./context/navbarContext"
import { ThemeContextProvider } from "./context/themeContext"
import Router from "./Router"

function App() {

  return (
    <ThemeContextProvider>
      <LanguageContextProvider>
        <NavbarContextProvider>
          <Router />
        </NavbarContextProvider>
      </LanguageContextProvider>
    </ThemeContextProvider>
  )
}

export default App
