import { DraggableCards, demoDraggableCards } from "@/components/draggable-cards/draggable-cards"
import { CodeBlock } from "@/components/ui/code-block"
import { ComponentPreview } from "@/components/ui/component-preview"

const usageCode = `import { DraggableCards, DraggableCardItem } from "@/components/ui/draggable-cards"

const cards: DraggableCardItem[] = [
  {
    id: "card-1",
    src: "/albums/cover.png",
    alt: "Album Cover",
    top: "20%",
    left: "30%",
    rotate: "6deg",
    width: "w-56",       // Desktop width
    mobileWidth: "w-28", // Mobile width
  },
  // ... more cards
]

export function Example() {
  return (
    <DraggableCards
      cards={cards}
      title="My Gallery"
      accentColor="text-orange-500"
    />
  )
}`

const sourceCode = `
"use client";

import { motion } from "motion/react";
import { RefObject, useRef, useState, useEffect, useCallback } from "react";

import { cn } from "@/lib/utils";
function useIsMobile(breakpoint = 768) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < breakpoint);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, [breakpoint]);

    return isMobile;
}

export interface DraggableCardItem {
    id: string;
    src: string;
    alt: string;
    top: string;
    left: string;
    rotate: string;
    width?: string;
    mobileWidth?: string;
}

interface DraggableCardsProps {
    cards: DraggableCardItem[];
    title?: string;
    accentColor?: string;
    className?: string;
    cardsContainerClassName?: string;
}

export function DraggableCards({
    cards,
    title,
    accentColor = "text-orange-500",
    className,
    cardsContainerClassName,
}: DraggableCardsProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const isMobile = useIsMobile();

    return (
        <section
            className={cn(
                "relative grid min-h-[500px] w-full place-content-center overflow-hidden bg-background md:min-h-screen",
                className
            )}
        >
            {title && (
                <h1 className="pointer-events-none relative z-0 select-none text-center text-[12vw] font-black text-muted-foreground/50 md:text-[80px] lg:text-[100px]">
                    {title}
                    <span className={accentColor}>.</span>
                </h1>
            )}
            <div
                ref={containerRef}
                className={cn("absolute inset-0 z-10", cardsContainerClassName)}
            >
                {cards.map((card) => (
                    <DraggableCard
                        key={card.id}
                        containerRef={containerRef}
                        src={card.src}
                        alt={card.alt}
                        rotate={card.rotate}
                        top={card.top}
                        left={card.left}
                        className={cn(
                            isMobile ? (card.mobileWidth || "w-24") : (card.width || "w-48")
                        )}
                    />
                ))}
            </div>
        </section>
    );
}

type DraggableCardProps = {
    containerRef: RefObject<HTMLDivElement | null>;
    src: string;
    alt: string;
    top: string;
    left: string;
    rotate: string;
    className?: string;
};

function DraggableCard({
    containerRef,
    src,
    alt,
    top,
    left,
    rotate,
    className,
}: DraggableCardProps) {
    const [zIndex, setZIndex] = useState(0);

    const updateZIndex = useCallback(() => {
        const elements = document.querySelectorAll(".draggable-card-item");
        let maxZIndex = -Infinity;

        elements.forEach((el) => {
            const currentZIndex = parseInt(
                window.getComputedStyle(el).getPropertyValue("z-index")
            );

            if (!isNaN(currentZIndex) && currentZIndex > maxZIndex) {
                maxZIndex = currentZIndex;
            }
        });

        setZIndex(maxZIndex + 1);
    }, []);

    return (
        <motion.img
            onMouseDown={updateZIndex}
            onTouchStart={updateZIndex}
            src={src}
            alt={alt}
            drag
            dragConstraints={containerRef}
            dragElastic={0.65}
            whileDrag={{ scale: 1.05 }}
            whileHover={{ scale: 1.02 }}
            className={cn(
                "draggable-card-item absolute cursor-grab bg-card p-1 pb-4 shadow-lg ring-1 ring-foreground/10 transition-shadow hover:shadow-xl active:cursor-grabbing dark:ring-foreground/20",
                className
            )}
            style={{
                top,
                left,
                rotate,
                zIndex,
            }}
        />
    );
}`

export default function DraggableCardsPage() {
    return (
        <div className="space-y-16">
            {/* Header */}
            <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">
                    Components / Draggable Cards
                </div>
                <h1 className="font-serif text-4xl tracking-tight">Draggable Cards</h1>
                <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                    A fun, interactive scattered photo gallery with draggable polaroid-style cards.
                    Each card can be dragged freely within the container with elastic constraints.
                    Cards automatically stack on top when clicked. Fully responsive with separate
                    desktop and mobile sizing.
                </p>
            </div>

            {/* Preview */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Preview</h2>
                <ComponentPreview className="min-h-[600px] p-0 overflow-hidden">
                    <DraggableCards
                        cards={demoDraggableCards}
                        title="Fern UI"
                        className="min-h-[600px] md:min-h-[600px]"
                    />
                </ComponentPreview>
                <p className="text-xs text-muted-foreground">
                    <strong>Tip:</strong> Click and drag the cards to move them around.
                    Cards stack on top when interacted with.
                </p>
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
                                <td className="px-4 py-3 font-mono text-xs">cards</td>
                                <td className="px-4 py-3 text-muted-foreground">DraggableCardItem[]</td>
                                <td className="px-4 py-3 text-muted-foreground">Array of card objects to display</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-mono text-xs">title</td>
                                <td className="px-4 py-3 text-muted-foreground">string?</td>
                                <td className="px-4 py-3 text-muted-foreground">Optional title text displayed in center</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-mono text-xs">accentColor</td>
                                <td className="px-4 py-3 text-muted-foreground">string?</td>
                                <td className="px-4 py-3 text-muted-foreground">Tailwind color class for title dot (default: text-orange-500)</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-mono text-xs">className</td>
                                <td className="px-4 py-3 text-muted-foreground">string?</td>
                                <td className="px-4 py-3 text-muted-foreground">Additional CSS classes for the container</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-mono text-xs">cardsContainerClassName</td>
                                <td className="px-4 py-3 text-muted-foreground">string?</td>
                                <td className="px-4 py-3 text-muted-foreground">Additional CSS classes for the cards wrapper</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3 className="mt-8 text-base font-medium">DraggableCardItem Type</h3>
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
                                <td className="px-4 py-3 font-mono text-xs">id</td>
                                <td className="px-4 py-3 text-muted-foreground">string</td>
                                <td className="px-4 py-3 text-muted-foreground">Unique identifier for the card</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-mono text-xs">src</td>
                                <td className="px-4 py-3 text-muted-foreground">string</td>
                                <td className="px-4 py-3 text-muted-foreground">Image source path</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-mono text-xs">alt</td>
                                <td className="px-4 py-3 text-muted-foreground">string</td>
                                <td className="px-4 py-3 text-muted-foreground">Alt text for accessibility</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-mono text-xs">top</td>
                                <td className="px-4 py-3 text-muted-foreground">string</td>
                                <td className="px-4 py-3 text-muted-foreground">CSS top position (e.g., &quot;20%&quot;, &quot;100px&quot;)</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-mono text-xs">left</td>
                                <td className="px-4 py-3 text-muted-foreground">string</td>
                                <td className="px-4 py-3 text-muted-foreground">CSS left position (e.g., &quot;30%&quot;, &quot;50px&quot;)</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-mono text-xs">rotate</td>
                                <td className="px-4 py-3 text-muted-foreground">string</td>
                                <td className="px-4 py-3 text-muted-foreground">CSS rotation (e.g., &quot;6deg&quot;, &quot;-12deg&quot;)</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-mono text-xs">width</td>
                                <td className="px-4 py-3 text-muted-foreground">string?</td>
                                <td className="px-4 py-3 text-muted-foreground">Desktop width class (default: &quot;w-48&quot;)</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-mono text-xs">mobileWidth</td>
                                <td className="px-4 py-3 text-muted-foreground">string?</td>
                                <td className="px-4 py-3 text-muted-foreground">Mobile width class (default: &quot;w-24&quot;)</td>
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
                        <span><strong className="text-foreground">Draggable</strong> — Each card can be freely dragged with elastic constraints</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground/40" />
                        <span><strong className="text-foreground">Auto-stacking</strong> — Cards automatically come to front when interacted with</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground/40" />
                        <span><strong className="text-foreground">Responsive</strong> — Separate desktop and mobile sizing for each card</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground/40" />
                        <span><strong className="text-foreground">Touch support</strong> — Full touch gesture support for mobile devices</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground/40" />
                        <span><strong className="text-foreground">Theme aware</strong> — Adapts to both light and dark themes</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground/40" />
                        <span><strong className="text-foreground">Hover effects</strong> — Subtle scale animations on hover and drag</span>
                    </li>
                </ul>
            </section>

            {/* Dependencies */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Dependencies</h2>
                <p className="text-sm text-muted-foreground">
                    This component requires the{" "}
                    <code className="bg-foreground/5 px-1.5 py-0.5 text-xs">motion/react</code> library
                    for drag animations. Install it with:
                </p>
                <CodeBlock code="pnpm add motion" language="bash" />
            </section>

            {/* Source */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Source Code</h2>
                <p className="text-sm text-muted-foreground">
                    Copy this into your{" "}
                    <code className="bg-foreground/5 px-1.5 py-0.5 text-xs">components/ui/</code> folder.
                </p>
                <CodeBlock code={sourceCode} language="tsx" filename="draggable-cards.tsx" />
            </section>
        </div>
    )
}

