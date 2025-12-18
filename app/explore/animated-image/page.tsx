'use client'

import { CodeBlock } from "@/components/ui/code-block"
import { ComponentPreview } from "@/components/ui/component-preview"
import AnimatedImage from "@/components/animated-image/animated-image"

const usageCode = `import AnimatedImage from "@/components/animated-image/animated-image"

export function Example() {
  return (
    <AnimatedImage
      src="/agents/spiderman.webp"
      alt="Animated image"
      size={320}
      duration={500}
    />
  )
}`

const componentSource = `'use client'
import React from "react"

export interface AnimatedImageProps {
    src: string
    alt?: string
    size?: number
    duration?: number
}

const AnimatedImage = ({
    src,
    alt = "Animated Image",
    size = 400,
    duration = 500
}: AnimatedImageProps) => {
    return (
        <div className="overflow-hidden">
            <img
                src={src}
                alt={alt}
                className="w-full h-full rounded-xl object-cover grayscale scale-100 transition-all hover:grayscale-0 hover:scale-95"
                style={{
                    clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                    width: size + "px",
                    height: size + "px",
                    transitionDuration: duration + "ms",
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.clipPath =
                        "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.clipPath =
                        "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"
                }}
            />
        </div>
    )
}

export default AnimatedImage`

const indexSource = `export { default as AnimatedImage } from './animated-image';
export type { AnimatedImageProps } from './animated-image';`

const sourceFiles = [
    { filename: "animated-image.tsx", code: componentSource, language: "tsx" },
    { filename: "index.tsx", code: indexSource, language: "tsx" },
]

export default function AnimatedImagePage() {
    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">
                    Components / Animated Image
                </div>
                <h1 className="font-serif text-4xl tracking-tight">Animated Image</h1>
                <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                    A clipped, grayscale image that animates to full-color and full-rectangle on hover.
                    Perfect for adding subtle motion to avatars, covers, or feature images.
                </p>
            </div>

            {/* Live Preview */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Preview</h2>
                <p className="text-sm text-muted-foreground">
                    Hover over the diamond-shaped image to see it expand and reveal full color.
                </p>
                <ComponentPreview className="min-h-[360px] p-8">
                    <div className="flex w-full items-center justify-center">
                        <AnimatedImage
                            src="/agents/spiderman.webp"
                            alt="Spiderman"
                            size={320}
                            duration={500}
                        />
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
                                <td className="py-2 pr-4 font-mono text-xs">src</td>
                                <td className="py-2 pr-4 font-mono text-xs">string</td>
                                <td className="py-2 pr-4 font-mono text-xs">required</td>
                                <td className="py-2">Image source URL</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 pr-4 font-mono text-xs">alt</td>
                                <td className="py-2 pr-4 font-mono text-xs">string</td>
                                <td className="py-2 pr-4 font-mono text-xs">"Animated Image"</td>
                                <td className="py-2">Accessible alt text for the image</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 pr-4 font-mono text-xs">size</td>
                                <td className="py-2 pr-4 font-mono text-xs">number</td>
                                <td className="py-2 pr-4 font-mono text-xs">400</td>
                                <td className="py-2">Width and height of the image in pixels</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 pr-4 font-mono text-xs">duration</td>
                                <td className="py-2 pr-4 font-mono text-xs">number</td>
                                <td className="py-2 pr-4 font-mono text-xs">500</td>
                                <td className="py-2">Transition duration in milliseconds</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Notes */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Notes</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Uses CSS <code className="text-xs bg-muted px-1 py-0.5 rounded">clip-path</code> to switch between diamond and rectangle shapes.</li>
                    <li>Grayscale and scale animations are controlled via Tailwind utility classes.</li>
                    <li>Mouse-only interaction; on touch devices the static state will be shown.</li>
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


