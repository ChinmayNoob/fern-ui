'use client'

import { CodeBlock } from "@/components/ui/code-block"
import { ComponentPreview } from "@/components/ui/component-preview"
import TiltCard from "@/components/tilt-image/tilt-image"

const usageCode = `import TiltCard from "@/components/tilt-image/tilt-image"

export function Example() {
  return (
    <TiltCard maxRotation={4} perspective={400} scaleOnHover={1.04}>
      <figure>
        <img
          src="/images/photo.jpg"
          alt="Example"
          className="rounded-xl shadow-lg w-[280px] h-[360px] object-cover"
        />
      </figure>
    </TiltCard>
  )
}`

const componentSource = `'use client'
import { useRef, useEffect, useCallback, ReactNode } from 'react'

export interface TiltCardProps {
    children: ReactNode
    maxRotation?: number
    perspective?: number
    scaleOnHover?: number
}

const TiltCard = ({
    children,
    maxRotation = 3,
    perspective = 300,
    scaleOnHover = 1.02
}: TiltCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null)
    const rafId = useRef<number | null>(null)
    const dimensions = useRef({ width: 0, height: 0 })

    const updateDimensions = useCallback(() => {
        if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect()
            dimensions.current = {
                width: rect.width,
                height: rect.height
            }
        }
    }, [])

    useEffect(() => {
        updateDimensions()
        window.addEventListener('resize', updateDimensions)
        return () => {
            window.removeEventListener('resize', updateDimensions)
            if (rafId.current) cancelAnimationFrame(rafId.current)
        }
    }, [updateDimensions])

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (!cardRef.current) return

            if (rafId.current) cancelAnimationFrame(rafId.current)

            rafId.current = requestAnimationFrame(() => {
                if (!cardRef.current) return

                const { width, height } = dimensions.current
                const centerX = width / 2
                const centerY = height / 2

                const rect = cardRef.current.getBoundingClientRect()
                const x = e.clientX - rect.left
                const y = e.clientY - rect.top

                const rotateY = ((x - centerX) / centerX) * maxRotation
                const rotateX = -((y - centerY) / centerY) * maxRotation

                cardRef.current.style.transform = \`
        rotateX(\${rotateX}deg)
        rotateY(\${rotateY}deg)
        scale3d(\${scaleOnHover}, \${scaleOnHover}, \${scaleOnHover})
      \`
            })
        },
        [maxRotation, scaleOnHover]
    )

    const handleMouseLeave = useCallback(() => {
        if (rafId.current) cancelAnimationFrame(rafId.current)
        if (cardRef.current) {
            cardRef.current.style.transform = \`
      rotateX(0deg)
      rotateY(0deg)
      scale3d(1, 1, 1)
    \`
        }
    }, [])

    return (
        <div style={{ perspective: \`\${perspective}px\` }} className="">
            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="transition-transform duration-300 ease-out"
            >
                {children}
            </div>
        </div>
    )
}

export default TiltCard`

const indexSource = `export { default as TiltCard } from './tilt-image';
export type { TiltCardProps } from './tilt-image';`

const sourceFiles = [
    { filename: "tilt-image.tsx", code: componentSource, language: "tsx" },
    { filename: "index.tsx", code: indexSource, language: "tsx" },
]

export default function TiltCardPage() {
    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">
                    Components / Tilt Card
                </div>
                <h1 className="font-serif text-4xl tracking-tight">Tilt Card</h1>
                <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                    A lightweight 3D tilt effect that responds to mouse movement.
                    Wrap any card or image to add subtle depth and interactivity.
                </p>
            </div>

            {/* Live Preview */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Preview</h2>
                <p className="text-sm text-muted-foreground">
                    Move your cursor over the card to see the tilt effect.
                </p>
                <ComponentPreview className="min-h-[420px] p-8">
                    <div className="flex w-full items-center justify-center">
                        <TiltCard maxRotation={4} perspective={400} scaleOnHover={1.04}>
                            <figure>
                                <img
                                    src="/agents/spiderman.webp"
                                    alt="Spiderman"
                                    className="rounded-xl shadow-lg w-[280px] h-[360px] object-cover"
                                />
                            </figure>
                        </TiltCard>
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
                                <th className="py-2 pr-4 text-left font-medium">Default</th>
                                <th className="py-2 text-left font-medium">Description</th>
                            </tr>
                        </thead>
                        <tbody className="text-muted-foreground">
                            <tr className="border-b">
                                <td className="py-2 pr-4 font-mono text-xs">children</td>
                                <td className="py-2 pr-4 font-mono text-xs">ReactNode</td>
                                <td className="py-2 pr-4 font-mono text-xs">required</td>
                                <td className="py-2">Content to tilt (usually an image or card)</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 pr-4 font-mono text-xs">maxRotation</td>
                                <td className="py-2 pr-4 font-mono text-xs">number</td>
                                <td className="py-2 pr-4 font-mono text-xs">3</td>
                                <td className="py-2">Maximum rotation in degrees on X/Y axes</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 pr-4 font-mono text-xs">perspective</td>
                                <td className="py-2 pr-4 font-mono text-xs">number</td>
                                <td className="py-2 pr-4 font-mono text-xs">300</td>
                                <td className="py-2">3D perspective distance in pixels</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 pr-4 font-mono text-xs">scaleOnHover</td>
                                <td className="py-2 pr-4 font-mono text-xs">number</td>
                                <td className="py-2 pr-4 font-mono text-xs">1.02</td>
                                <td className="py-2">Scale factor applied while hovering</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Notes */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Notes</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Effect is mouse-based and will not animate on touch devices.</li>
                    <li>Wrap only one element (like a card or figure) for best results.</li>
                    <li>Use smaller <code className="text-xs bg-muted px-1 py-0.5 rounded">maxRotation</code> for subtle motion.</li>
                    <li>No external animation libraries required.</li>
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


