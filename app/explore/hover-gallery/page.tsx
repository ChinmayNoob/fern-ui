'use client'

import { CodeBlock } from "@/components/ui/code-block"
import { ComponentPreview } from "@/components/ui/component-preview"
import HoverGallery from "@/components/hover-gallery/hover-gallery"

const usageCode = `import HoverGallery from "@/components/hover-gallery/hover-gallery"

// First 3 images for the stacked view
const stackedImages = [
  { id: 1, bg: "#22c55e", img: "/images/photo1.jpg" },
  { id: 2, bg: "#ef4444", img: "/images/photo2.jpg" },
  { id: 3, bg: "#eab308", img: "/images/photo3.jpg" },
]

// 4th image for the bottom
const bottomImage = { id: 4, bg: "#3b82f6", img: "/images/photo4.jpg" }

export function Example() {
  return (
    <HoverGallery
      stackedImages={stackedImages}
      bottomImage={bottomImage}
      width="420px"
      height="450px"
    />
  )
}`

const componentSource = `"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type Element = {
    id: number;
    bg: string;
    img: string;
};

export interface HoverGalleryProps {
    /** First 3 stacked images */
    stackedImages?: Element[];
    /** 4th bottom image */
    bottomImage?: Element;
    /** Container width */
    width?: string;
    /** Container height */
    height?: string;
    /** Custom class name */
    className?: string;
}

const defaultStackedImages: Element[] = [
    { id: 1, bg: "#22c55e", img: "/albums/blonde.png" },
    { id: 2, bg: "#ef4444", img: "/images/college-dropout.jpg" },
    { id: 3, bg: "#eab308", img: "/images/graduation.jpg" },
];

const defaultBottomImage: Element = { id: 4, bg: "#3b82f6", img: "/images/mbdtf.jpg" };

const Gallery = (props: { item: Element; index?: number }) => {
    return (
        <motion.div
            className={cn(
                "rounded-2xl flex items-center justify-center h-[80%] w-[80%] max-h-[222px] origin-bottom overflow-hidden"
            )}
            layoutId={\`box-\${props.item.id}\`}
            animate={{
                rotate: props.index === 0 ? -12 : props.index === 2 ? 12 : undefined,
            }}
            style={{
                gridRow: 1,
                gridColumn: 1,
                backgroundColor: props.item.bg,
            }}
        >
            <img src={props.item.img} alt={\`Gallery item \${props.item.id}\`} className="w-full h-full object-cover" />
        </motion.div>
    );
};

const HoverGallery = ({
    stackedImages = defaultStackedImages,
    bottomImage = defaultBottomImage,
    width = "420px",
    height = "450px",
    className,
}: HoverGalleryProps) => {
    const [isHovering, setIsHovering] = useState(false);
    
    const items = [
        {
            elements: stackedImages,
        },
    ];

    const allElements = items.flatMap((column) => column.elements);

    const elements = [
        ...allElements,
        bottomImage,
    ];

    return (
        <div className={cn("w-full h-full flex items-center justify-center", className)}>
            <motion.div
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="rounded-[30px] px-4 py-5 relative overflow-hidden bg-card border border-border/50"
                style={{ width, height }}
            >
                <motion.div
                    className="w-full h-full gap-2 flex flex-col items-start justify-center"
                    layout
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                    {items.map((column, index) => (
                        <motion.div
                            className={cn(
                                "flex flex-col items-center justify-center gap-10 w-full h-full"
                            )}
                            key={index}
                            layout
                            animate={{
                                opacity: isHovering ? 0 : 1,
                                willChange: "auto",
                            }}
                        >
                            <div className="rounded-2xl cursor-pointer grid place-items-center flex-[2] w-full">
                                {column.elements.map((item, index) => (
                                    <Gallery item={item} index={index} key={index} />
                                ))}
                            </div>
                            <motion.div
                                className={cn(
                                    "rounded-2xl cursor-pointer flex items-center justify-center overflow-hidden flex-1 w-full h-full"
                                )}
                                layoutId={\`box-\${bottomImage.id}\`}
                            >
                                <img
                                    src={bottomImage.img}
                                    alt={\`Gallery item \${bottomImage.id}\`}
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
                {isHovering && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, willChange: "auto" }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full overflow-hidden"
                    >
                        <AnimatePresence mode="popLayout">
                            <motion.div
                                className="grid grid-cols-2 gap-4 justify-center items-center h-full w-full p-4"
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                {elements.map(({ id, bg, img }, index) => (
                                    <motion.div
                                        key={index}
                                        className={cn(
                                            "rounded-2xl cursor-pointer flex items-center justify-center overflow-hidden h-full"
                                        )}
                                        layoutId={\`box-\${id}\`}
                                    >
                                        <img
                                            src={img}
                                            alt={\`Gallery item \${id}\`}
                                            className="w-full h-full object-cover"
                                        />
                                    </motion.div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default HoverGallery;
export { Gallery };
export type { Element as GalleryItem };`

const indexSource = `export { default as HoverGallery } from './hover-gallery';
export type { HoverGalleryProps, GalleryItem } from './hover-gallery';`

const sourceFiles = [
    { filename: 'hover-gallery.tsx', code: componentSource, language: 'tsx' },
    { filename: 'index.tsx', code: indexSource, language: 'tsx' },
]

// Custom items for preview
const stackedImages = [
    { id: 1, bg: "#22c55e", img: "/albums/blonde.png" },
    { id: 2, bg: "#ef4444", img: "/images/college-dropout.jpg" },
    { id: 3, bg: "#eab308", img: "/images/graduation.jpg" },
]

const bottomImage = { id: 4, bg: "#3b82f6", img: "/images/mbdtf.jpg" }

export default function HoverGalleryPage() {
    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">
                    Components / Hover Gallery
                </div>
                <h1 className="font-serif text-4xl tracking-tight">Hover Gallery</h1>
                <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                    An interactive image gallery with smooth layout animations. Images are stacked
                    by default and expand into a 2x2 grid on hover with beautiful transitions.
                </p>
            </div>


            {/* Live Preview */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Preview</h2>
                <p className="text-sm text-muted-foreground">
                    Hover over the gallery to see the images expand into a grid layout.
                </p>
                <ComponentPreview className="min-h-[480px] p-4">
                    <HoverGallery
                        stackedImages={stackedImages}
                        bottomImage={bottomImage}
                        width="420px"
                        height="450px"
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
                                <td className="py-2 pr-4 font-mono text-xs">stackedImages</td>
                                <td className="py-2 pr-4 font-mono text-xs">Element[]</td>
                                <td className="py-2 pr-4 font-mono text-xs">defaultStackedImages</td>
                                <td className="py-2">First 3 images for stacked view</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 pr-4 font-mono text-xs">bottomImage</td>
                                <td className="py-2 pr-4 font-mono text-xs">Element</td>
                                <td className="py-2 pr-4 font-mono text-xs">defaultBottomImage</td>
                                <td className="py-2">4th image shown at bottom</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 pr-4 font-mono text-xs">width</td>
                                <td className="py-2 pr-4 font-mono text-xs">string</td>
                                <td className="py-2 pr-4 font-mono text-xs">&quot;420px&quot;</td>
                                <td className="py-2">Container width (CSS value)</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 pr-4 font-mono text-xs">height</td>
                                <td className="py-2 pr-4 font-mono text-xs">string</td>
                                <td className="py-2 pr-4 font-mono text-xs">&quot;450px&quot;</td>
                                <td className="py-2">Container height (CSS value)</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 pr-4 font-mono text-xs">className</td>
                                <td className="py-2 pr-4 font-mono text-xs">string</td>
                                <td className="py-2 pr-4 font-mono text-xs">-</td>
                                <td className="py-2">Custom class for wrapper</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Element Type */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Element Type</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b">
                                <th className="py-2 pr-4 text-left font-medium">Property</th>
                                <th className="py-2 pr-4 text-left font-medium">Type</th>
                                <th className="py-2 text-left font-medium">Description</th>
                            </tr>
                        </thead>
                        <tbody className="text-muted-foreground">
                            <tr className="border-b">
                                <td className="py-2 pr-4 font-mono text-xs">id</td>
                                <td className="py-2 pr-4 font-mono text-xs">number</td>
                                <td className="py-2">Unique identifier for layout animations</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 pr-4 font-mono text-xs">bg</td>
                                <td className="py-2 pr-4 font-mono text-xs">string</td>
                                <td className="py-2">Background color (fallback)</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 pr-4 font-mono text-xs">img</td>
                                <td className="py-2 pr-4 font-mono text-xs">string</td>
                                <td className="py-2">Image source URL</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Features */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Features</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Smooth layout animations powered by Framer Motion</li>
                    <li>Stacked card view with rotation effects (-12°, 0°, +12°)</li>
                    <li>2x2 grid expansion on hover</li>
                    <li>Shared <code className="text-xs bg-muted px-1 py-0.5 rounded">layoutId</code> for seamless transitions</li>
                    <li>Customizable container dimensions</li>
                    <li>Theme-aware with card and border styling</li>
                    <li>Background color fallback for images</li>
                </ul>
            </section>

            {/* Animation Logic */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Animation Logic</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Default state: 3 cards stacked with rotation + 1 at bottom</li>
                    <li>On hover: Stacked view fades out (opacity 0)</li>
                    <li>Grid view fades in with <code className="text-xs bg-muted px-1 py-0.5 rounded">layoutId</code> transition</li>
                    <li>Cards animate from their stacked positions to grid positions</li>
                    <li>Uses <code className="text-xs bg-muted px-1 py-0.5 rounded">AnimatePresence</code> with popLayout mode</li>
                </ul>
            </section>

            {/* Dependencies */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Dependencies</h2>
                <CodeBlock
                    code="npm install motion"
                    language="bash"
                />
            </section>

            {/* Source Code */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Source Code</h2>
                <CodeBlock files={sourceFiles} />
            </section>
        </div>
    )
}
