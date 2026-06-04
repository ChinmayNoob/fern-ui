"use client"

import * as React from "react"
import { Check, Copy, Terminal } from "lucide-react"
import { cn } from "@/lib/utils"

interface InstallCommandProps {
    command: string
    className?: string
}

export function InstallCommand({ command, className }: InstallCommandProps) {
    const [copied, setCopied] = React.useState(false)

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(command)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className={cn("relative flex items-center border border-foreground/10", className)}>
            <div className="flex items-center gap-2 px-4 py-3 text-muted-foreground">
                <Terminal className="h-3.5 w-3.5 shrink-0" />
                <code className="font-mono text-[13px] text-foreground/90">{command}</code>
            </div>
            <button
                onClick={copyToClipboard}
                className="absolute right-2 flex h-7 w-7 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Copy command"
            >
                {copied ? (
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                ) : (
                    <Copy className="h-3.5 w-3.5" />
                )}
            </button>
        </div>
    )
}
