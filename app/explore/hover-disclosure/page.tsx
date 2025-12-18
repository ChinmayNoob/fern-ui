'use client'

import { CodeBlock } from "@/components/ui/code-block"
import { ComponentPreview } from "@/components/ui/component-preview"
import HoverDisclosure from "@/components/hover-disclosure/hover-disclosure"
import { HoverDisclosureTailwind } from "@/components/hover-disclosure"

const usageCode = `import HoverDisclosure from "@/components/hover-disclosure/hover-disclosure"

export function Example() {
  return (
    <HoverDisclosure />
  )
}`

const cssComponentSource = `
'use client'

import { useEffect, useRef, useCallback } from 'react'
import './hover-disclosure.css'
import { GiGuitar, GiMusicSpell, GiSoundWaves, GiScrollUnfurled, GiPaintBrush, GiPuzzle, GiHourglass } from 'react-icons/gi'

interface CourseItem {
    id: string
    title: string
    description: string
    icon: React.ReactNode
    imageUrl: string
}

const courseItems: CourseItem[] = [
    {
        id: 'craft',
        title: 'Kanye West',
        description: 'Kanye West is an American rapper, songwriter, and fashion designer. He is widely considered one of the most influential and innovative artists of his generation.',
        icon: <GiGuitar className="text-white" />,
        imageUrl: '/artists/ye.jpeg'
    },
    {
        id: 'css-animation',
        title: 'Playboi Carti',
        description: 'Playboi Carti is known for his experimental approach to hip-hop music, characterized by his unique vocal style and ethereal production.',
        icon: <GiMusicSpell className="text-white" />,
        imageUrl: '/artists/carti.png'
    },
    {
        id: 'svg-filters',
        title: 'J. Cole',
        description: 'J. Cole is a critically acclaimed rapper known for his introspective lyrics and storytelling ability, often addressing social issues and personal growth.',
        icon: <GiSoundWaves className="text-white" />,
        imageUrl: '/artists/cole.png'
    },
    {
        id: 'scroll-animation',
        title: 'Kendrick Lamar',
        description: 'Kendrick Lamar is a Pulitzer Prize-winning rapper known for his complex lyricism, innovative musical style, and profound social commentary.',
        icon: <GiScrollUnfurled className="text-white" />,
        imageUrl: '/artists/kendrick.png'
    },
    {
        id: 'taming-canvas',
        title: 'A$AP Rocky',
        description: 'A$AP Rocky is known for his experimental approach to hip-hop, fashion influence, and innovative music videos that push creative boundaries.',
        icon: <GiPaintBrush className="text-white" />,
        imageUrl: '/artists/rocky.jpg'
    },
    {
        id: 'layout-tricks',
        title: 'Tyler, The Creator',
        description: 'Tyler, The Creator is a multi-faceted artist known for his production, unique musical style, and creative direction across multiple mediums.',
        icon: <GiPuzzle className="text-white" />,
        imageUrl: '/artists/tyler.jpg'
    },
    {
        id: 'mastering-time',
        title: 'Frank Ocean',
        description: 'Frank Ocean is renowned for his innovative R&B style, poetic lyricism, and artistic integrity in modern music.',
        icon: <GiHourglass className="text-white" />,
        imageUrl: '/artists/frank.jpg'
    }
]

export default function HoverDisclosure() {
    const listRef = useRef<HTMLUListElement>(null)
    const itemsRef = useRef<HTMLLIElement[]>([])
    const currentActiveIndex = useRef<number>(0)
    const isTransitioning = useRef<boolean>(false)

    const setIndex = useCallback((event: Event) => {
        if (isTransitioning.current) return

        const target = event.target as HTMLElement
        const closest = target.closest('li')

        if (closest) {
            const index = itemsRef.current.indexOf(closest)

            if (index === currentActiveIndex.current) return

            isTransitioning.current = true
            currentActiveIndex.current = index

            const cols = new Array(listRef.current!.children.length)
                .fill('')
                .map((_, i) => {
                    itemsRef.current[i].dataset.active = (index === i).toString()
                    return index === i ? '10fr' : '1fr'
                })
                .join(' ')

            listRef.current!.style.setProperty('grid-template-columns', cols)

            setTimeout(() => {
                isTransitioning.current = false
            }, 400)
        }
    }, [])

    const resync = useCallback(() => {
        const w = Math.max(
            ...itemsRef.current.map((i) => i.offsetWidth)
        )
        listRef.current!.style.setProperty('--article-width', w.toString())
    }, [])

    useEffect(() => {
        const list = listRef.current
        const items = itemsRef.current

        if (!list || items.length === 0) return

        if (items.length > 0) {
            items[0].dataset.active = 'true'
            currentActiveIndex.current = 0
            const cols = new Array(items.length)
                .fill('')
                .map((_, i) => i === 0 ? '10fr' : '1fr')
                .join(' ')
            list.style.setProperty('grid-template-columns', cols)
        }

        resync()

        list.addEventListener('pointermove', setIndex, { passive: true })
        list.addEventListener('click', setIndex, { passive: true })
        window.addEventListener('resize', resync, { passive: true })

        return () => {
            list.removeEventListener('pointermove', setIndex)
            list.removeEventListener('click', setIndex)
            window.removeEventListener('resize', resync)
        }
    }, [setIndex, resync])

    return (
        <div className="bg-black text-white py-10">
            <div className="hover-disclosure">
                <ul ref={listRef}>
                    {courseItems.map((item, index) => (
                        <li
                            key={item.id}
                            ref={(el) => {
                                if (el) itemsRef.current[index] = el
                            }}
                            data-active={index === 0 ? 'true' : 'false'}
                        >
                            <article>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                                {item.icon}
                                <a href="#">
                                    <span>Watch now</span>
                                </a>
                                <img src={item.imageUrl} alt="" />
                            </article>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
} `


const cssSource = `
/* Remove normalize import since it should be handled at the app level */
.hover-disclosure {
    width: 100%;
    min-height: clamp(320px, 60vh, 520px);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'SF Pro Text', 'SF Pro Icons', 'AOS Icons', 'Helvetica Neue',
        Helvetica, Arial, sans-serif, system-ui;
    /* Add CSS custom properties scoped to this component */
    --font-size-min: 16;
    --font-size-max: 20;
    --font-ratio-min: 1.2;
    --font-ratio-max: 1.33;
    --font-width-min: 375;
    --font-width-max: 1500;
    --gap: 8px;
    --base: clamp(2rem, 8cqi, 80px);
    --easing: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    --speed: 0.4s;
}

.hover-disclosure * {
    box-sizing: border-box;
}

.hover-disclosure h3 {
    white-space: nowrap;
    margin: 0;
}

.hover-disclosure li {
    background: transparent;
    position: relative;
    overflow: hidden;
    min-width: var(--base);
    border-radius: 8px;
    border: 1px solid hsl(var(--border));
    will-change: transform;
}

.hover-disclosure li :is(svg, h3) {
    opacity: 0.6;
    transition: opacity var(--speed) var(--easing);
    will-change: opacity;
}

.hover-disclosure li :is(a, p) {
    opacity: 0;
    transition: opacity var(--speed) var(--easing);
    width: fit-content;
    will-change: opacity;
}

.hover-disclosure li img {
    filter: grayscale(1) brightness(1.5);
    scale: 1.1;
    transition: filter var(--speed) var(--easing), scale var(--speed) var(--easing);
    will-change: filter, transform;
}

.hover-disclosure [data-active='true'] :is(a, p, h3, svg) {
    opacity: var(--opacity, 1);
}

.hover-disclosure [data-active='true'] :is(a, p) {
    transition-delay: calc(var(--speed) * 0.15);
}

.hover-disclosure [data-active='true'] img {
    filter: grayscale(0) brightness(1);
    scale: 1;
    transition-delay: calc(var(--speed) * 0.15);
}

.hover-disclosure article {
    width: calc(var(--article-width) * 1px);
    height: 100%;
    position: absolute;
    font-family: monospace;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 1rem;
    padding-inline: calc(var(--base) * 0.5 - 9px);
    padding-bottom: 1rem;
    overflow: hidden;
}

.hover-disclosure article h3 {
    position: absolute;
    top: 1rem;
    left: calc(var(--base) * 0.5);
    transform-origin: 0 50%;
    rotate: 90deg;
    font-size: 1rem;
    font-weight: 300;
    text-transform: uppercase;
    font-family: monospace;
}

.hover-disclosure article svg {
    width: 24px;
    height: 24px;
    fill: currentColor;
    stroke: none;
    opacity: 1;
}

.hover-disclosure article p {
    font-size: 13px;
    text-wrap: balance;
    line-height: 1.25;
    --opacity: 0.8;
}

.hover-disclosure article a {
    position: absolute;
    bottom: 1rem;
    height: 18px;
    line-height: 1;
    color: inherit;
}

.hover-disclosure article a:is(:focus-visible, :hover) {
    outline: none;
}

.hover-disclosure article a:is(:focus-visible, :hover) span {
    text-decoration: underline;
    text-underline-offset: 4px;
}

.hover-disclosure article a span {
    display: inline-block;
    line-height: 18px;
    translate: calc(var(--base) * 0.5);
    font-weight: 500;
}

.hover-disclosure article img {
    position: absolute;
    pointer-events: none;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    mask: radial-gradient(100% 100% at 100% 0, #fff, #0000);
}

.hover-disclosure ul {
    display: grid;
    container-type: inline-size;
    grid-template-columns: 10fr 1fr 1fr 1fr 1fr 1fr 1fr;
    gap: var(--gap);
    list-style-type: none;
    justify-content: center;
    padding: 0;
    height: clamp(300px, 40dvh, 474px);
    margin: 0;
    width: 820px;
    max-width: calc(100% - 4rem);
    transition: grid-template-columns var(--speed) var(--easing);
    will-change: grid-template-columns;
}`

const sourceFiles = [
    { filename: "hover-disclosure.tsx", code: cssComponentSource, language: "tsx" },
    { filename: "hover-disclosure.css", code: cssSource, language: "css" },
]

export default function HoverDisclosurePage() {
    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">
                    Components / Hover Disclosure
                </div>
                <h1 className="font-serif text-4xl tracking-tight">Hover Disclosure</h1>
                <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                    A horizontally expanding hover gallery that highlights one card at a time.
                    Built in both CSS and Tailwind variants, using pointer movement to smoothly resize columns.
                </p>

            </div>

            {/* CSS Version Preview */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Preview</h2>
                <p className="text-sm text-muted-foreground">
                    Hover over the cards to see them expand horizontally.
                </p>
                <ComponentPreview className="min-h-[460px] p-4 overflow-hidden flex items-center justify-center">
                    <div className="w-full max-w-[720px]">
                        <HoverDisclosure />
                    </div>
                </ComponentPreview>
            </section>

            {/* Source Code */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Source Code</h2>
                <CodeBlock files={sourceFiles} />
            </section>
        </div>
    )
}


