import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Github } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Feather } from "@/components/ui/feather"



export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Header */}
      <header className="absolute left-0 right-0 top-0 z-50">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Image
              src="/vector.png"
              alt="fern-ui logo"
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />
            <span className="font-serif text-lg">fern—ui</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Subtle grid pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--foreground)/0.02)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground)/0.02)_1px,transparent_1px)] bg-size-[4rem_4rem]" />

      {/* Purple/violet gradient smoke */}
      <div className="pointer-events-none absolute -left-20 top-1/4 h-[600px] w-[600px] rounded-full bg-linear-to-br from-violet-500/20 via-purple-500/15 to-transparent blur-3xl dark:from-violet-500/30 dark:via-purple-600/20" />
      <div className="pointer-events-none absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full bg-linear-to-tl from-purple-600/15 via-violet-400/10 to-transparent blur-3xl dark:from-purple-500/25 dark:via-violet-500/15" />
      <div className="pointer-events-none absolute -bottom-20 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-linear-to-t from-violet-500/15 via-purple-400/10 to-transparent blur-3xl dark:from-violet-400/20 dark:via-purple-500/15" />

      {/* Blue/cyan gradient smoke */}
      <div className="pointer-events-none absolute right-1/4 top-1/4 h-[350px] w-[350px] rounded-full bg-linear-to-bl from-cyan-500/10 via-blue-500/8 to-transparent blur-3xl dark:from-cyan-400/15 dark:via-blue-500/12" />
      <div className="pointer-events-none absolute bottom-1/3 left-1/4 h-[300px] w-[300px] rounded-full bg-linear-to-tr from-blue-500/10 via-cyan-400/8 to-transparent blur-3xl dark:from-blue-400/15 dark:via-cyan-500/10" />

      {/* Scattered feathers */}
      <div className="pointer-events-none absolute left-[5%] top-[15%] animate-feather-float opacity-30 dark:opacity-40" style={{ animationDelay: '0s' }}>
        <Feather id="f1" className="w-24 rotate-[-25]" />
      </div>
      <div className="pointer-events-none absolute right-[8%] top-[20%] animate-feather-float opacity-25 dark:opacity-35" style={{ animationDelay: '1.5s' }}>
        <Feather id="f2" className="w-32 rotate-15" />
      </div>
      <div className="pointer-events-none absolute left-[12%] bottom-[25%] animate-feather-float opacity-20 dark:opacity-30" style={{ animationDelay: '3s' }}>
        <Feather id="f3" className="w-20 rotate-[-10]" />
      </div>
      <div className="pointer-events-none absolute right-[15%] bottom-[35%] animate-feather-float opacity-25 dark:opacity-35" style={{ animationDelay: '2s' }}>
        <Feather id="f4" className="w-28 rotate-30" />
      </div>
      <div className="pointer-events-none absolute left-[25%] top-[60%] animate-feather-float opacity-15 dark:opacity-25" style={{ animationDelay: '4s' }}>
        <Feather id="f5" className="w-16 rotate-[-35]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6">
        <div className="mb-8 inline-flex items-center gap-2 border border-foreground/10 bg-foreground/5 px-3 py-1.5 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
          <Link href="https://github.com/fern-ui/fern-ui">
            <Github className="w-4 h-4" />
          </Link>
          Open Source UI Library
        </div>

        <div className="flex items-center justify-center">
          <Image
            src="/vector.png"
            alt="fern-ui logo"
            width={80}
            height={80}
            className="h-16 w-16 object-contain sm:h-20 sm:w-20 lg:h-24 lg:w-24"
          />
          <h1 className="font-serif text-6xl tracking-tight sm:text-7xl lg:text-8xl">
            fern<span className="text-muted-foreground/50">—</span>ui
          </h1>
        </div>

        <p className="mt-6 max-w-md text-center text-sm leading-relaxed text-muted-foreground">
          A minimal, elegant component library for building beautiful interfaces.
          Copy. Paste. Ship.
        </p>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="group gap-2 px-6 bg-purple-500 text-white hover:bg-violet-600 font-bold">
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
