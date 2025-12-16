import * as React from "react"
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
}

