import { GameContextProvider } from "./context/GameContextProvider"
import { LanguageContextProvider } from "./context/LanguageContextProvider"
import { ThemeContextProvider } from "./context/ThemeContextProvider"
import Router from "./Router"

function App() {

  return (
    <ThemeContextProvider>
      <LanguageContextProvider>
        <GameContextProvider>
          <Router />
        </GameContextProvider>
      </LanguageContextProvider>
    </ThemeContextProvider>
  )
}

export default App
