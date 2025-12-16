"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface CodeFile {
    filename: string
    code: string
    language?: string
}

interface CodeBlockProps {
    code?: string
    language?: string
    filename?: string
    files?: CodeFile[]
    className?: string
}

export function CodeBlock({
    code,
    language = "tsx",
    filename,
    files,
    className
}: CodeBlockProps) {
    const [copied, setCopied] = React.useState(false)
    const [activeTab, setActiveTab] = React.useState(0)

    // Normalize to files array for consistent handling
    const normalizedFiles: CodeFile[] = files || [{
        filename: filename || "code",
        code: code || "",
        language
    }]

    const activeFile = normalizedFiles[activeTab]
    const hasMultipleFiles = normalizedFiles.length > 1

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(activeFile.code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className={cn("group relative overflow-hidden border border-foreground/10", className)}>
            {/* Header with tabs */}
            <div className="flex items-center justify-between border-b border-foreground/5 bg-foreground/[0.02]">
                <div className="flex items-center">
                    {hasMultipleFiles ? (
                        // Tabbed interface for multiple files
                        <div className="flex">
                            {normalizedFiles.map((file, index) => (
                                <button
                                    key={file.filename}
                                    onClick={() => setActiveTab(index)}
                                    className={cn(
                                        "relative px-4 py-2 text-xs transition-colors",
                                        activeTab === index
                                            ? "text-foreground"
                                            : "text-muted-foreground hover:text-foreground/70"
                                    )}
                                >
                                    {file.filename}
                                    {activeTab === index && (
                                        <span className="absolute bottom-0 left-0 right-0 h-px bg-foreground" />
                                    )}
                                </button>
                            ))}
                        </div>
                    ) : (
                        // Single file header
                        <div className="flex items-center gap-3 px-4 py-2">
                            {filename && (
                                <span className="text-xs text-muted-foreground">{filename}</span>
                            )}
                            <span className="text-[10px] uppercase tracking-wider text-muted-foreground/50">
                                {language}
                            </span>
                        </div>
                    )}
                </div>

                {/* Language tag for multi-file + copy button */}
                <div className="flex items-center gap-2 pr-2">
                    {hasMultipleFiles && (
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground/50">
                            {activeFile.language || language}
                        </span>
                    )}
                    <Button
                        variant="ghost"
                        size="icon-xs"
                        onClick={copyToClipboard}
                        className="opacity-0 transition-opacity group-hover:opacity-100"
                    >
                        {copied ? (
                            <Check className="h-3 w-3 text-emerald-500" />
                        ) : (
                            <Copy className="h-3 w-3" />
                        )}
                    </Button>
                </div>
            </div>

            {/* Code */}
            <div className="overflow-x-auto bg-foreground/[0.01] p-4">
                <pre className="font-mono text-[13px] leading-relaxed">
                    <code className="text-foreground/90">{activeFile.code}</code>
                </pre>
            </div>
        </div>
    )
}
