"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"

export function ThemeToggle({ className }: { className?: string }) {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <button className={cn("h-8 w-8", className)} aria-label="Toggle theme">
                <span className="sr-only">Toggle theme</span>
            </button>
        )
    }

    const isDark = theme === "dark"

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={cn(
                "group relative flex h-8 w-8 items-center justify-center transition-colors hover:text-foreground",
                "text-muted-foreground",
                className
            )}
            aria-label="Toggle theme"
        >
            <Sun
                className={cn(
                    "h-4 w-4 transition-all duration-300",
                    isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
                )}
            />
            <Moon
                className={cn(
                    "absolute h-4 w-4 transition-all duration-300",
                    isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
                )}
            />
            <span className="sr-only">Toggle theme</span>
        </button>
    )
}
