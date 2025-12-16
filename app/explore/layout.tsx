"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, Box, ChevronLeft, Layers, MousePointerClick, Sparkles, Tag } from "lucide-react"

import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/ui/theme-toggle"

const sidebarItems = [
    {
        title: "Overview",
        items: [
            { name: "Getting Started", href: "/explore", icon: BookOpen },
        ],
    },
    {
        title: "Components",
        items: [
            { name: "Button", href: "/explore/button", icon: MousePointerClick },
            { name: "Card", href: "/explore/card", icon: Layers },
            { name: "Badge", href: "/explore/badge", icon: Tag },
            { name: "Hero Section", href: "/explore/hero-section", icon: Sparkles },
        ],
    },
]

export default function ExploreLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b border-foreground/5 bg-background/80 backdrop-blur-sm">
                <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <ChevronLeft className="h-4 w-4" />
                        <span className="font-serif text-lg text-foreground">fern—ui</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                            <Box className="h-3.5 w-3.5" />
                            Components
                        </div>
                        <ThemeToggle />
                    </div>
                </div>
            </header>

            <div className="mx-auto flex max-w-7xl">
                {/* Sidebar */}
                <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-64 shrink-0 overflow-y-auto border-r border-foreground/5 lg:block">
                    <nav className="p-6">
                        {sidebarItems.map((section) => (
                            <div key={section.title} className="mb-8">
                                <h4 className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">
                                    {section.title}
                                </h4>
                                <ul className="space-y-1">
                                    {section.items.map((item) => {
                                        const isActive = pathname === item.href
                                        return (
                                            <li key={item.href}>
                                                <Link
                                                    href={item.href}
                                                    className={cn(
                                                        "flex items-center gap-2.5 px-3 py-2 text-sm transition-all",
                                                        isActive
                                                            ? "bg-foreground/5 text-foreground"
                                                            : "text-muted-foreground hover:bg-foreground/[0.02] hover:text-foreground"
                                                    )}
                                                >
                                                    <item.icon className="h-4 w-4" />
                                                    {item.name}
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        ))}
                    </nav>
                </aside>

                {/* Mobile nav */}
                <div className="sticky top-14 z-40 w-full border-b border-foreground/5 bg-background/80 backdrop-blur-sm lg:hidden">
                    <nav className="flex gap-1 overflow-x-auto p-3">
                        {sidebarItems.flatMap((section) =>
                            section.items.map((item) => {
                                const isActive = pathname === item.href
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "flex shrink-0 items-center gap-1.5 px-3 py-1.5 text-xs transition-all",
                                            isActive
                                                ? "bg-foreground/5 text-foreground"
                                                : "text-muted-foreground hover:text-foreground"
                                        )}
                                    >
                                        <item.icon className="h-3.5 w-3.5" />
                                        {item.name}
                                    </Link>
                                )
                            })
                        )}
                    </nav>
                </div>

                {/* Main content */}
                <main className="flex-1 px-6 py-10 lg:px-12">
                    <div className="mx-auto max-w-3xl">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}

