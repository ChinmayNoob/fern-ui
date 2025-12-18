'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import styles from './splitflap.module.css'
import { cn } from '@/lib/utils'

gsap.defaults({
    duration: 1,
    ease: 'none',
})

// Types
export interface SplitflapLine {
    text: string
    color?: string
    alignment?: 'left' | 'right'
    pad?: number
}

export interface SplitflapProps {
    /** Array of lines to display */
    lines?: SplitflapLine[]
    /** Number of characters per line */
    lineLength?: number
    /** Character set to use for flip animation */
    characters?: string
    /** Show grid background */
    showGrid?: boolean
    /** Show control buttons */
    showControls?: boolean
    /** Custom class name */
    className?: string
}

interface FlipSlotOptions {
    characters?: string
    color?: string
    pad?: number
}

interface FlipLineOptions {
    color?: string
    length?: number
    pad?: number
}

interface LineConfig {
    text: string
    pad: number
    color: string
    alignment: 'left' | 'right'
    characters: string
    id: string
}

const DEFAULT_CHARACTERS = 'abcdefghijklmnopqrstuvwxyz0123456789!?'
const DEFAULT_TEXT_LENGTH = 12

class FlipSlot {
    characters: string[]
    colorSet: string
    pad: number
    element: HTMLElement
    timeline: gsap.core.Timeline | null = null
    scrubber: gsap.core.Tween | null = null

    constructor(options: FlipSlotOptions = {}) {
        const {
            characters = DEFAULT_CHARACTERS,
            color = 'hsl(var(--foreground))',
            pad = 0,
        } = options
        this.characters = Array.from(` ${characters} `)
        this.colorSet = color
        this.pad = pad
        this.element = this.create()
        this.generateTimeline()
    }

    set chars(value: string) {
        this.characters = Array.from(` ${value} `)
        this.generateTimeline()
    }

    set color(value: string) {
        this.element?.style.setProperty('--color', value)
    }

    create(): HTMLElement {
        const element = Object.assign(document.createElement('div'), {
            className: styles.flip,
            style: `--color: ${this.colorSet}`,
            innerHTML: `
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      `,
        })
        return element
    }

    flip(character: string, delay = 0) {
        const { characters: chars, pad, timeline, scrubber } = this
        if (!timeline || !scrubber) return

        const timeValue = timeline!.totalTime()
        const currentIndex = chars.indexOf(chars[Math.floor(timeValue)])
        const desiredIndex =
            chars.indexOf(character) !== -1 ? chars.indexOf(character) : 0

        const shift =
            currentIndex > desiredIndex
                ? chars.length - 1 - currentIndex + desiredIndex
                : desiredIndex - currentIndex

        const padding = currentIndex === desiredIndex ? 0 : pad * (chars.length - 1)

        gsap.to(scrubber, {
            delay,
            totalTime: `+=${shift + padding}`,
            ease: 'power1.out',
            duration: (shift + padding) * gsap.utils.random(0.02, 0.06),
        })
    }

    generateTimeline() {
        const { timeline: currentTimeline, scrubber, element } = this
        if (currentTimeline) currentTimeline.kill()
        if (scrubber?.kill) scrubber.kill()

        const [unfoldTop, unfoldBottom, foldTop, foldBottom] = Array.from(
            element.querySelectorAll('div')
        ) as HTMLElement[]
        const chars = this.characters

        gsap.set([foldTop, unfoldBottom], { clearProps: 'all' })

        unfoldTop.innerText = unfoldBottom.innerText = chars[1]
        foldTop.innerText = foldBottom.innerText = chars[0]

        const timeline = gsap
            .timeline({
                paused: true,
                repeat: chars.length - 2,
                onRepeat: () => {
                    const index = Math.floor(timeline.totalTime() / timeline.duration())
                    const next = chars[index % chars.length]
                    const current = chars[(index + 1) % chars.length]
                    unfoldTop.innerText = unfoldBottom.innerText = current
                    foldTop.innerText = foldBottom.innerText = next
                },
            })
            .fromTo(
                unfoldBottom,
                { rotateX: 180 },
                { rotateX: 0, duration: 1 },
                0
            )
            .fromTo(
                unfoldTop,
                { filter: 'brightness(0)' },
                { filter: 'brightness(1)', duration: 1 },
                0
            )
            .fromTo(
                foldTop,
                { rotateX: 0 },
                { duration: 1, rotateX: -180 },
                0
            )
            .fromTo(
                foldBottom,
                { filter: 'brightness(1)' },
                { duration: 1, filter: 'brightness(0)' },
                0
            )

        const duration = timeline.totalDuration()
        this.scrubber = gsap.to(timeline, {
            totalTime: duration,
            repeat: -1,
            paused: true,
            duration: duration,
            ease: 'none',
        })
        this.scrubber.time(timeline.totalDuration())
        this.timeline = timeline
    }
}

class FlipLine {
    colorSet: string
    length: number
    padding: number
    options: FlipLineOptions
    element: HTMLElement
    flips: FlipSlot[] = []
    timeline: gsap.core.Timeline | null = null
    scrubber: gsap.core.Tween | null = null

    constructor(options: FlipLineOptions = {}, textLength: number = DEFAULT_TEXT_LENGTH) {
        const { color, length = textLength, pad = 0 } = options
        this.colorSet = color || 'hsl(var(--foreground))'
        this.length = length
        this.padding = pad
        this.options = options
        this.element = document.createElement('div')
        this.setup()
    }

    setup() {
        const { colorSet, length, padding } = this
        if (this.element) {
            this.element.innerHTML = ''
            this.element.className = styles.flipLine
        }
        this.flips = []
        for (let i = 0; i < length; i++) {
            const newSlot = new FlipSlot({
                pad: padding,
                characters: DEFAULT_CHARACTERS,
                color: colorSet,
            })
            this.element.appendChild(newSlot.element)
            this.flips.push(newSlot)
        }
    }

    set lineLength(value: number) {
        this.length = value
        this.setup()
    }

    set pad(value: number) {
        const { flips } = this
        if (flips) {
            for (let i = 0; i < flips.length; i++) flips[i].pad = value
        }
    }

    set color(value: string) {
        const { flips } = this
        this.colorSet = value
        if (flips) {
            for (let i = 0; i < flips.length; i++) flips[i].color = value
        }
    }

    run(update: string, textLength: number = DEFAULT_TEXT_LENGTH) {
        const letters = Array.from(update.padEnd(textLength, ' '))
        for (let i = 0; i < Math.min(letters.length, this.length); i++) {
            this.flips[i]?.flip(letters[i], i / textLength)
        }
    }
}

// Default demo lines
const defaultLines: SplitflapLine[] = [
    { text: 'Hello!', alignment: 'left', pad: 1 },
    { text: 'Fern UI', alignment: 'right', pad: 2 },
    { text: 'Splitflap', alignment: 'right', pad: 3 },
    { text: 'Component', alignment: 'right', color: 'hsl(44, 82%, 49%)', pad: 4 },
]

export default function Splitflap({
    lines = defaultLines,
    lineLength = DEFAULT_TEXT_LENGTH,
    characters = DEFAULT_CHARACTERS,
    showGrid = false,
    showControls = true,
    className,
}: SplitflapProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const boardRef = useRef<HTMLDivElement>(null)
    const [flips, setFlips] = useState<Record<string, { config: LineConfig; flipper: FlipLine }>>({})
    const [isInitialized, setIsInitialized] = useState(false)

    useEffect(() => {
        if (!containerRef.current || !boardRef.current) return

        // Clear any existing lines (important for React Strict Mode)
        boardRef.current.innerHTML = ''

        containerRef.current.style.setProperty('--perspective', '1')

        const initialLines: LineConfig[] = lines.map((line) => ({
            text: line.text,
            pad: line.pad ?? 1,
            alignment: line.alignment ?? 'left',
            color: line.color ?? 'hsl(var(--foreground))',
            characters: characters,
            id: crypto.randomUUID(),
        }))

        const newFlips: Record<string, { config: LineConfig; flipper: FlipLine }> = {}

        initialLines.forEach((lineConfig) => {
            const newLine = new FlipLine({
                length: lineLength,
                color: lineConfig.color,
                pad: lineConfig.pad,
            }, lineLength)

            boardRef.current?.appendChild(newLine.element)

            newLine.run(
                lineConfig.alignment === 'right'
                    ? lineConfig.text.toLowerCase().padStart(lineLength, ' ')
                    : lineConfig.text.toLowerCase(),
                lineLength
            )

            newFlips[lineConfig.id] = {
                config: lineConfig,
                flipper: newLine,
            }
        })

        setFlips(newFlips)
        setIsInitialized(true)

        return () => {
            Object.values(newFlips).forEach(({ flipper }) => {
                flipper.flips.forEach(flip => {
                    flip.timeline?.kill()
                    flip.scrubber?.kill()
                })
            })
        }
    }, [lines, lineLength, characters])

    const playAll = useCallback(() => {
        Object.values(flips).forEach((line) => {
            line.flipper.run(
                line.config.alignment === 'right'
                    ? line.config.text.toLowerCase().padStart(lineLength, ' ')
                    : line.config.text.toLowerCase(),
                lineLength
            )
        })
    }, [flips, lineLength])

    const blankAll = useCallback(() => {
        Object.values(flips).forEach((line) => {
            line.flipper.run('', lineLength)
        })
    }, [flips, lineLength])

    return (
        <div
            ref={containerRef}
            className={cn(
                styles.splitflapContainer,
                styles.root,
                showGrid && styles.withGrid,
                className
            )}
        >
            <div ref={boardRef} className={styles.board}></div>
            {showControls && isInitialized && (
                <div className={styles.controls}>
                    <button onClick={playAll} className={styles.button}>
                        Play
                    </button>
                    <button onClick={blankAll} className={cn(styles.button, styles.buttonSecondary)}>
                        Blank
                    </button>
                </div>
            )}
        </div>
    )
}

// Export types and defaults for documentation
export { DEFAULT_CHARACTERS, DEFAULT_TEXT_LENGTH } 