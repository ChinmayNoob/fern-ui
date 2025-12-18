'use client'

import { CodeBlock } from "@/components/ui/code-block"
import { ComponentPreview } from "@/components/ui/component-preview"
import SvgFilters, { demoSvgFilterItems } from "@/components/svg-filters"

const usageCode = `import SvgFilters from "@/components/svg-filters"

const items = [
  {
    filterType: 'turbulence',
    imageSrc: '/images/my-image.jpg',
    title: 'Hover to see the effect',
    counter: '01',
    metaTitle: 'My Title',
    location: 'Location',
    year: '2024',
    turbulenceProps: {
      type: 'fractalNoise',
      baseFrequency: '0',
      numOctaves: '1',
      scale: '250'
    }
  },
  {
    filterType: 'displacementMap',
    imageSrc: '/images/another-image.jpg',
    title: 'Different distortion effect',
    counter: '02',
    metaTitle: 'Another Title',
    location: 'Another Location',
    year: '2024',
    displacementProps: {
      type: 'fractalNoise',
      baseFrequency: '0.01 0.005',
      numOctaves: '5',
      seed: '2',
      xChannelSelector: 'R',
      yChannelSelector: 'B'
    }
  }
]

export function Example() {
  return <SvgFilters items={items} />
}`

const componentSource = `'use client';

import Item, { SvgFilterItemProps } from './Item';
import './svg-filters.css';
import { cn } from '@/lib/utils';

export interface SvgFiltersProps {
    /** Array of items to display */
    items: Omit<SvgFilterItemProps, 'id'>[];
    /** Custom class name for the container */
    className?: string;
    /** Custom class name for the content grid */
    contentClassName?: string;
}

export default function SvgFilters({
    items,
    className,
    contentClassName,
}: SvgFiltersProps) {
    return (
        <div className={cn('svg-filters-container', className)}>
            <div className={cn('sf-content', contentClassName)}>
                {items.map((item, index) => (
                    <Item
                        key={\`svg-filter-\${index}\`}
                        id={\`distortionFilter-\${index}\`}
                        {...item}
                    />
                ))}
            </div>
        </div>
    );
}

// Re-export types and Item component
export { Item, type SvgFilterItemProps };`

const itemSource = `'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export interface SvgFilterItemProps {
    /** Unique ID for the SVG filter */
    id: string;
    /** Type of filter effect */
    filterType: 'turbulence' | 'displacementMap';
    /** Image source URL */
    imageSrc: string;
    /** Caption title text shown on hover */
    title: string;
    /** Item counter/number */
    counter: string;
    /** Meta title below the image */
    metaTitle: string;
    /** Location or subtitle */
    location: string;
    /** Year or additional info */
    year: string;
    /** Turbulence filter properties */
    turbulenceProps?: {
        type?: string;
        baseFrequency?: string;
        numOctaves?: string;
        scale?: string;
    };
    /** Displacement map filter properties */
    displacementProps?: {
        type?: string;
        baseFrequency?: string;
        numOctaves?: string;
        seed?: string;
        xChannelSelector?: string;
        yChannelSelector?: string;
    };
}

export default function Item({
    id,
    filterType,
    imageSrc,
    title,
    counter,
    metaTitle,
    location,
    year,
    turbulenceProps = {},
    displacementProps = {}
}: SvgFilterItemProps) {
    const itemRef = useRef<HTMLDivElement>(null);
    const thumbRef = useRef<HTMLElement>(null);
    const svgImageRef = useRef<SVGImageElement>(null);
    const feTurbulenceRef = useRef<SVGFETurbulenceElement>(null);
    const feDisplacementMapRef = useRef<SVGFEDisplacementMapElement>(null);
    const captionRef = useRef<HTMLElement>(null);
    const captionTitleRef = useRef<HTMLParagraphElement>(null);
    const captionLinkRef = useRef<HTMLAnchorElement>(null);
    const metaRef = useRef<HTMLDivElement>(null);
    const metaCounterRef = useRef<HTMLParagraphElement>(null);
    const metaTitleRef = useRef<HTMLHeadingElement>(null);
    const metaDetailRefs = useRef<HTMLParagraphElement[]>([]);

    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const primitiveValuesRef = useRef(
        filterType === 'turbulence' ? { baseFrequency: 0 } : { scale: 0 }
    );

    useEffect(() => {
        if (!itemRef.current) return;

        if (svgImageRef.current) {
            gsap.set(svgImageRef.current, { transformOrigin: '50% 50%' });
        }

        createHoverTimeline();

        const handleMouseEnter = () => tlRef.current?.restart();
        const handleMouseLeave = () => tlRef.current?.reverse();

        thumbRef.current?.addEventListener('mouseenter', handleMouseEnter);
        thumbRef.current?.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            thumbRef.current?.removeEventListener('mouseenter', handleMouseEnter);
            thumbRef.current?.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    // ... filter update and timeline creation logic
    // See full source for implementation details

    return (
        <div ref={itemRef} className="sf-item">
            <figure ref={thumbRef} className="sf-thumb">
                <svg className="sf-distort" width="350" height="450" viewBox="0 0 350 450">
                    <filter id={id} data-type={filterType}>
                        <feTurbulence ref={feTurbulenceRef} /* ... props */ />
                        <feDisplacementMap ref={feDisplacementMapRef} /* ... props */ />
                    </filter>
                    <image
                        ref={svgImageRef}
                        filter={\`url(#\${id})\`}
                        className="sf-distort__img"
                        xlinkHref={imageSrc}
                        x="50" y="50" height="350" width="250"
                    />
                </svg>
                <figcaption ref={captionRef} className="sf-thumb__caption">
                    <p ref={captionTitleRef} className="sf-thumb__caption-title">{title}</p>
                    <a ref={captionLinkRef} className="sf-thumb__caption-link">Explore</a>
                </figcaption>
            </figure>
            <div ref={metaRef} className="sf-item__meta">
                <p ref={metaCounterRef} className="sf-item__meta-counter">{counter}</p>
                <h3 ref={metaTitleRef} className="sf-item__meta-title">{metaTitle}</h3>
                <p className="sf-item__meta-detail">{location}</p>
                <p className="sf-item__meta-detail">{year}</p>
            </div>
        </div>
    );
}`

const cssSource = `/* SVG Filters Component - Theme-aware styles */

/* Light theme (default) */
.svg-filters-container {
    --sf-color-bg: hsl(var(--background));
    --sf-color-text: hsl(var(--foreground));
    --sf-color-text-alt: hsl(var(--muted-foreground));
    --sf-color-border: hsl(var(--border));
    --sf-color-caption-bg: hsl(var(--card));
    --sf-color-link: hsl(var(--primary));
    --sf-color-link-hover: hsl(var(--primary) / 0.8);
}

/* Dark theme - use .dark ancestor selector */
.dark .svg-filters-container {
    --sf-color-caption-bg: hsl(0 0% 10%);
}

/* Container */
.svg-filters-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: var(--sf-color-bg);
    color: var(--sf-color-text);
}

/* Content grid */
.sf-content {
    padding: 1rem;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 2rem;
    justify-content: center;
    align-items: flex-start;
}

/* Single item */
.sf-item {
    flex: none;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

/* Meta info below image */
.sf-item__meta {
    font-size: 0.85rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--sf-color-border);
}

.sf-item__meta-counter {
    margin: 0;
    font-size: 0.75rem;
    color: var(--sf-color-text-alt);
    font-family: monospace;
}

.sf-item__meta-title {
    font-weight: 500;
    font-size: 1.25rem;
    margin: 0.25rem 0;
    color: var(--sf-color-text);
}

.sf-item__meta-detail {
    margin: 0;
    color: var(--sf-color-text-alt);
    font-size: 0.8rem;
}

/* Thumbnail/Figure */
.sf-thumb {
    position: relative;
    margin: 0;
    width: 200px;
    height: 220px;
    overflow: hidden;
    border-radius: 4px;
}

/* Caption overlay */
.sf-thumb__caption {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    padding: 1rem;
    background: var(--sf-color-caption-bg);
    transform: translate3d(0, 100%, 0);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.sf-thumb__caption-title {
    color: var(--sf-color-text);
    font-size: 0.85rem;
    line-height: 1.4;
    margin: 0;
}

.sf-thumb__caption-link {
    display: inline-block;
    cursor: pointer;
    color: var(--sf-color-link);
    font-weight: 500;
    font-size: 0.9rem;
    text-decoration: none;
    transition: color 0.2s;
}

/* SVG distortion effect */
.sf-distort {
    pointer-events: none;
    margin: -115px 0 0 -75px;
}

/* Mobile responsive */
@media screen and (max-width: 640px) {
    .sf-content {
        flex-direction: column;
        align-items: center;
        gap: 2rem;
    }
    
    .sf-item {
        width: 100%;
        max-width: 250px;
    }
}

/* Tablet and up - staggered layout: items 1,2 up, items 3,4 down */
@media screen and (min-width: 768px) {
    .sf-content {
        gap: 2.5rem;
    }
    
    /* First two items stay at top */
    .sf-item:nth-child(1),
    .sf-item:nth-child(2) {
        margin-top: 0;
    }
    
    /* Third and fourth items go down */
    .sf-item:nth-child(3),
    .sf-item:nth-child(4) {
        margin-top: 3rem;
    }
}

/* Large screens */
@media screen and (min-width: 1024px) {
    .sf-content {
        gap: 3rem;
        max-width: 1200px;
        margin: 0 auto;
    }
    
    .sf-item:nth-child(3),
    .sf-item:nth-child(4) {
        margin-top: 5rem;
    }
}`

const sourceFiles = [
    { filename: 'index.tsx', code: componentSource, language: 'tsx' },
    { filename: 'Item.tsx', code: itemSource, language: 'tsx' },
    { filename: 'svg-filters.css', code: cssSource, language: 'css' },
]


export default function SvgFiltersPage() {
    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">
                    Components / SVG Filters
                </div>
                <h1 className="font-serif text-4xl tracking-tight">SVG Filters</h1>
                <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                    A component that applies SVG filters to images.
                    Features turbulence and displacement map filters.
                </p>
            </div>

            {/* Live Preview - All Items */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Preview</h2>
                <p className="text-sm text-muted-foreground">
                    Hover over the images to see the filter effects.
                </p>
                <span className="text-xs text-muted-foreground">
                    <strong>Note:</strong>
                    The light theme is not supported in this component.
                    Please check in dark mode for a better experience.
                </span>
                <ComponentPreview className="min-h-[500px] p-4">
                    <SvgFilters items={demoSvgFilterItems} />
                </ComponentPreview>
            </section>



            {/* Usage */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Usage</h2>
                <CodeBlock code={usageCode} language="tsx" />
            </section>

            {/* Props */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Props</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b">
                                <th className="py-2 pr-4 text-left font-medium">Prop</th>
                                <th className="py-2 pr-4 text-left font-medium">Type</th>
                                <th className="py-2 pr-4 text-left font-medium">Default</th>
                                <th className="py-2 text-left font-medium">Description</th>
                            </tr>
                        </thead>
                        <tbody className="text-muted-foreground">
                            <tr className="border-b">
                                <td className="py-2 pr-4 font-mono text-xs">items</td>
                                <td className="py-2 pr-4 font-mono text-xs">SvgFilterItemProps[]</td>
                                <td className="py-2 pr-4 font-mono text-xs">required</td>
                                <td className="py-2">Array of filter items to display</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 pr-4 font-mono text-xs">className</td>
                                <td className="py-2 pr-4 font-mono text-xs">string</td>
                                <td className="py-2 pr-4 font-mono text-xs">-</td>
                                <td className="py-2">Custom class for container</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 pr-4 font-mono text-xs">contentClassName</td>
                                <td className="py-2 pr-4 font-mono text-xs">string</td>
                                <td className="py-2 pr-4 font-mono text-xs">-</td>
                                <td className="py-2">Custom class for content grid</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Item Props */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Item Props</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b">
                                <th className="py-2 pr-4 text-left font-medium">Prop</th>
                                <th className="py-2 pr-4 text-left font-medium">Type</th>
                                <th className="py-2 text-left font-medium">Description</th>
                            </tr>
                        </thead>
                        <tbody className="text-muted-foreground">
                            <tr className="border-b">
                                <td className="py-2 pr-4 font-mono text-xs">filterType</td>
                                <td className="py-2 pr-4 font-mono text-xs">&apos;turbulence&apos; | &apos;displacementMap&apos;</td>
                                <td className="py-2">Type of SVG filter effect</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 pr-4 font-mono text-xs">imageSrc</td>
                                <td className="py-2 pr-4 font-mono text-xs">string</td>
                                <td className="py-2">Image URL to apply effect to</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 pr-4 font-mono text-xs">title</td>
                                <td className="py-2 pr-4 font-mono text-xs">string</td>
                                <td className="py-2">Caption title shown on hover</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 pr-4 font-mono text-xs">counter</td>
                                <td className="py-2 pr-4 font-mono text-xs">string</td>
                                <td className="py-2">Item counter/number</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 pr-4 font-mono text-xs">metaTitle</td>
                                <td className="py-2 pr-4 font-mono text-xs">string</td>
                                <td className="py-2">Title below the image</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 pr-4 font-mono text-xs">location</td>
                                <td className="py-2 pr-4 font-mono text-xs">string</td>
                                <td className="py-2">Location or subtitle text</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 pr-4 font-mono text-xs">year</td>
                                <td className="py-2 pr-4 font-mono text-xs">string</td>
                                <td className="py-2">Year or additional info</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 pr-4 font-mono text-xs">turbulenceProps</td>
                                <td className="py-2 pr-4 font-mono text-xs">object</td>
                                <td className="py-2">Configuration for turbulence filter</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 pr-4 font-mono text-xs">displacementProps</td>
                                <td className="py-2 pr-4 font-mono text-xs">object</td>
                                <td className="py-2">Configuration for displacement map</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Filter Configuration */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Filter Configuration</h2>
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <h3 className="font-medium">Turbulence Props</h3>
                        <ul className="text-sm text-muted-foreground space-y-1">
                            <li><code className="text-xs bg-muted px-1 py-0.5 rounded">type</code> - &apos;fractalNoise&apos; or &apos;turbulence&apos;</li>
                            <li><code className="text-xs bg-muted px-1 py-0.5 rounded">baseFrequency</code> - Base frequency for noise</li>
                            <li><code className="text-xs bg-muted px-1 py-0.5 rounded">numOctaves</code> - Number of noise octaves</li>
                            <li><code className="text-xs bg-muted px-1 py-0.5 rounded">scale</code> - Displacement scale (higher = more distortion)</li>
                        </ul>
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-medium">Displacement Props</h3>
                        <ul className="text-sm text-muted-foreground space-y-1">
                            <li><code className="text-xs bg-muted px-1 py-0.5 rounded">type</code> - &apos;fractalNoise&apos; or &apos;turbulence&apos;</li>
                            <li><code className="text-xs bg-muted px-1 py-0.5 rounded">baseFrequency</code> - Frequency (can be &apos;x y&apos;)</li>
                            <li><code className="text-xs bg-muted px-1 py-0.5 rounded">numOctaves</code> - Number of octaves</li>
                            <li><code className="text-xs bg-muted px-1 py-0.5 rounded">seed</code> - Random seed</li>
                            <li><code className="text-xs bg-muted px-1 py-0.5 rounded">xChannelSelector</code> - R, G, B, or A</li>
                            <li><code className="text-xs bg-muted px-1 py-0.5 rounded">yChannelSelector</code> - R, G, B, or A</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Features</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>SVG-based image distortion effects using native filters</li>
                    <li>Two filter types: Turbulence and Displacement Map</li>
                    <li>Smooth hover animations powered by GSAP</li>
                    <li>Caption reveal on hover with meta information</li>
                    <li>Fully responsive with staggered layouts on larger screens</li>
                    <li>Dark and light theme support</li>
                    <li>Configurable filter parameters for unique effects</li>
                    <li>Scale animation on image hover (non-Firefox browsers)</li>
                </ul>
            </section>

            {/* Dependencies */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Dependencies</h2>
                <CodeBlock
                    code="npm install gsap"
                    language="bash"
                />
            </section>

            {/* Source Code */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Source Code</h2>
                <CodeBlock files={sourceFiles} />
            </section>
        </div>
    )
}

