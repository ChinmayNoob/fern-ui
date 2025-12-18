## Contributing to Fern UI

Thanks for your interest in contributing! This repo is structured around small, focused UI components under `components/` and corresponding “explore” pages under `app/explore/` that document and demo each component.

This guide explains the patterns used for the `shiny-wrap` component and its explore page, so you can follow the same conventions when adding new components.

---

## Component patterns (`components/shiny-wrap/`)

- **Directory per component**
  - Each reusable component lives in its own folder under `components/`, e.g. `components/shiny-wrap/`.
  - The folder contains:
    - **Implementation file**: `shiny-wrapper.tsx`
    - **Barrel file**: `index.tsx` re-exporting the default export

- **Client components**
  - If a component uses React state, effects, or browser-only APIs, start the file with:

```tsx
'use client'
```

- **Typed props**
  - Define a dedicated props interface above the component:

```tsx
interface ShinyWrapperProps {
  children: React.ReactNode
  animationSpeed?: number
  loop?: boolean
  loopDelay?: number
  hoverOnly?: boolean
  shinyStyle?: 'gradient' | 'solid'
  className?: string
  shinyWidth?: string
}
```

  - Prefer:
    - **Destructured props** with defaults in the function signature.
    - **Clear, documented prop names** that will map directly into the explore page’s props table.

- **Implementation style**
  - Use:
    - **React hooks** (`useState`, etc.) for interactivity.
    - **Tailwind CSS utility classes** for layout and styling.
    - **Inline `@keyframes`** in a `<style>` tag when the animation is component‑specific (as in `shiny-wrapper.tsx`), so the effect is self-contained.
  - Wrap children with a minimal outer container, and expose customization via `className` and typed props rather than hardcoding layout.

- **Barrel export**
  - The `index.tsx` file should re-export the default component to support cleaner imports:

```tsx
export { default as ShinyWrapper } from './shiny-wrapper'
```

  - Follow the same pattern for new components, e.g.:

```tsx
export { default as FancyCard } from './fancy-card'
```

---

## Explore page patterns (`app/explore/shiny-wrap/`)

Each component has a matching explore page under `app/explore/<component-name>/page.tsx`. The `shiny-wrap` page shows the core structure and UX we aim for.

- **File location and naming**
  - Create a folder under `app/explore/` that matches the component name (kebab-case), e.g. `app/explore/shiny-wrap/`.
  - Inside, add a `page.tsx` file exporting a default React component.

- **Imports**
  - Use UI primitives and helpers from shared UI libraries, plus the component under demo. For example:

```tsx
'use client'

import { CodeBlock } from '@/components/ui/code-block'
import { ComponentPreview } from '@/components/ui/component-preview'
import ShinyWrapper from '@/components/shiny-wrap/shiny-wrapper'
```

  - Follow the same pattern for new components, updating the import paths and names accordingly.

- **Example usage snippet (`usageCode`)**
  - Define a `usageCode` string that shows a minimal but realistic usage example:

```tsx
const usageCode = `import ShinyWrapper from "@/components/shiny-wrap/shiny-wrapper"

export function Example() {
  return (
    <div className="flex gap-4">
      <ShinyWrapper className="rounded-xl">
        <figure className="h-[320px] w-[220px] overflow-hidden rounded-xl">
          <img src="/images/photo1.jpg" alt="Shiny wrapper" className="w-full h-full object-cover" />
        </figure>
      </ShinyWrapper>
    </div>
  )
}`
```

  - This is rendered in a `CodeBlock` so users can see how to consume the component.

- **Source code snippets (`componentSource`, `indexSource`, `sourceFiles`)**
  - Mirror the actual implementation and barrel file in string constants so they can be shown with `CodeBlock`:

```tsx
const componentSource = `...actual component source...`
const indexSource = `export { default as ShinyWrapper } from './shiny-wrapper';`

const sourceFiles = [
  { filename: 'shiny-wrapper.tsx', code: componentSource, language: 'tsx' },
  { filename: 'index.tsx', code: indexSource, language: 'tsx' },
]
```

  - For new components, keep these strings in sync with the real files whenever you change the implementation.

- **Page layout**
  - Structure the explore page in clearly separated sections:
    - **Header**
      - Breadcrumb (e.g. “Components / Shiny Wrap”).
      - Component title (`<h1>`).
      - Short descriptive paragraph about what the component does and when to use it.
    - **Preview**
      - Use `ComponentPreview` to show an interactive/live example of the component.
      - Demonstrate typical usage with realistic content and Tailwind classes.
    - **Usage**
      - Render `usageCode` with `<CodeBlock code={usageCode} language="tsx" />`.
    - **Props**
      - Render a small HTML table describing each prop:
        - Name (mono font).
        - Type.
        - Default value.
        - Human-readable description.
    - **Source Code**
      - Render full source with `<CodeBlock files={sourceFiles} />` to show the implementation and index.

- **Styling and UX**
  - Use consistent spacing and typography:
    - `space-y-*` utilities to separate sections.
    - Semantic headings (`h1`, `h2`) and muted text for descriptions.
  - Keep previews focused and visually clean; avoid unnecessary complexity in demo content.

---

## General guidelines when adding new components

- **Match existing structure**
  - Mirror the `shiny-wrap` structure:
    - `components/<name>/<name>.tsx` (or similar)
    - `components/<name>/index.tsx`
    - `app/explore/<name>/page.tsx`

- **Keep components reusable**
  - Accept content via `children` and/or clearly typed props.
  - Do not hardcode app-specific data inside the reusable component—put that only in the explore/demo page.

- **Document as you go**
  - Update:
    - **Usage snippet** to demonstrate the main use case.
    - **Props table** to reflect the current API.
    - **Source code strings** on the explore page if implementation changes.

- **Follow TypeScript and Tailwind best practices**
  - Use TypeScript types for props and avoid `any`.
  - Prefer Tailwind utility classes for layout and design, keeping styles close to the JSX.

If you’re unsure whether your new component or explore page matches the existing patterns, compare your work directly with `components/shiny-wrap/` and `app/explore/shiny-wrap/`, and align naming, structure, and tone accordingly.


