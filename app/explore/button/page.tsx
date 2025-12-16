import { Button } from "@/components/ui/button"
import { CodeBlock } from "@/components/ui/code-block"
import { ComponentPreview } from "@/components/ui/component-preview"

const usageCode = `import { Button } from "@/components/ui/button"

export function Example() {
  return <Button>Click me</Button>
}`

const variantsCode = `<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="link">Link</Button>`

const sizesCode = `<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>`

const sourceCode = `import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "focus-visible:border-ring focus-visible:ring-ring/50 rounded-none border border-transparent bg-clip-padding text-xs font-medium focus-visible:ring-1 [&_svg:not([class*='size-'])]:size-4 inline-flex items-center justify-center whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none group/button select-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        outline: "border-border bg-background hover:bg-muted hover:text-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-muted hover:text-foreground",
        destructive: "bg-destructive/10 hover:bg-destructive/20 text-destructive",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-8 gap-1.5 px-2.5",
        xs: "h-6 gap-1 px-2 text-xs",
        sm: "h-7 gap-1 px-2.5",
        lg: "h-9 gap-1.5 px-2.5",
        icon: "size-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }`

export default function ButtonPage() {
    return (
        <div className="space-y-16">
            {/* Header */}
            <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">
                    Components / Button
                </div>
                <h1 className="font-serif text-4xl tracking-tight">Button</h1>
                <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                    A versatile button component with multiple variants and sizes. Built with
                    class-variance-authority for type-safe styling.
                </p>
            </div>

            {/* Preview */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Preview</h2>
                <ComponentPreview>
                    <div className="flex flex-wrap items-center gap-3">
                        <Button>Default</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="ghost">Ghost</Button>
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
                    The button supports 6 different variants for various use cases.
                </p>
                <ComponentPreview>
                    <div className="flex flex-wrap items-center gap-3">
                        <Button variant="default">Default</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="destructive">Destructive</Button>
                        <Button variant="link">Link</Button>
                    </div>
                </ComponentPreview>
                <CodeBlock code={variantsCode} language="tsx" />
            </section>

            {/* Sizes */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Sizes</h2>
                <p className="text-sm text-muted-foreground">
                    Available in 4 sizes to fit different contexts.
                </p>
                <ComponentPreview>
                    <div className="flex flex-wrap items-center gap-3">
                        <Button size="xs">Extra Small</Button>
                        <Button size="sm">Small</Button>
                        <Button size="default">Default</Button>
                        <Button size="lg">Large</Button>
                    </div>
                </ComponentPreview>
                <CodeBlock code={sizesCode} language="tsx" />
            </section>

            {/* Source */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Source Code</h2>
                <p className="text-sm text-muted-foreground">
                    Copy this into <code className="bg-foreground/5 px-1.5 py-0.5 text-xs">components/ui/button.tsx</code>
                </p>
                <CodeBlock code={sourceCode} language="tsx" filename="components/ui/button.tsx" />
            </section>
        </div>
    )
}

