import { useContext } from "react"
import { themeContext } from "../context/themeContext"

const Contact = () => {

    const { backgroundP3 } = useContext(themeContext)

    return (
        <div
            id='contact'
            className={`${backgroundP3} w-screen h-screen`}>
        </div>
    )
}

export default Contact