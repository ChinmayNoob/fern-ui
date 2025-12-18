"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, Box, ChevronLeft, Diamond, Disc3, FlipVertical, Gamepad2, GalleryHorizontalEnd, GripHorizontal, Image, Layers, Menu, MousePointerClick, RotateCcw, Sparkles, Tag, Users, X, Zap } from "lucide-react"

import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/ui/theme-toggle"

type SidebarItem = {
    name: string
    href: string
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
    badge?: string
}

type SidebarSection = {
    title: string
    items: SidebarItem[]
}

const sidebarItems: SidebarSection[] = [
    {
        title: "Overview",
        items: [
            { name: "Getting Started", href: "/explore", icon: BookOpen },
        ],
    },
    {
        title: "Components",
        items: [
            { name: "Album Cards", href: "/explore/album-cards", icon: Disc3, badge: "New" },
            { name: "Animated Image", href: "/explore/animated-image", icon: Image, badge: "New" },
            { name: "Artist List", href: "/explore/artist-list", icon: Users },
            { name: "Diamond Gallery", href: "/explore/diamond-gallery", icon: Diamond, badge: "New" },
            { name: "Draggable Cards", href: "/explore/draggable-cards", icon: GripHorizontal },
            { name: "Hover Disclosure", href: "/explore/hover-disclosure", icon: Layers },
            { name: "Hover Flip Card", href: "/explore/hover-flip-card", icon: Sparkles },
            { name: "Hover Gallery", href: "/explore/hover-gallery", icon: GalleryHorizontalEnd },
            { name: "HoverBox Effect", href: "/explore/hoverbox-effect", icon: RotateCcw },
            { name: "Shiny Wrap", href: "/explore/shiny-wrap", icon: Sparkles, badge: "New" },
            { name: "Spider Button", href: "/explore/spider-button", icon: Zap, badge: "New" },
            { name: "Splitflap", href: "/explore/splitflap", icon: FlipVertical, badge: "New" },
            { name: "SVG Filters", href: "/explore/svg-filters", icon: Image },
            { name: "Tilt Card", href: "/explore/tilt-card", icon: MousePointerClick, badge: "New" },
            { name: "Valorant Button", href: "/explore/valorant-button", icon: Gamepad2, badge: "New" },
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
                                                <span className="flex items-center gap-1">
                                                    <span>{item.name}</span>
                                                    {item.badge && (
                                                        <span className="rounded-full border border-foreground/10 bg-foreground/5 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-widest text-muted-foreground">
                                                            {item.badge}
                                                        </span>
                                                    )}
                                                </span>
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
                                                    <span className="flex items-center gap-1">
                                                        <span>{item.name}</span>
                                                        {item.badge && (
                                                            <span className="rounded-full border border-foreground/10 bg-foreground/5 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-widest text-muted-foreground">
                                                                {item.badge}
                                                            </span>
                                                        )}
                                                    </span>
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

