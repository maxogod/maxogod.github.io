import { useContext, useEffect, useRef, useState } from "react"
import { LuLock, LuX } from "react-icons/lu"
import { gameContext } from "../context/gameContext"
import { languageContext } from "../context/languageContext"
import { ACHIEVEMENTS, TREASURES } from "../utils/game"

/** Side drawer with achievements, treasures and stats. */
const Logbook = () => {

    const { text } = useContext(languageContext)
    const { progress, logbookOpen, setLogbookOpen, resetProgress } = useContext(gameContext)
    const dialogRef = useRef<HTMLDialogElement>(null)
    const [confirming, setConfirming] = useState(false)

    useEffect(() => {
        const dialog = dialogRef.current
        if (!dialog) return
        if (logbookOpen && !dialog.open) dialog.showModal()
        if (!logbookOpen && dialog.open) dialog.close()
    }, [logbookOpen])

    const close = () => {
        setConfirming(false)
        setLogbookOpen(false)
    }

    const reset = () => {
        if (!confirming) {
            setConfirming(true)
            return
        }
        resetProgress()
        setConfirming(false)
    }

    const stats = [
        { label: text.logbook.bubbles, value: progress.bubbles },
        { label: text.logbook.projects, value: progress.opened.length },
        { label: text.logbook.best, value: progress.best },
    ]

    return (
        <dialog
            ref={dialogRef}
            aria-labelledby="logbook-title"
            onCancel={event => { event.preventDefault(); close() }}
            onClick={event => { if (event.target === dialogRef.current) close() }}
            className="project-dialog logbook-dialog m-0 ml-auto h-dvh max-h-none w-full max-w-md overflow-y-auto bg-midnight p-0 text-foam ring-1 ring-glow/15">
            <div className="flex flex-col gap-8 p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-2">
                        <h2 id="logbook-title" className="text-4xl font-bold tracking-tight">{text.logbook.title}</h2>
                        <p className="text-sm text-foam/65">{text.logbook.intro}</p>
                    </div>
                    <button type="button" autoFocus onClick={close} aria-label={text.logbook.close}
                        className="grid size-10 shrink-0 place-items-center rounded-full text-xl ring-1 ring-white/15 hover:bg-white/10">
                        <LuX aria-hidden />
                    </button>
                </div>

                <dl className="grid grid-cols-3 gap-2">
                    {stats.map(stat => (
                        <div key={stat.label} className="flex flex-col-reverse gap-1 rounded-2xl bg-white/[0.05] p-3 ring-1 ring-white/8">
                            <dt className="text-xs leading-tight text-foam/60">{stat.label}</dt>
                            <dd className="font-gauge text-xl text-signal">{stat.value}</dd>
                        </div>
                    ))}
                </dl>

                <section className="flex flex-col gap-3">
                    <h3 className="flex items-baseline justify-between font-semibold">
                        {text.logbook.treasures}
                        <span className="font-gauge text-xs text-foam/55">{progress.treasures.length}/{TREASURES.length}</span>
                    </h3>
                    <ul className="grid grid-cols-6 gap-2">
                        {TREASURES.map(({ id, icon: Icon }) => {
                            const found = progress.treasures.includes(id)
                            return (
                                <li key={id} title={found ? text.treasures[id] : '?'}
                                    className={`grid aspect-square place-items-center rounded-xl text-2xl ring-1 ${found ? 'bg-signal/12 text-signal ring-signal/40' : 'bg-white/[0.03] text-foam/15 ring-white/8'}`}>
                                    <Icon aria-hidden />
                                    <span className="sr-only">{found ? text.treasures[id] : text.logbook.treasures}</span>
                                </li>
                            )
                        })}
                    </ul>
                </section>

                <section className="flex flex-col gap-3">
                    <h3 className="flex items-baseline justify-between font-semibold">
                        {text.logbook.achievements}
                        <span className="font-gauge text-xs text-foam/55">{progress.achievements.length}/{ACHIEVEMENTS.length}</span>
                    </h3>
                    <ul className="flex flex-col gap-1.5">
                        {ACHIEVEMENTS.map(({ id, icon: Icon }) => {
                            const unlocked = progress.achievements.includes(id)
                            return (
                                <li key={id} className={`flex items-center gap-3 rounded-2xl p-2.5 ${unlocked ? 'bg-glow/[0.07]' : ''}`}>
                                    <span className={`grid size-10 shrink-0 place-items-center rounded-full text-xl ${unlocked ? 'bg-glow/15 text-glow' : 'bg-white/[0.04] text-foam/25'}`}>
                                        {unlocked ? <Icon aria-hidden /> : <LuLock aria-hidden className="text-base" />}
                                    </span>
                                    <span className="flex flex-col leading-tight">
                                        <span className={`font-semibold ${unlocked ? '' : 'text-foam/55'}`}>{text.achievements[id].title}</span>
                                        <span className="text-sm text-foam/55">{text.achievements[id].text}</span>
                                    </span>
                                </li>
                            )
                        })}
                    </ul>
                </section>

                <p className="text-sm text-foam/60">{text.logbook.tips}</p>

                <button type="button" onClick={reset} onBlur={() => setConfirming(false)}
                    className={`self-start rounded-full px-4 py-2 text-sm ring-1 transition-colors ${confirming ? 'bg-coral text-ink ring-coral' : 'text-foam/70 ring-white/15 hover:bg-white/8'}`}>
                    {confirming ? text.logbook.resetConfirm : text.logbook.reset}
                </button>
            </div>
        </dialog>
    )
}

export default Logbook
