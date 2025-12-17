"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, Box, ChevronLeft, Disc3, Layers, Menu, MousePointerClick, Sparkles, Tag, Users, X } from "lucide-react"

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
            { name: "Album Cards", href: "/explore/album-cards", icon: Disc3 },
            { name: "Artist List", href: "/explore/artist-list", icon: Users },
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
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false)
    }, [pathname])

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [mobileMenuOpen])

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b border-foreground/5 bg-background/80 backdrop-blur-sm">
                <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
                    <div className="flex items-center gap-2">
                        {/* Mobile menu button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="flex h-9 w-9 items-center justify-center text-muted-foreground transition-colors hover:text-foreground lg:hidden"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? (
                                <X className="h-5 w-5" />
                            ) : (
                                <Menu className="h-5 w-5" />
                            )}
                        </button>
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                            <ChevronLeft className="hidden h-4 w-4 sm:block" />
                            <span className="font-serif text-lg text-foreground">fern—ui</span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden items-center gap-1 text-[11px] uppercase tracking-wider text-muted-foreground sm:flex">
                            <Box className="h-3.5 w-3.5" />
                            Components
                        </div>
                        <ThemeToggle />
                    </div>
                </div>
            </header>

            {/* Mobile menu overlay */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Mobile menu drawer */}
            <aside
                className={cn(
                    "fixed left-0 top-14 z-50 h-[calc(100vh-3.5rem)] w-72 transform border-r border-foreground/5 bg-background transition-transform duration-300 ease-in-out lg:hidden",
                    mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <nav className="h-full overflow-y-auto p-6">
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
                                                    "flex items-center gap-2.5 px-3 py-2.5 text-sm transition-all",
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

            <div className="mx-auto flex max-w-7xl">
                {/* Desktop Sidebar */}
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

                {/* Main content */}
                <main className="min-w-0 flex-1 px-4 py-8 sm:px-6 sm:py-10 lg:px-12">
                    <div className="mx-auto max-w-3xl">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}

