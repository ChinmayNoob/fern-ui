'use client'

import { CodeBlock } from "@/components/ui/code-block"
import { ComponentPreview } from "@/components/ui/component-preview"
import HoverBoxEffect from "@/components/hoverbox-effect/hovebox-effect"

const usageCode = `import HoverBoxEffect from "@/components/hoverbox-effect/hovebox-effect"

export function Example() {
  return (
    <HoverBoxEffect>
      <div className="h-[300px] w-[300px] rounded-xl overflow-hidden">
        <img
          src="/images/photo.jpg"
          alt="Example"
          className="w-full h-full object-cover"
        />
      </div>
    </HoverBoxEffect>
  )
}`

const componentSource = `'use client'
import { useState, useLayoutEffect, useRef } from 'react'

interface HoverBoxEffectProps {
    children: React.ReactNode
    perspective?: string
    transitionDuration?: number
    grayscale?: boolean
}

const HoverBoxEffect = ({
    children,
    perspective = '3000px',
    transitionDuration = 500,
    grayscale = true
}: HoverBoxEffectProps) => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
    const [reduceMotion, setReduceMotion] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const childRef = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        const updateDimensions = () => {
            if (childRef.current) {
                const { offsetWidth: width, offsetHeight: height } = childRef.current
                setDimensions({ width, height })
            }
        }

        const observer = new ResizeObserver(updateDimensions)
        if (childRef.current) observer.observe(childRef.current)

        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        setReduceMotion(mediaQuery.matches)
        const motionHandler = (e: MediaQueryListEvent) => setReduceMotion(e.matches)
        mediaQuery.addEventListener('change', motionHandler)

        return () => {
            observer.disconnect()
            mediaQuery.removeEventListener('change', motionHandler)
        }
    }, [])

    const frontTransform = \`translateZ(\${dimensions.height / 2}px)\`
    const backTransform = \`rotateX(-90deg) translateZ(\${dimensions.height / 2}px)\`

    const handleHover = (state: boolean) => {
        setIsHovered(state)
    }

    return (
        <>
            <div style={{ visibility: 'hidden', position: 'absolute' }}>
                <div ref={childRef}>{children}</div>
            </div>

            <div
                style={{
                    perspective,
                    width: dimensions.width,
                    height: dimensions.height,
                    margin: '0 auto'
                }}
            >
                <div
                    style={{
                        transformStyle: 'preserve-3d',
                        transition: reduceMotion
                            ? 'none'
                            : \`transform \${transitionDuration}ms ease-in-out\`,
                        transform: isHovered ? 'rotateX(90deg)' : 'none',
                        height: '100%',
                        width: '100%',
                        position: 'relative'
                    }}
                    onMouseEnter={() => handleHover(true)}
                    onMouseLeave={() => handleHover(false)}
                >
                    <div
                        style={{
                            transform: frontTransform,
                            backfaceVisibility: 'hidden',
                            filter: grayscale ? 'grayscale(1)' : 'none',
                            position: 'absolute',
                            width: '100%',
                            height: '100%'
                        }}
                    >
                        {children}
                    </div>

                    <div
                        style={{
                            transform: backTransform,
                            backfaceVisibility: 'hidden',
                            position: 'absolute',
                            width: '100%',
                            height: '100%'
                        }}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default HoverBoxEffect`

const indexSource = `export { default as HoverBoxEffect } from './hovebox-effect';`

const sourceFiles = [
    { filename: 'hovebox-effect.tsx', code: componentSource, language: 'tsx' },
    { filename: 'index.tsx', code: indexSource, language: 'tsx' },
]

export default function HoverBoxEffectPage() {
    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tight">Hover Box Effect</h1>
                <p className="text-muted-foreground">
                    A 3D flip effect that rotates content on the X-axis when hovered.
                    Features grayscale front face, smooth transitions, and respects reduced motion preferences.
                </p>
            </div>

            {/* Live Preview */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Preview</h2>
                <p className="text-sm text-muted-foreground">
                    Hover over the image to see the 3D flip effect.
                </p>
                <ComponentPreview className="min-h-[400px] p-8">
                    <HoverBoxEffect>
                        <div className="flex items-center justify-center rounded-xl shadow-lg h-[280px] w-[280px] overflow-hidden">
                            <img
                                src="/images/college-dropout.jpg"
                                alt="Album cover"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </HoverBoxEffect>
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
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b">
                                <th className="py-2 pr-4 text-left font-medium">Prop</th>
                                <th className="py-2 pr-4 text-left font-medium">Type</th>
                                <th className="py-2 pr-4 text-left font-medium">Default</th>
                                <th className="py-2 text-left font-medium">Description</th>
                            </tr>
                        </thead>
                        <tbody className="text-muted-foreground">
                            <tr className="border-b">
                                <td className="py-2 pr-4 font-mono text-xs">children</td>
                                <td className="py-2 pr-4 font-mono text-xs">ReactNode</td>
                                <td className="py-2 pr-4 font-mono text-xs">required</td>
                                <td className="py-2">Content to display and flip</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 pr-4 font-mono text-xs">perspective</td>
                                <td className="py-2 pr-4 font-mono text-xs">string</td>
                                <td className="py-2 pr-4 font-mono text-xs">&quot;3000px&quot;</td>
                                <td className="py-2">CSS perspective value for 3D effect</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 pr-4 font-mono text-xs">transitionDuration</td>
                                <td className="py-2 pr-4 font-mono text-xs">number</td>
                                <td className="py-2 pr-4 font-mono text-xs">500</td>
                                <td className="py-2">Animation duration in milliseconds</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 pr-4 font-mono text-xs">grayscale</td>
                                <td className="py-2 pr-4 font-mono text-xs">boolean</td>
                                <td className="py-2 pr-4 font-mono text-xs">true</td>
                                <td className="py-2">Apply grayscale filter to front face</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Features */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Features</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>3D flip animation on X-axis (rotates 90°)</li>
                    <li>Auto-detects child dimensions using ResizeObserver</li>
                    <li>Optional grayscale filter on front face</li>
                    <li>Customizable perspective and transition duration</li>
                    <li>Respects <code className="text-xs bg-muted px-1 py-0.5 rounded">prefers-reduced-motion</code></li>
                    <li>Works with any child content (images, cards, etc.)</li>
                    <li>No external animation libraries required</li>
                </ul>
            </section>

            {/* How It Works */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">How It Works</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm">
                    <li>Creates two copies of children: front and back faces</li>
                    <li>Front face positioned at <code className="text-xs bg-muted px-1 py-0.5 rounded">translateZ(height/2)</code></li>
                    <li>Back face pre-rotated -90° and positioned at same Z</li>
                    <li>On hover, container rotates 90° revealing back face</li>
                    <li>Uses <code className="text-xs bg-muted px-1 py-0.5 rounded">backfaceVisibility: hidden</code> for clean transitions</li>
                </ul>
            </section>

            {/* Notes */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Notes</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Child element should have defined dimensions</li>
                    <li>Hidden copy used to measure dimensions before render</li>
                    <li>Animation disabled when user prefers reduced motion</li>
                    <li>Lower perspective values create more dramatic 3D effect</li>
                </ul>
            </section>

            {/* Source Code */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Source Code</h2>
                <CodeBlock files={sourceFiles} />
            </section>
        </div>
    )
}

