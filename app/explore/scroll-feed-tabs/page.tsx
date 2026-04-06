"use client"

import { PeerlistScrollFeedTabs } from "@/components/scroll-feed-tabs/scroll-feed-tabs"
import { CodeBlock } from "@/components/ui/code-block"
import { ComponentPreview } from "@/components/ui/component-preview"

const usageCode = `import { ScrollFeedTabs } from "@/components/scroll-feed-tabs"

export function Example() {
  return (
    <ScrollFeedTabs
      hrefs={{
        newest: "/feed",
        trending: "/feed/trending",
        following: "/feed/following",
      }}
      preventNavigation={false}
    />
  )
}`

const indexSource = `export {
  ScrollFeedTabs,
  SCROLL_FEED_TABS,
  type ScrollFeedTabId,
  type ScrollFeedTabsProps,
} from "./scroll-feed-tabs"`

const componentExcerpt = `"use client"
// Radix Tabs + Motion: segmented control with a clipped “active” layer,
// radial glow that follows the pointer, and ResizeObserver for layout.

import { Tabs } from "radix-ui"
import { motion, cubicBezier, MotionConfig } from "motion/react"
import { cn } from "@/lib/utils"

export function ScrollFeedTabs({
  className,
  hrefs,
  withCard = true,
  preventNavigation = true,
}: ScrollFeedTabsProps) {
  /* merges DEFAULT_LINKS, optional white card shell, inner track */
}

function ScrollFeedTabsInner(/* links, preventNavigation */) {
  /* measure active segment vs trackRef for clip-path;
     onMouseMove interpolates glow position + circle size */
}`

const sourceFiles = [
  { filename: "index.tsx", code: indexSource, language: "tsx" },
  { filename: "scroll-feed-tabs.tsx", code: componentExcerpt, language: "tsx" },
]

export default function ScrollFeedTabsPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">
          Components / Scroll Feed Tabs
        </div>
        <h1 className="font-serif text-4xl tracking-tight">Scroll Feed Tabs</h1>
        <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
          A dark pill tab strip with a sliding green highlight, pointer-reactive
          radial glow, and accessible Radix Tabs. Optional card shell matches the
          Peerlist-style reference. Copy the full source from{" "}
          <code className="rounded bg-foreground/5 px-1.5 py-0.5 text-xs">
            components/scroll-feed-tabs/scroll-feed-tabs.tsx
          </code>
          .
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-medium">Preview</h2>
        <p className="text-sm text-muted-foreground">
          Switch tabs, then move the pointer across the track to shift the glow.
        </p>
        <ComponentPreview className="min-h-[220px] p-8">
          <div className="inline-block w-fit max-w-none">
            <PeerlistScrollFeedTabs />
          </div>
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-medium">Usage</h2>
        <CodeBlock code={usageCode} language="tsx" />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-medium">Source</h2>
        <p className="text-sm text-muted-foreground">
          Overview excerpt; the complete implementation lives in the component
          file (including layout measurement and Motion CSS variables).
        </p>
        {sourceFiles.map((file) => (
          <CodeBlock
            key={file.filename}
            code={file.code}
            language={file.language}
            filename={file.filename}
          />
        ))}
      </section>
    </div>
  )
}
