const lines = (html: string) => html.split(/<br\s*\/?>/i).map(line => line.trim())

/** Turns `<br>` line breaks into paragraphs and `- ` lines into a list. */
export const formatDescription = (html: string): string => {
    let out = ''
    let paragraph: string[] = []
    let list: string[] = []

    const flushParagraph = () => {
        if (paragraph.length) out += `<p>${paragraph.join(' ')}</p>`
        paragraph = []
    }
    const flushList = () => {
        if (list.length) out += `<ul>${list.map(item => `<li>${item}</li>`).join('')}</ul>`
        list = []
    }

    for (const line of lines(html)) {
        if (!line) {
            flushParagraph()
            flushList()
        } else if (line.startsWith('- ')) {
            flushParagraph()
            list.push(line.slice(2))
        } else {
            flushList()
            paragraph.push(line)
        }
    }
    flushParagraph()
    flushList()
    return out
}

/** First paragraph as plain text, for card previews. */
export const excerpt = (html: string): string => {
    const first = html.split(/(?:<br\s*\/?>\s*){2}/i)[0] ?? ''
    return first.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}
