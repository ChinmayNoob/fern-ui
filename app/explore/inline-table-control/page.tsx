"use client"

import { InlineTableControl } from "@/components/inline-table-control"
import { CodeBlock } from "@/components/ui/code-block"
import { ComponentPreview } from "@/components/ui/component-preview"
import { InstallCommand } from "@/components/ui/install-command"

const usageCode = `import { InlineTableControl } from "@/components/inline-table-control"

export function Example() {
  return <InlineTableControl />
}`

export default function InlineTableControlPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">
          Components / Inline Table Control
        </div>
        <h1 className="font-serif text-4xl tracking-tight">Inline Table Control</h1>
        <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
          Expense-style rows that expand into an inline edit form with shared layout
          transitions, focus lock on desktop, and keyboard escape to cancel.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-medium">Installation</h2>
        <p className="text-sm text-muted-foreground">
          Install the component using the shadcn CLI:
        </p>
        <InstallCommand command="npx shadcn@latest add ChinmayNoob/fern-ui/inline-table-control" />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-medium">Preview</h2>
        <p className="text-sm text-muted-foreground">
          Click the edit control on a row to open the form; submit or cancel to return.
        </p>
        <ComponentPreview className="min-h-[400px] p-0 overflow-hidden">
          <InlineTableControl />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-medium">Usage</h2>
        <CodeBlock code={usageCode} language="tsx" />
      </section>
    </div>
  )
}
