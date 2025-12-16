import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { CodeBlock } from "@/components/ui/code-block"
import { ComponentPreview } from "@/components/ui/component-preview"

const usageCode = `import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content here</p>
      </CardContent>
    </Card>
  )
}`

const withFooterCode = `<Card>
  <CardHeader>
    <CardTitle>Subscription</CardTitle>
    <CardDescription>Manage your subscription plan.</CardDescription>
  </CardHeader>
  <CardContent>
    <p>You are currently on the Pro plan.</p>
  </CardContent>
  <CardFooter>
    <Button variant="outline">Cancel</Button>
    <Button className="ml-auto">Upgrade</Button>
  </CardFooter>
</Card>`

const sourceCode = `import * as React from "react"

import { cn } from "@/lib/utils"

function Card({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        "ring-foreground/10 bg-card text-card-foreground gap-4 overflow-hidden rounded-none py-4 text-xs/relaxed ring-1 has-data-[slot=card-footer]:pb-0 data-[size=sm]:gap-2 data-[size=sm]:py-3 group/card flex flex-col",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "gap-1 rounded-none px-4 group-data-[size=sm]/card:px-3 group/card-header grid auto-rows-min items-start",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("text-sm font-medium", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-xs/relaxed", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-4 group-data-[size=sm]/card:px-3", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "rounded-none border-t p-4 group-data-[size=sm]/card:p-3 flex items-center",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
}`

export default function CardPage() {
    return (
        <div className="space-y-16">
            {/* Header */}
            <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">
                    Components / Card
                </div>
                <h1 className="font-serif text-4xl tracking-tight">Card</h1>
                <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                    A flexible container component for grouping related content with optional
                    header, content, and footer sections.
                </p>
            </div>

            {/* Preview */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Preview</h2>
                <ComponentPreview>
                    <Card className="w-full max-w-sm">
                        <CardHeader>
                            <CardTitle>Welcome to fern-ui</CardTitle>
                            <CardDescription>
                                A minimal component library for modern interfaces.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                Build beautiful, accessible components with ease.
                            </p>
                        </CardContent>
                    </Card>
                </ComponentPreview>
            </section>

            {/* Usage */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Usage</h2>
                <CodeBlock code={usageCode} language="tsx" />
            </section>

            {/* With Footer */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">With Footer</h2>
                <p className="text-sm text-muted-foreground">
                    Add a footer section for actions or additional information.
                </p>
                <ComponentPreview>
                    <Card className="w-full max-w-sm">
                        <CardHeader>
                            <CardTitle>Subscription</CardTitle>
                            <CardDescription>Manage your subscription plan.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                You are currently on the Pro plan.
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" size="sm">Cancel</Button>
                            <Button size="sm" className="ml-auto">Upgrade</Button>
                        </CardFooter>
                    </Card>
                </ComponentPreview>
                <CodeBlock code={withFooterCode} language="tsx" />
            </section>

            {/* Sizes */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Sizes</h2>
                <p className="text-sm text-muted-foreground">
                    Use the <code className="bg-foreground/5 px-1.5 py-0.5 text-xs">size</code> prop
                    for compact cards.
                </p>
                <ComponentPreview>
                    <div className="flex w-full flex-col gap-4 sm:flex-row">
                        <Card className="flex-1">
                            <CardHeader>
                                <CardTitle>Default Size</CardTitle>
                                <CardDescription>Standard padding</CardDescription>
                            </CardHeader>
                        </Card>
                        <Card size="sm" className="flex-1">
                            <CardHeader>
                                <CardTitle>Small Size</CardTitle>
                                <CardDescription>Compact padding</CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                </ComponentPreview>
            </section>

            {/* Source */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Source Code</h2>
                <p className="text-sm text-muted-foreground">
                    Copy this into <code className="bg-foreground/5 px-1.5 py-0.5 text-xs">components/ui/card.tsx</code>
                </p>
                <CodeBlock code={sourceCode} language="tsx" filename="components/ui/card.tsx" />
            </section>
        </div>
    )
}

