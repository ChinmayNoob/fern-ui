import { Badge } from "@/components/ui/badge"
import { CodeBlock } from "@/components/ui/code-block"
import { ComponentPreview } from "@/components/ui/component-preview"

const usageCode = `import { Badge } from "@/components/ui/badge"

export function Example() {
  return <Badge>New</Badge>
}`

const variantsCode = `<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>`

const sourceCode = `import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        outline: "border-border bg-transparent text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }`

export default function BadgePage() {
    return (
        <div className="space-y-16">
            {/* Header */}
            <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">
                    Components / Badge
                </div>
                <h1 className="font-serif text-4xl tracking-tight">Badge</h1>
                <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                    A small, inline label component for displaying status indicators, tags,
                    or counts. Perfect for highlighting new features or important information.
                </p>
            </div>

            {/* Preview */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Preview</h2>
                <ComponentPreview>
                    <div className="flex flex-wrap items-center gap-3">
                        <Badge>Default</Badge>
                        <Badge variant="secondary">Secondary</Badge>
                        <Badge variant="outline">Outline</Badge>
                    </div>
                </ComponentPreview>
            </section>

            {/* Usage */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Usage</h2>
                <CodeBlock code={usageCode} language="tsx" />
            </section>

            {/* Variants */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Variants</h2>
                <p className="text-sm text-muted-foreground">
                    The badge supports 3 different variants for various use cases.
                </p>
                <ComponentPreview>
                    <div className="flex flex-wrap items-center gap-3">
                        <Badge variant="default">Default</Badge>
                        <Badge variant="secondary">Secondary</Badge>
                        <Badge variant="outline">Outline</Badge>
                    </div>
                </ComponentPreview>
                <CodeBlock code={variantsCode} language="tsx" />
            </section>

            {/* Examples */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Examples</h2>
                <p className="text-sm text-muted-foreground">
                    Common use cases for badges in interfaces.
                </p>
                <ComponentPreview>
                    <div className="flex flex-col items-start gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">New Feature</span>
                            <Badge>New</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Status</span>
                            <Badge variant="secondary">Active</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Version</span>
                            <Badge variant="outline">v1.0.0</Badge>
                        </div>
                    </div>
                </ComponentPreview>
            </section>

            {/* Source */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Source Code</h2>
                <p className="text-sm text-muted-foreground">
                    Copy this into <code className="bg-foreground/5 px-1.5 py-0.5 text-xs">components/ui/badge.tsx</code>
                </p>
                <CodeBlock code={sourceCode} language="tsx" filename="components/ui/badge.tsx" />
            </section>
        </div>
    )
}

