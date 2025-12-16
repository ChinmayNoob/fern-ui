import { HeroSection } from "@/components/ui/hero-section"
import { CodeBlock } from "@/components/ui/code-block"
import { ComponentPreview } from "@/components/ui/component-preview"

const usageCode = `import { HeroSection } from "@/components/ui/hero-section"

export function Example() {
  return (
    <HeroSection
      title="Build something"
      highlight="amazing"
      description="A beautiful hero section with animated sparkles."
      primaryAction={{
        label: "Get Started",
        href: "/docs",
      }}
      secondaryAction={{
        label: "Learn More",
        href: "/about",
      }}
    />
  )
}`

// Multi-file source code
const heroSectionSource = `import * as React from "react"
import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sparkles } from "@/components/ui/sparkles"

interface HeroSectionProps {
  title: string
  highlight?: string
  description: string
  primaryAction?: {
    label: string
    href: string
  }
  secondaryAction?: {
    label: string
    href: string
  }
  className?: string
}

export function HeroSection({
  title,
  highlight,
  description,
  primaryAction,
  secondaryAction,
  className,
}: HeroSectionProps) {
  return (
    <section className={cn("relative py-24 lg:py-32", className)}>
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-foreground/[0.02] to-transparent" />
      
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <h1 className="font-serif text-4xl tracking-tight sm:text-5xl lg:text-6xl">
          {title}{" "}
          {highlight && (
            <Sparkles sparkleColor="hsl(var(--foreground))">
              <span className="text-muted-foreground">{highlight}</span>
            </Sparkles>
          )}
        </h1>
        
        <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        {(primaryAction || secondaryAction) && (
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {primaryAction && (
              <Button asChild size="lg" className="group gap-2">
                <a href={primaryAction.href}>
                  {primaryAction.label}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </Button>
            )}
            {secondaryAction && (
              <Button asChild variant="outline" size="lg">
                <a href={secondaryAction.href}>{secondaryAction.label}</a>
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}`

const sparklesSource = `"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface SparklesProps {
  children: React.ReactNode
  className?: string
  sparkleColor?: string
}

export function Sparkles({ children, className, sparkleColor = "currentColor" }: SparklesProps) {
  const [sparkles, setSparkles] = React.useState<Array<{
    id: number
    x: number
    y: number
    size: number
  }>>([])

  React.useEffect(() => {
    const interval = setInterval(() => {
      const sparkle = {
        id: Date.now(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
      }
      setSparkles((prev) => [...prev.slice(-5), sparkle])
    }, 400)

    return () => clearInterval(interval)
  }, [])

  return (
    <span className={cn("relative inline-block", className)}>
      {sparkles.map((sparkle) => (
        <svg
          key={sparkle.id}
          className="pointer-events-none absolute animate-ping"
          style={{
            left: \`\${sparkle.x}%\`,
            top: \`\${sparkle.y}%\`,
            width: sparkle.size,
            height: sparkle.size,
          }}
          viewBox="0 0 24 24"
          fill={sparkleColor}
        >
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>
      ))}
      {children}
    </span>
  )
}`

const sourceFiles = [
    {
        filename: "hero-section.tsx",
        code: heroSectionSource,
        language: "tsx",
    },
    {
        filename: "sparkles.tsx",
        code: sparklesSource,
        language: "tsx",
    },
]

export default function HeroSectionPage() {
    return (
        <div className="space-y-16">
            {/* Header */}
            <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">
                    Components / Hero Section
                </div>
                <h1 className="font-serif text-4xl tracking-tight">Hero Section</h1>
                <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                    A beautiful hero section component with animated sparkles effect. This component
                    demonstrates how multiple files work together — the HeroSection uses the Sparkles
                    component for the highlight animation.
                </p>
            </div>

            {/* Preview */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Preview</h2>
                <ComponentPreview className="min-h-[350px]">
                    <HeroSection
                        title="Build something"
                        highlight="amazing"
                        description="Create stunning interfaces with minimal, elegant components designed for modern web applications."
                        primaryAction={{
                            label: "Get Started",
                            href: "#",
                        }}
                        secondaryAction={{
                            label: "Learn More",
                            href: "#",
                        }}
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
                                <td className="px-4 py-3 font-mono text-xs">title</td>
                                <td className="px-4 py-3 text-muted-foreground">string</td>
                                <td className="px-4 py-3 text-muted-foreground">Main heading text</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-mono text-xs">highlight</td>
                                <td className="px-4 py-3 text-muted-foreground">string?</td>
                                <td className="px-4 py-3 text-muted-foreground">Text with sparkle animation</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-mono text-xs">description</td>
                                <td className="px-4 py-3 text-muted-foreground">string</td>
                                <td className="px-4 py-3 text-muted-foreground">Subheading paragraph</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-mono text-xs">primaryAction</td>
                                <td className="px-4 py-3 text-muted-foreground">{`{ label, href }?`}</td>
                                <td className="px-4 py-3 text-muted-foreground">Primary CTA button</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-mono text-xs">secondaryAction</td>
                                <td className="px-4 py-3 text-muted-foreground">{`{ label, href }?`}</td>
                                <td className="px-4 py-3 text-muted-foreground">Secondary outline button</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Source - Multi-file tabs */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Source Code</h2>
                <p className="text-sm text-muted-foreground">
                    This component requires 2 files. Copy both into your{" "}
                    <code className="bg-foreground/5 px-1.5 py-0.5 text-xs">components/ui/</code> folder.
                </p>
                <CodeBlock files={sourceFiles} />
            </section>
        </div>
    )
}

