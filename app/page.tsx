import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Header */}
      <header className="absolute left-0 right-0 top-0 z-50">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-6">
          <span className="font-serif text-lg">fern—ui</span>
          <ThemeToggle />
        </div>
      </header>

      {/* Subtle grid pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--foreground)/0.02)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground)/0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Gradient orbs */}
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-foreground/5 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-96 w-96 translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-tl from-foreground/3 to-transparent blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 border border-foreground/10 bg-foreground/5 px-3 py-1.5 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-500" />
          Open Source UI Library
        </div>

        {/* Main heading */}
        <h1 className="text-center font-serif text-6xl tracking-tight sm:text-7xl lg:text-8xl">
          fern<span className="text-muted-foreground/50">—</span>ui
        </h1>

        {/* Tagline */}
        <p className="mt-6 max-w-md text-center text-sm leading-relaxed text-muted-foreground">
          A minimal, elegant component library for building beautiful interfaces.
          Copy. Paste. Ship.
        </p>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="group gap-2 px-6">
            <Link href="/explore">
              Explore Components
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
