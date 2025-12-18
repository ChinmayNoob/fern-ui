'use client'

import { CodeBlock } from "@/components/ui/code-block"
import { ComponentPreview } from "@/components/ui/component-preview"
import Splitflap from "@/components/splitflap/splitflap"

const usageCode = `import Splitflap from "@/components/splitflap/splitflap"

const lines = [
  { text: 'Hello!', alignment: 'left', pad: 1 },
  { text: 'World', alignment: 'right', pad: 2, color: 'hsl(44, 82%, 49%)' },
]

export function Example() {
  return (
    <Splitflap
      lines={lines}
      lineLength={12}
      showControls={true}
      showGrid={false}
    />
  )
}`

const componentSource = `'use client'

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
        this.characters = Array.from(\` \${characters} \`)
        this.colorSet = color
        this.pad = pad
        this.element = this.create()
        this.generateTimeline()
    }

    set chars(value: string) {
        this.characters = Array.from(\` \${value} \`)
        this.generateTimeline()
    }

    set color(value: string) {
        this.element?.style.setProperty('--color', value)
    }

    create(): HTMLElement {
        const element = Object.assign(document.createElement('div'), {
            className: styles.flip,
            style: \`--color: \${this.colorSet}\`,
            innerHTML: \`
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      \`,
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
            totalTime: \`+=\${shift + padding}\`,
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
export { DEFAULT_CHARACTERS, DEFAULT_TEXT_LENGTH } `

const cssSource = `@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap');

.root {
    --perspective: 1;
    --flip-bg-light: hsl(0 0% 92%);
    --flip-bg-dark: hsl(0 0% 15%);
    --board-bg: hsl(0 0% 10%);
}

:global(.dark) .root {
    --flip-bg-light: hsl(0 0% 20%);
    --flip-bg-dark: hsl(0 0% 12%);
    --board-bg: hsl(0 0% 5%);
}

.splitflapContainer {
    display: grid;
    place-items: center;
    min-height: 400px;
    padding: 2rem 1rem;
    overflow: hidden; /* Prevent scrollbar during animation */
}

.board {
    display: flex;
    gap: 0.4ch;
    flex-direction: column;
    text-transform: uppercase;
    font-family: 'Roboto Mono', monospace;
    padding: 8px;
    background: var(--board-bg);
    overflow: hidden; /* Prevent scrollbar during animation */
}

.flip {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    width: 1.5ch;
    position: relative;
    transform-style: preserve-3d;
    perspective: calc(var(--perspective) * 1em);
}

/* Top/bottom clip paths for split effect */
.flip div:nth-of-type(odd) {
    clip-path: polygon(0 0, 100% 0, 100% 48%, 0 48%);
}
.flip div:nth-of-type(even) {
    clip-path: polygon(0 52%, 100% 52%, 100% 100%, 0 100%);
}

/* See full CSS for complete animations */`

const sourceFiles = [
    {
        filename: "splitflap.tsx",
        code: componentSource,
        language: "tsx",
    },
    {
        filename: "splitflap.module.css",
        code: cssSource,
        language: "css",
    },
]

const customLines = [
    { text: 'Welcome', alignment: 'left' as const, pad: 1 },
    { text: 'To Fern', alignment: 'right' as const, pad: 2 },
    { text: 'UI Library', alignment: 'right' as const, pad: 3 },
    { text: 'Enjoy!', alignment: 'right' as const, color: 'hsl(150, 70%, 50%)', pad: 4 },
]

export default function SplitflapPage() {
    return (
        <div className="space-y-16">
            {/* Header */}
            <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">
                    Components / Splitflap
                </div>
                <h1 className="font-serif text-4xl tracking-tight">Splitflap</h1>
                <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                    A retro split-flap display component inspired by airport departure boards.
                    Features smooth GSAP-powered flip animations, customizable line colors,
                    text alignment, and flip speed. Fully theme-aware and responsive.
                </p>
            </div>

            {/* Preview */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Preview</h2>
                <ComponentPreview className="min-h-[500px] p-4">
                    <Splitflap showControls={true} />
                </ComponentPreview>
                <p className="text-xs text-muted-foreground">
                    <strong>Tip:</strong> Click &quot;Play&quot; to animate the text, &quot;Blank&quot; to clear all characters.
                </p>
            </section>

            {/* Custom Lines Example */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Custom Lines</h2>
                <p className="text-sm text-muted-foreground">
                    Pass custom lines with different colors and alignments.
                </p>
                <ComponentPreview className="min-h-[500px] p-4">
                    <Splitflap
                        lines={customLines}
                        showControls={true}
                    />
                </ComponentPreview>
            </section>

            {/* Usage */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Usage</h2>
                <CodeBlock code={usageCode} language="tsx" />
            </section>

            {/* Props */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Props</h2>
                <div className="overflow-hidden border border-foreground/10">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-foreground/5 bg-foreground/[0.02]">
                                <th className="px-4 py-3 text-left font-medium">Prop</th>
                                <th className="px-4 py-3 text-left font-medium">Type</th>
                                <th className="px-4 py-3 text-left font-medium">Description</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-foreground/5">
                            <tr>
                                <td className="px-4 py-3 font-mono text-xs">lines</td>
                                <td className="px-4 py-3 text-muted-foreground">SplitflapLine[]</td>
                                <td className="px-4 py-3 text-muted-foreground">Array of line objects to display</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-mono text-xs">lineLength</td>
                                <td className="px-4 py-3 text-muted-foreground">number</td>
                                <td className="px-4 py-3 text-muted-foreground">Characters per line (default: 12)</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-mono text-xs">characters</td>
                                <td className="px-4 py-3 text-muted-foreground">string</td>
                                <td className="px-4 py-3 text-muted-foreground">Character set for flip animation</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-mono text-xs">showGrid</td>
                                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                                <td className="px-4 py-3 text-muted-foreground">Show grid background (default: false)</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-mono text-xs">showControls</td>
                                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                                <td className="px-4 py-3 text-muted-foreground">Show Play/Blank buttons (default: true)</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-mono text-xs">className</td>
                                <td className="px-4 py-3 text-muted-foreground">string</td>
                                <td className="px-4 py-3 text-muted-foreground">Additional CSS classes</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3 className="mt-8 text-base font-medium">SplitflapLine Type</h3>
                <div className="overflow-hidden border border-foreground/10">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-foreground/5 bg-foreground/[0.02]">
                                <th className="px-4 py-3 text-left font-medium">Property</th>
                                <th className="px-4 py-3 text-left font-medium">Type</th>
                                <th className="px-4 py-3 text-left font-medium">Description</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-foreground/5">
                            <tr>
                                <td className="px-4 py-3 font-mono text-xs">text</td>
                                <td className="px-4 py-3 text-muted-foreground">string</td>
                                <td className="px-4 py-3 text-muted-foreground">Text to display on this line</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-mono text-xs">color</td>
                                <td className="px-4 py-3 text-muted-foreground">string?</td>
                                <td className="px-4 py-3 text-muted-foreground">CSS color for the text</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-mono text-xs">alignment</td>
                                <td className="px-4 py-3 text-muted-foreground">&apos;left&apos; | &apos;right&apos;</td>
                                <td className="px-4 py-3 text-muted-foreground">Text alignment (default: &apos;left&apos;)</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-mono text-xs">pad</td>
                                <td className="px-4 py-3 text-muted-foreground">number?</td>
                                <td className="px-4 py-3 text-muted-foreground">Animation delay multiplier (1-5)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Features */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Features</h2>
                <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground/40" />
                        <span><strong className="text-foreground">Realistic Animation</strong> — GSAP-powered flip animations with proper 3D transforms</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground/40" />
                        <span><strong className="text-foreground">Theme Aware</strong> — Adapts to light and dark themes automatically</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground/40" />
                        <span><strong className="text-foreground">Customizable Lines</strong> — Set text, color, alignment per line</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground/40" />
                        <span><strong className="text-foreground">Staggered Animation</strong> — Each character flips with natural delay</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground/40" />
                        <span><strong className="text-foreground">Mobile Responsive</strong> — Scales down gracefully on smaller screens</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground/40" />
                        <span><strong className="text-foreground">Full Character Set</strong> — Letters, numbers, and special characters</span>
                    </li>
                </ul>
            </section>

            {/* Dependencies */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Dependencies</h2>
                <p className="text-sm text-muted-foreground">
                    This component requires{" "}
                    <code className="bg-foreground/5 px-1.5 py-0.5 text-xs">gsap</code> for animations.
                    Install it with:
                </p>
                <CodeBlock code="pnpm add gsap" language="bash" />
            </section>

            {/* Source - Multi-file tabs */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Source Code</h2>
                <p className="text-sm text-muted-foreground">
                    This component requires 2 files. Copy both into your{" "}
                    <code className="bg-foreground/5 px-1.5 py-0.5 text-xs">components/splitflap/</code> folder.
                </p>
                <p className="text-xs text-muted-foreground">
                    <strong>Note:</strong> The source shown is abbreviated. Download the full files for complete implementation.
                </p>
                <CodeBlock files={sourceFiles} />
            </section>
        </div>
    )
}

