'use client'

import { CodeBlock } from "@/components/ui/code-block"
import { ComponentPreview } from "@/components/ui/component-preview"
import ShinyWrapper from "@/components/shiny-wrap/shiny-wrapper"

const usageCode = `import ShinyWrapper from "@/components/shiny-wrap/shiny-wrapper"

export function Example() {
  return (
    <div className="flex gap-4">
      <ShinyWrapper className="rounded-xl">
        <figure className="h-[320px] w-[220px] overflow-hidden rounded-xl">
          <img
            src="/images/photo1.jpg"
            alt="Shiny wrapper"
            className="w-full h-full object-cover"
          />
        </figure>
      </ShinyWrapper>
    </div>
  )
}`

const componentSource = `'use client'
import { useState, ReactNode } from 'react'

interface ShinyWrapperProps {
    children: ReactNode
    animationSpeed?: number
    loop?: boolean
    loopDelay?: number
    hoverOnly?: boolean
    shinyStyle?: 'gradient' | 'solid'
    className?: string
    shinyWidth?: string
}

const ShinyWrapper = ({
    children,
    animationSpeed = 1500,
    loop = true,
    loopDelay = 200,
    hoverOnly = false,
    shinyStyle = 'gradient',
    className = '',
    shinyWidth = '30%'
}: ShinyWrapperProps) => {
    const [isHovered, setIsHovered] = useState(false)

    const totalDuration = loop ? animationSpeed + loopDelay : animationSpeed
    const shouldAnimate = hoverOnly ? isHovered : true

    const animationStyle = {
        animation: shouldAnimate
            ? \`shine \${totalDuration}ms linear \${loop ? 'infinite' : '1'}\`
            : 'none'
    }

    const shinyClass = {
        gradient: 'bg-gradient-to-r from-transparent via-white/10 to-transparent',
        solid: 'bg-white/10'
    }

    return (
        <div
            className={\`relative overflow-hidden \${className}\`}
            onMouseEnter={hoverOnly ? () => setIsHovered(true) : undefined}
            onMouseLeave={hoverOnly ? () => setIsHovered(false) : undefined}
        >
            <div
                className={\`absolute z-1 top-0 -left-1/2 h-full -skew-x-14 \${shinyClass[shinyStyle]}\`}
                style={{ ...animationStyle, width: shinyWidth }}
            />
            <div className='relative'>{children}</div>
        </div>
    )
}

export default ShinyWrapper`

const indexSource = `export { default as ShinyWrapper } from './shiny-wrapper';`

const sourceFiles = [
    { filename: "shiny-wrapper.tsx", code: componentSource, language: "tsx" },
    { filename: "index.tsx", code: indexSource, language: "tsx" },
]

export default function ShinyWrapPage() {
    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">
                    Components / Shiny Wrap
                </div>
                <h1 className="font-serif text-4xl tracking-tight">Shiny Wrap</h1>
                <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                    A simple shimmering highlight wrapper that adds a moving light streak over any content.
                    Great for featured cards, album covers, or hero images.
                </p>
            </div>

            {/* Live Preview */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Preview</h2>
                <p className="text-sm text-muted-foreground">
                    The shine effect animates across the cards in a loop. You can also enable hover-only mode.
                </p>
                <ComponentPreview className="min-h-[460px] p-6">
                    <div className="flex flex-wrap items-center justify-center gap-6">
                        <ShinyWrapper className="rounded-xl">
                            <figure className="h-[320px] w-[220px] overflow-hidden rounded-xl">
                                <img
                                    src="/agents/cypher.webp"
                                    alt="Shiny wrapper"
                                    className="w-full h-full object-cover"
                                />
                            </figure>
                        </ShinyWrapper>
                        <ShinyWrapper className="rounded-xl">
                            <figure className="h-[320px] w-[220px] overflow-hidden rounded-xl">
                                <img
                                    src="/artists/rocky.jpg"
                                    alt="Shiny wrapper"
                                    className="w-full h-full object-cover"
                                />
                            </figure>
                        </ShinyWrapper>
                        <ShinyWrapper className="rounded-xl">
                            <figure className="h-[320px] w-[220px] overflow-hidden rounded-xl">
                                <img
                                    src="/agents/breach.webp"
                                    alt="Shiny wrapper"
                                    className="w-full h-full object-cover"
                                />
                            </figure>
                        </ShinyWrapper>
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
                                <td className="py-2">Content to wrap with the shine effect</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 pr-4 font-mono text-xs">animationSpeed</td>
                                <td className="py-2 pr-4 font-mono text-xs">number</td>
                                <td className="py-2 pr-4 font-mono text-xs">1500</td>
                                <td className="py-2">Duration of the shine animation in milliseconds</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 pr-4 font-mono text-xs">loop</td>
                                <td className="py-2 pr-4 font-mono text-xs">boolean</td>
                                <td className="py-2 pr-4 font-mono text-xs">true</td>
                                <td className="py-2">Whether the shine animation should loop</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 pr-4 font-mono text-xs">loopDelay</td>
                                <td className="py-2 pr-4 font-mono text-xs">number</td>
                                <td className="py-2 pr-4 font-mono text-xs">200</td>
                                <td className="py-2">Delay between shine loops (ms) when looping</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 pr-4 font-mono text-xs">hoverOnly</td>
                                <td className="py-2 pr-4 font-mono text-xs">boolean</td>
                                <td className="py-2 pr-4 font-mono text-xs">false</td>
                                <td className="py-2">Only animate when hovered</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 pr-4 font-mono text-xs">shinyStyle</td>
                                <td className="py-2 pr-4 font-mono text-xs">'gradient' | 'solid'</td>
                                <td className="py-2 pr-4 font-mono text-xs">'gradient'</td>
                                <td className="py-2">Style of the shine bar (gradient vs solid)</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 pr-4 font-mono text-xs">shinyWidth</td>
                                <td className="py-2 pr-4 font-mono text-xs">string</td>
                                <td className="py-2 pr-4 font-mono text-xs">'30%'</td>
                                <td className="py-2">Width of the shine bar (CSS value)</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 pr-4 font-mono text-xs">className</td>
                                <td className="py-2 pr-4 font-mono text-xs">string</td>
                                <td className="py-2 pr-4 font-mono text-xs">""</td>
                                <td className="py-2">Additional classes for the wrapper</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Source Code */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Source Code</h2>
                <CodeBlock files={sourceFiles} />
            </section>
        </div>
    )
}


