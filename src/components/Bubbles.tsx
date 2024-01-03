import { useEffect, useState } from "react"

const Bubbles = () => {



    const [bubbles, setBubbles] = useState<{ size: string, vh: string, vw: string }[]>([])

    useEffect(() => {
        let bubbles = []
        for (let i = 0; i < 20; i++) {
            const randomSize = Math.ceil(Math.random() * 4.5)
            const randomViewportHeight = Math.ceil(Math.random() * 100)
            const randomViewportWidth = Math.ceil(Math.random() * 100)

            bubbles.push({
                size: `${randomSize}rem`,
                vh: `${randomViewportHeight}vh`,
                vw: `${randomViewportWidth}vw`,
            })
        }
        setBubbles(bubbles)
    }, [])


    return (
        <div className="absolute w-full h-full top-0 left-0">

            {bubbles.map((props: any, index: number) => (
                <div
                    key={index}
                    style={{ top: props.vh, left: props.vw }}
                    className="absolute">
                    <div style={{ width: props.size, height: props.size }} className="bg-white bubble rounded-full opacity-10"></div>
                </div>
            ))}

        </div>
    )
}

export default Bubbles