import Contact from "./pages/Contact"
import Enjoy from "./pages/Enjoy"
import Home from "./pages/Home"
import Projects from "./pages/Projects"
import { LanguageContextProvider } from "./context/languageContext"
import Navbar from "./shared/Navbar"

function App() {

  return (
    <LanguageContextProvider>
      <Navbar />
      <div className="flex flex-wrap">
        <Home />
        <Projects />
        <Enjoy />
        <Contact />
      </div>
    </LanguageContextProvider>
  )
}

export default App
