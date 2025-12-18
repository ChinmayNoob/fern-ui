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
} 