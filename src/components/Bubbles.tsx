import { useState } from "react"

interface Bubble {
    size: string
    vh: string
    vw: string
}

const createBubbles = (): Bubble[] => {
    const bubbles: Bubble[] = []
    for (let i = 0; i < 25; i++) {
        const randomSize = Math.ceil(Math.random() * 4.5)
        const randomViewportHeight = Math.ceil(Math.random() * 200)
        const randomViewportWidth = Math.ceil(Math.random() * 200)

        bubbles.push({
            size: `${randomSize}rem`,
            vh: `${randomViewportHeight}vh`,
            vw: `${randomViewportWidth}vw`,
        })
    }
    return bubbles
}

const Bubbles = () => {
    // Generated once on mount via a lazy initialiser, so there is no
    // render -> effect -> setState -> re-render cascade.
    const [bubbles] = useState<Bubble[]>(createBubbles)

    return (
        <div className="absolute w-full h-[200vh] top-0 left-0 z-10 overflow-hidden pointer-events-none">
            {bubbles.map((props: Bubble, index: number) => (
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
