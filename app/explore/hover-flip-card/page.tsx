'use client'

import { CodeBlock } from "@/components/ui/code-block"
import { ComponentPreview } from "@/components/ui/component-preview"
import HoverFlipCard from "@/components/hover-flip-card/hover-flip-card"

const usageCode = `import HoverFlipCard from "@/components/hover-flip-card/hover-flip-card"

export function Example() {
  return (
    <HoverFlipCard
      imageBackground="/images/photo-back.jpg"
      className="flex flex-col items-center justify-center p-6 rounded-xl bg-card/80 text-card-foreground shadow-lg backdrop-blur-sm"
    >
      <h2 className="text-lg font-semibold mb-2">Title</h2>
      <p className="text-sm text-muted-foreground">
        Front content goes here. On hover, the card flips to reveal the background image.
      </p>
    </HoverFlipCard>
  )
}`

const componentSource = `'use client'
import { useState, useCallback, useMemo } from 'react'

interface HoverFlipCardProps {
    children: React.ReactNode
    imageBackground: string
    className?: string
}

const HoverFlipCard = ({ children, imageBackground, className }: HoverFlipCardProps) => {
    const [position, setPosition] = useState({ x: 50, y: 50 })
    const [isHovered, setIsHovered] = useState(false)

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
        const x = ((e.clientX - left) / width) * 100
        const y = ((e.clientY - top) / height) * 100
        setPosition({ x, y })
    }, [])

    const memoizedChildren = useMemo(() => children, [children])

    return (
        <div
            className="relative w-80 h-80 sm:w-96 sm:h-96 mx-auto perspective-[1000px]"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className={\`relative w-full h-full transition-transform duration-500 transform-3d \${isHovered ? 'rotate-y-180' : ''}\`}
            >
                <div className={\`absolute w-full h-full backface-hidden \${className}\`}>
                    {memoizedChildren}
                </div>

                <div
                    className={\`absolute w-full h-full backface-hidden rotate-y-180 bg-cover bg-center overflow-hidden \${className}\`}
                    style={{
                        backgroundImage: \`url(\${imageBackground})\`,
                        backgroundPosition: \`\${position.x}% \${position.y}%\`
                    }}
                >
                    {memoizedChildren}
                </div>
            </div>
        </div>
    )
}

export default HoverFlipCard`

const indexSource = `export { default as HoverFlipCard } from './hover-flip-card';
export type { default as HoverFlipCardProps } from './hover-flip-card';`

const sourceFiles = [
    { filename: "hover-flip-card.tsx", code: componentSource, language: "tsx" },
    { filename: "index.tsx", code: indexSource, language: "tsx" },
]

export default function HoverFlipCardPage() {
    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">
                    Components / Hover Flip Card
                </div>
                <h1 className="font-serif text-4xl tracking-tight">Hover Flip Card</h1>
                <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                    A hover-activated flip card that reveals a background image on the back,
                    with the same content rendered on both sides for a seamless effect.
                </p>
            </div>

            {/* Live Preview */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Preview</h2>
                <p className="text-sm text-muted-foreground">
                    Hover over the card to flip between the content side and the image side.
                </p>
                <ComponentPreview className="min-h-[420px] p-8">
                    <div className="flex w-full items-center justify-center">
                        <HoverFlipCard
                            imageBackground="/artists/kendrick.png"
                            className="flex flex-col items-center justify-center p-8 rounded-xl shadow-lg bg-card/80 text-card-foreground backdrop-blur-sm"
                        >
                            <h2 className="text-xl font-bold mb-4">Kendrick Lamar</h2>
                            <p className="text-sm text-muted-foreground text-center">
                                Kendrick Lamar is a rapper from Compton, California. He is known for his unique style and flow.
                            </p>
                        </HoverFlipCard>
                    </div>
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
                                <th className="py-2 pr-4 text-left font-medium">Required</th>
                                <th className="py-2 text-left font-medium">Description</th>
                            </tr>
                        </thead>
                        <tbody className="text-muted-foreground">
                            <tr className="border-b">
                                <td className="py-2 pr-4 font-mono text-xs">children</td>
                                <td className="py-2 pr-4 font-mono text-xs">ReactNode</td>
                                <td className="py-2 pr-4">Yes</td>
                                <td className="py-2">Content rendered on both front and back sides</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 pr-4 font-mono text-xs">imageBackground</td>
                                <td className="py-2 pr-4 font-mono text-xs">string</td>
                                <td className="py-2 pr-4">Yes</td>
                                <td className="py-2">Background image URL for the back side</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 pr-4 font-mono text-xs">className</td>
                                <td className="py-2 pr-4 font-mono text-xs">string</td>
                                <td className="py-2 pr-4">No</td>
                                <td className="py-2">Additional classes for inner content wrapper</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Notes */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Notes</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Relies on custom 3D utility classes (e.g. <code className="text-xs bg-muted px-1 py-0.5 rounded">transform-3d</code>, <code className="text-xs bg-muted px-1 py-0.5 rounded">rotate-y-180</code>, <code className="text-xs bg-muted px-1 py-0.5 rounded">backface-hidden</code>).</li>
                    <li>Image side uses <code className="text-xs bg-muted px-1 py-0.5 rounded">background-position</code> that follows cursor for a subtle parallax effect.</li>
                    <li>Front and back share the same children for a consistent flip.</li>
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


