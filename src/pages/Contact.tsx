import { useContext } from "react"
import { themeContext } from "../context/themeContext"

const Contact = () => {

    const { backgroundP4 } = useContext(themeContext)

    return (
        <div
            id='contact'
            className={`${backgroundP4} w-screen h-screen`}>

        </div>
    )
}

export default Contact