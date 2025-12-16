import Link from "next/link"
import { ArrowRight, Layers, MousePointerClick, Sparkles, Tag } from "lucide-react"

import { CodeBlock } from "@/components/ui/code-block"

const components = [
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
        name: "Badge",
        description: "Small label for status indicators and tags",
        href: "/explore/badge",
        icon: Tag,
    },
    {
        name: "Hero Section",
        description: "Landing page hero with animated sparkles (multi-file example)",
        href: "/explore/hero-section",
        icon: Sparkles,
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
                                <div className="flex h-10 w-10 items-center justify-center bg-foreground/5">
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

