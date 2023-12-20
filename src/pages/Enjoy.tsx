import { useContext } from "react"
import { themeContext } from "../context/themeContext"

const Enjoy = () => {

    const { backgroundP3 } = useContext(themeContext)

    return (
        <div
            id='enjoy'
            className={`${backgroundP3} w-screen h-screen`}>

        </div>
    )
}

export default Enjoy