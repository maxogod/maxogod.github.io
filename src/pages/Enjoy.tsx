import { useContext } from "react"
import { themeContext } from "../context/themeContext"
import EnjoyImages from "../components/EnjoyImages"

const Enjoy = () => {

    const { backgroundP3 } = useContext(themeContext)

    return (
        <div
            id='enjoy'
            className={`${backgroundP3} w-screen h-screen relative`}>

            <EnjoyImages />
        </div>
    )
}

export default Enjoy