import { ReactNode, useContext, useState } from "react"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { LuCheck, LuCopy, LuExternalLink, LuFileText, LuMail } from "react-icons/lu"
import { toast } from "react-toastify"
import { languageContext } from "../context/languageContext"
import { gameContext } from "../context/gameContext"
import SectionHeading from "../components/SectionHeading"
import Treasure from "../components/Treasure"

const EMAIL = "maximo.d.utrera@gmail.com"

const rowClasses = 'group flex w-full items-center gap-4 rounded-[20px] bg-white/[0.04] p-4 text-left ring-1 ring-white/10 transition-[background-color,box-shadow] duration-300 hover:bg-glow/[0.07] hover:shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-glow)_60%,transparent),0_0_40px_-12px_var(--color-glow)] sm:p-5'

const Row = ({ icon, label, detail, trailing }: { icon: ReactNode, label: string, detail: string, trailing: ReactNode }) => (
    <>
        <span className="grid size-12 shrink-0 place-items-center rounded-full bg-glow/10 text-2xl text-glow shadow-[0_0_24px_-6px_var(--color-glow)]">{icon}</span>
        <span className="flex min-w-0 flex-1 flex-col">
            <span className="text-lg font-semibold">{label}</span>
            <span className="truncate text-sm text-foam/60">{detail}</span>
        </span>
        <span aria-hidden className="text-lg text-foam/50 transition-colors group-hover:text-glow">{trailing}</span>
    </>
)

/** A glowing jellyfish drifting next to the links. */
const Jellyfish = ({ className }: { className: string }) => (
    <svg viewBox="0 0 120 200" aria-hidden className={className}>
        <defs>
            <radialGradient id="jelly-bell" cx="50%" cy="35%" r="60%">
                <stop offset="0%" stopColor="#c9fff6" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#6ff3e0" stopOpacity="0.08" />
            </radialGradient>
        </defs>
        {[22, 42, 60, 78, 98].map((x, i) => (
            <path key={x} d={`M${x} 62 q ${i % 2 ? 10 : -10} 30 0 60 t 0 60`} fill="none" stroke="#6ff3e0" strokeOpacity="0.35" strokeWidth="2" strokeLinecap="round" />
        ))}
        <path d="M8 62 C8 18 112 18 112 62 q -8 8 -17 0 q -9 8 -18 0 q -9 8 -17 0 q -9 8 -18 0 q -9 8 -17 0 q -9 8 -17 0Z"
            fill="url(#jelly-bell)" stroke="#6ff3e0" strokeOpacity="0.7" strokeWidth="1.5" />
    </svg>
)

const Contact = () => {

    const { text } = useContext(languageContext)
    const { unlock } = useContext(gameContext)
    const [copied, setCopied] = useState(false)

    const copyEmail = () => {
        navigator.clipboard.writeText(EMAIL).then(() => {
            setCopied(true)
            setTimeout(() => setCopied(false), 2200)
            toast.success(text.contact.emailCopied, { toastId: 'email-copied' })
            unlock('signal')
        }).catch(() => {
            window.location.href = `mailto:${EMAIL}`
        })
    }

    const links = [
        { label: text.contact.github, detail: 'github.com/maxogod', href: 'https://github.com/maxogod', icon: <FaGithub /> },
        { label: text.contact.linkedin, detail: 'linkedin.com/in/maximo-utrera', href: 'https://www.linkedin.com/in/maximo-utrera/', icon: <FaLinkedin /> },
        { label: text.contact.cv, detail: 'Google Drive', href: text.cvLink, icon: <LuFileText /> },
    ]

    return (
        <section id="contact" aria-labelledby="contact-title" className="water-contact relative flex min-h-[100svh] items-center overflow-hidden px-5 py-28 sm:px-10 sm:py-36 lg:px-16">
            <Jellyfish className="pointer-events-none absolute right-[6%] bottom-[6%] w-24 animate-bob opacity-70 [animation-duration:7s] sm:w-32 lg:right-auto lg:bottom-[12%] lg:left-[24%] lg:w-40" />
            <Jellyfish className="pointer-events-none absolute top-[10%] right-[10%] hidden w-16 animate-bob opacity-45 [animation-delay:-3s] [animation-duration:9s] sm:block" />

            <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-2 lg:gap-20">
                <div className="flex flex-col gap-6">
                    <SectionHeading id="contact-title" depth={1000} zone="midnight" title={text.contact.title} />
                    <p className="max-w-[44ch] text-lg leading-relaxed text-foam/80">{text.contact.text}</p>
                </div>

                <ul className="flex flex-col gap-3 self-end">
                    <li>
                        <button type="button" onClick={copyEmail} className={rowClasses}>
                            <Row
                                icon={<LuMail />}
                                label={text.contact.copyEmail}
                                detail={EMAIL}
                                trailing={copied ? <LuCheck className="text-glow" /> : <LuCopy />} />
                        </button>
                    </li>
                    {links.map(link => (
                        <li key={link.href}>
                            <a href={link.href} target="_blank" rel="noreferrer" onClick={() => unlock('signal')} className={rowClasses}>
                                <Row icon={link.icon} label={link.label} detail={link.detail} trailing={<LuExternalLink />} />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            <Treasure id="anchor" className="bottom-[6%] left-[6%]" />
        </section>
    )
}

export default Contact
