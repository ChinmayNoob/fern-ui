import Link from "next/link"
import {
    ArrowRight,
    Disc3,
    Layers,
    MousePointerClick,
    Sparkles,
    Tag,
    Users,
    Image,
    Diamond,
    GripHorizontal,
    FlipVertical,
    Gamepad2,
    Zap,
    GalleryHorizontalEnd,
    RotateCcw,
} from "lucide-react"

import { CodeBlock } from "@/components/ui/code-block"

const components = [
    {
        name: "Album Cards",
        description: "Expandable album cards with animated lyrics display",
        href: "/explore/album-cards",
        icon: Disc3,
    },
    {
        name: "Animated Image",
        description: "Diamond-shaped image that expands and reveals color on hover",
        href: "/explore/animated-image",
        icon: Image,
    },
    {
        name: "Artist List",
        description: "Interactive artist showcase with hover-activated profiles",
        href: "/explore/artist-list",
        icon: Users,
    },
    {
        name: "Badge",
        description: "Small label for status indicators and tags",
        href: "/explore/badge",
        icon: Tag,
    },
    {
        name: "Button",
        description: "Interactive button with multiple variants and sizes",
        href: "/explore/button",
        icon: MousePointerClick,
    },
    {
        name: "Card",
        description: "Versatile container for grouping related content",
        href: "/explore/card",
        icon: Layers,
    },
    {
        name: "Diamond Gallery",
        description: "Four-image diamond layout with hover focus effects",
        href: "/explore/diamond-gallery",
        icon: Diamond,
    },
    {
        name: "Draggable Cards",
        description: "Polaroid-style draggable album cards",
        href: "/explore/draggable-cards",
        icon: GripHorizontal,
    },
    {
        name: "Hero Section",
        description: "Landing page hero with animated sparkles (multi-file example)",
        href: "/explore/hero-section",
        icon: Sparkles,
    },
    {
        name: "Hover Disclosure",
        description: "Horizontally expanding hover gallery for artists",
        href: "/explore/hover-disclosure",
        icon: Layers,
    },
    {
        name: "Hover Flip Card",
        description: "Card that flips to reveal an image background on hover",
        href: "/explore/hover-flip-card",
        icon: Sparkles,
    },
    {
        name: "Hover Gallery",
        description: "Stacked gallery that expands into a 2x2 grid on hover",
        href: "/explore/hover-gallery",
        icon: GalleryHorizontalEnd,
    },
    {
        name: "HoverBox Effect",
        description: "3D flip effect that reveals back content on hover",
        href: "/explore/hoverbox-effect",
        icon: RotateCcw,
    },
    {
        name: "Shiny Wrap",
        description: "Shimmering highlight wrapper for images and cards",
        href: "/explore/shiny-wrap",
        icon: Sparkles,
    },
    {
        name: "Spider Button",
        description: "Spiderman-themed comic buttons with hover effects",
        href: "/explore/spider-button",
        icon: Zap,
    },
    {
        name: "Splitflap",
        description: "Split-flap display component for dynamic text",
        href: "/explore/splitflap",
        icon: FlipVertical,
    },
    {
        name: "SVG Filters",
        description: "Image hover effects using SVG turbulence and displacement",
        href: "/explore/svg-filters",
        icon: Image,
    },
    {
        name: "Tilt Card",
        description: "Mouse-position-based 3D tilt effect for cards",
        href: "/explore/tilt-card",
        icon: MousePointerClick,
    },
    {
        name: "Valorant Button",
        description: "Valorant-inspired animated button variants",
        href: "/explore/valorant-button",
        icon: Gamepad2,
    },
]

const installCode = `# Install dependencies
pnpm add class-variance-authority clsx tailwind-merge radix-ui lucide-react`

const utilsCode = `// lib/utils.ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`

export default function GettingStartedPage() {
    return (
        <div className="space-y-16">
            {/* Header */}
            <div className="space-y-4">
                <h1 className="font-serif text-4xl tracking-tight">Getting Started</h1>
                <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                    fern-ui is a collection of minimal, accessible components built with React,
                    Tailwind CSS, and Radix UI primitives. Copy the components you need into your project.
                </p>
            </div>

            {/* Installation */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Installation</h2>
                <p className="text-sm text-muted-foreground">
                    Start by installing the required dependencies:
                </p>
                <CodeBlock code={installCode} language="bash" />
            </section>

            {/* Utils */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Utility Function</h2>
                <p className="text-sm text-muted-foreground">
                    Add the <code className="bg-foreground/5 px-1.5 py-0.5 text-xs">cn</code> utility
                    for merging Tailwind classes:
                </p>
                <CodeBlock code={utilsCode} language="typescript" filename="lib/utils.ts" />
            </section>

            {/* Components */}
            <section className="space-y-6">
                <div>
                    <h2 className="text-lg font-medium">Components</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Browse available components below
                    </p>
                </div>

                <div className="grid gap-3">
                    {components.map((component) => (
                        <Link
                            key={component.href}
                            href={component.href}
                            className="group flex items-center justify-between border border-foreground/5 bg-foreground/[0.01] p-4 transition-all hover:border-foreground/10 hover:bg-foreground/[0.02]"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-foreground/10 bg-foreground/5">
                                    <component.icon className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium">{component.name}</h3>
                                    <p className="text-xs text-muted-foreground">
                                        {component.description}
                                    </p>
                                </div>
                            </div>
                            <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    )
}

