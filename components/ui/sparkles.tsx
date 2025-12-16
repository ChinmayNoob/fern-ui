"use client"

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
                        left: `${sparkle.x}%`,
                        top: `${sparkle.y}%`,
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
}

