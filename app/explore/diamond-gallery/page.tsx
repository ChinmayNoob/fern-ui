'use client'

import { CodeBlock } from "@/components/ui/code-block"
import { ComponentPreview } from "@/components/ui/component-preview"
import DiamondGallery from "@/components/diamond-gallery/diamond-gallery"

const usageCode = `import DiamondGallery from "@/components/diamond-gallery/diamond-gallery"

export function Example() {
  return (
    <div className="w-96 h-96">
      <DiamondGallery
        images={[
          { image: '/images/photo1.jpg', isLink: true, href: '/', target: '_blank' },
          { image: '/images/photo2.jpg', isLink: false },
          { image: '/images/photo3.jpg', isLink: false },
          { image: '/images/photo4.jpg', isLink: true, href: '/about' },
        ]}
      />
    </div>
  )
}`

const componentSource = `'use client'
import { useState } from 'react'

interface ImageItem {
    image: string
    isLink?: boolean
    href?: string
    target?: string
    rel?: string
}

interface DiamondGalleryProps {
    images: ImageItem[]
}

const DiamondGallery = ({ images }: DiamondGalleryProps) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    const positions = [
        'top-0 left-1/2 transform -translate-x-1/2 -translate-y-[5%]',
        'left-0 top-1/2 transform -translate-y-1/2 -translate-x-[5%]',
        'right-0 top-1/2 transform -translate-y-1/2 translate-x-[5%]',
        'bottom-0 left-1/2 transform -translate-x-1/2 translate-y-[5%]'
    ]

    return (
        <div className='relative aspect-square h-full'>
            {images.slice(0, 4).map((img: ImageItem, idx: number) => {
                const imageElement = (
                    <img
                        src={img.image}
                        alt={\`Gallery image \${idx + 1}\`}
                        className='size-full object-cover -rotate-45 scale-150'
                        onMouseEnter={() => setHoveredIndex(idx)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    />
                )

                return (
                    <div
                        className={\`absolute w-1/2 h-1/2 rotate-45 rounded-lg transition-all duration-500 overflow-hidden 
              \${positions[idx]}
              \${hoveredIndex === idx ? 'scale-100 z-1' : 'scale-75 z-0'}
              \${hoveredIndex !== null && hoveredIndex !== idx
                            ? 'filter blur-sm grayscale'
                            : ''
                        }\`}
                        key={idx}
                    >
                        {img.isLink ? (
                            <a
                                href={img.href}
                                target={img.target}
                                rel={img.rel}
                                className='block size-full'
                            >
                                {imageElement}
                            </a>
                        ) : (
                            imageElement
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default DiamondGallery;`

const indexSource = `export { default as DiamondGallery } from './diamond-gallery';
export type { default as DiamondGalleryProps } from './diamond-gallery';`

const sourceFiles = [
    { filename: 'diamond-gallery.tsx', code: componentSource, language: 'tsx' },
    { filename: 'index.tsx', code: indexSource, language: 'tsx' },
]

const demoWithLinks = [
    { image: '/agents/sage-pc.jpeg', isLink: true, href: '#', target: '_blank', rel: 'noopener noreferrer' },
    { image: '/agents/jett-pc.jpeg', isLink: false },
    { image: '/agents/omen-pc.jpeg', isLink: false },
    { image: '/agents/iso-pc.jpeg', isLink: true, href: '#' },
]

export default function DiamondGalleryPage() {
    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">
                    Components / Diamond Gallery
                </div>
                <h1 className="font-serif text-4xl tracking-tight">Diamond Gallery</h1>
                <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                    A unique image gallery with 4 images arranged in a diamond pattern.
                    Features hover effects with scale, blur, and grayscale transitions.
                </p>
            </div>


            {/* With Links Preview */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Preview</h2>
                <p className="text-sm text-muted-foreground">
                    Hover over each image to see the focus effect.Images can optionally be wrapped in links for navigation.
                </p>
                <ComponentPreview className="min-h-[550px] p-8">
                    <div className="w-80 h-80 sm:w-96 sm:h-96">
                        <DiamondGallery images={demoWithLinks} />
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
                                <th className="py-2 text-left font-medium">Description</th>
                            </tr>
                        </thead>
                        <tbody className="text-muted-foreground">
                            <tr className="border-b">
                                <td className="py-2 pr-4 font-mono text-xs">images</td>
                                <td className="py-2 pr-4 font-mono text-xs">ImageItem[]</td>
                                <td className="py-2">Array of 4 images to display</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* ImageItem Type */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">ImageItem Type</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b">
                                <th className="py-2 pr-4 text-left font-medium">Property</th>
                                <th className="py-2 pr-4 text-left font-medium">Type</th>
                                <th className="py-2 pr-4 text-left font-medium">Required</th>
                                <th className="py-2 text-left font-medium">Description</th>
                            </tr>
                        </thead>
                        <tbody className="text-muted-foreground">
                            <tr className="border-b">
                                <td className="py-2 pr-4 font-mono text-xs">image</td>
                                <td className="py-2 pr-4 font-mono text-xs">string</td>
                                <td className="py-2 pr-4">Yes</td>
                                <td className="py-2">Image source URL</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 pr-4 font-mono text-xs">isLink</td>
                                <td className="py-2 pr-4 font-mono text-xs">boolean</td>
                                <td className="py-2 pr-4">No</td>
                                <td className="py-2">Wrap image in anchor tag</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 pr-4 font-mono text-xs">href</td>
                                <td className="py-2 pr-4 font-mono text-xs">string</td>
                                <td className="py-2 pr-4">No</td>
                                <td className="py-2">Link destination URL</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 pr-4 font-mono text-xs">target</td>
                                <td className="py-2 pr-4 font-mono text-xs">string</td>
                                <td className="py-2 pr-4">No</td>
                                <td className="py-2">Link target (_blank, _self, etc.)</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 pr-4 font-mono text-xs">rel</td>
                                <td className="py-2 pr-4 font-mono text-xs">string</td>
                                <td className="py-2 pr-4">No</td>
                                <td className="py-2">Link rel attribute</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Features */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Features</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Diamond-shaped layout with 4 rotated images</li>
                    <li>Hover effect: focused image scales up to 100%</li>
                    <li>Other images blur and turn grayscale on hover</li>
                    <li>Smooth 500ms transitions</li>
                    <li>Optional link wrapping for each image</li>
                    <li>Responsive - uses parent container dimensions</li>
                    <li>CSS-only animations (no JS animation library)</li>
                </ul>
            </section>

            {/* Position Layout */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Image Positions</h2>
                <p className="text-sm text-muted-foreground">
                    Images are positioned in a diamond pattern:
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
                    <li><code className="text-xs bg-muted px-1 py-0.5 rounded">images[0]</code> - Top center</li>
                    <li><code className="text-xs bg-muted px-1 py-0.5 rounded">images[1]</code> - Left center</li>
                    <li><code className="text-xs bg-muted px-1 py-0.5 rounded">images[2]</code> - Right center</li>
                    <li><code className="text-xs bg-muted px-1 py-0.5 rounded">images[3]</code> - Bottom center</li>
                </ul>
            </section>

            {/* Notes */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Notes</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Requires exactly 4 images for proper layout</li>
                    <li>Parent container should have defined width/height</li>
                    <li>Uses <code className="text-xs bg-muted px-1 py-0.5 rounded">aspect-square</code> for consistent proportions</li>
                    <li>Images are rotated 45° and counter-rotated inside</li>
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

