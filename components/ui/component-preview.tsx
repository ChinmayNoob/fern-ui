"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface ComponentPreviewProps {
    children: React.ReactNode
    className?: string
}

export function ComponentPreview({ children, className }: ComponentPreviewProps) {
    return (
        <div
            className={cn(
                "relative flex min-h-[200px] items-center justify-center border border-foreground/10 bg-[linear-gradient(45deg,hsl(var(--foreground)/0.02)_25%,transparent_25%,transparent_75%,hsl(var(--foreground)/0.02)_75%),linear-gradient(45deg,hsl(var(--foreground)/0.02)_25%,transparent_25%,transparent_75%,hsl(var(--foreground)/0.02)_75%)] bg-[length:20px_20px] bg-[position:0_0,10px_10px] p-8",
                className
            )}
        >
            {children}
        </div>
    )
}

