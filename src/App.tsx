import { LanguageContextProvider } from "./context/LanguageContextProvider"
import { NavbarContextProvider } from "./context/NavbarContextProvider"
import { ThemeContextProvider } from "./context/ThemeContextProvider"
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
