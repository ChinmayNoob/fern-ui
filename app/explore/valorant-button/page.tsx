'use client'

import { CodeBlock } from "@/components/ui/code-block"
import { ComponentPreview } from "@/components/ui/component-preview"
import ValorantButton from "@/components/valorant-button/valorant-btn"

const usageCode = `import ValorantButton from "@/components/valorant-button/valorant-btn"

export function Example() {
  return (
    <ValorantButton
      text="JOIN NOW"
      buttonColor={0}        // Hue value 0-360
      textColor="#fff"
      variant="default"      // 'default' | 'liquid' | 'neon' | 'warp'
      onClick={() => console.log("clicked")}
    />
  )
}`

const buttonSource = `import { ValorantButtonProps } from "./valorant-playground";
import S from "./valorant.module.css";

export default function ValorantButton({
    text = "JOIN NOW",
    buttonColor = 0,
    textColor = "#000",
    variant = "default",
    ...props
}: ValorantButtonProps) {
    const getVariantClass = () => {
        switch (variant) {
            case 'liquid':
                return S.buttonLiquid;
            case 'neon':
                return S.buttonNeon;
            case 'warp':
                return S.buttonWarp;
            default:
                return S.button;
        }
    };

    return (
        <button
            className={getVariantClass()}
            data-text={text}
            style={{
                '--hue': \`\${buttonColor}deg\`,
                '--text-color': textColor,
                color: textColor,
            } as React.CSSProperties}
            {...props}
        >
            <div />
            <span>{text}</span>
            {variant === 'warp' && (
                <div className={S.warpStreaks}>
                    <i />
                    <i />
                    <i />
                    <i />
                </div>
            )}
        </button>
    );
}`

const typesSource = `import { ButtonHTMLAttributes } from "react";

export type ValorantButtonProps = {
    text?: string;
    buttonColor?: number;
    textColor?: string;
    variant?: 'default' | 'liquid' | 'neon' | 'warp';
} & ButtonHTMLAttributes<HTMLButtonElement>;`

const cssSource = `@import url("https://fonts.googleapis.com/css2?family=Anton&display=swap");

.button,
.buttonLiquid,
.buttonNeon,
.buttonWarp {
    /* Base colors - these get shifted by hue-rotate */
    --color1: #ff4655;
    --color2: #ff7582;
    --color3: #fffbf5;
    --triangle-offset-top: -40px;
    --mask-size: 0px;
    position: relative;
    appearance: none;
    border: 0;
    color: #000;
    background-color: transparent;
    padding: 0.5rem 2rem;
    min-width: 15rem;
    font-size: 2rem;
    text-transform: uppercase;
    font-weight: 400;
    font-family: "Anton", serif;
    letter-spacing: 0.04em;
    z-index: 1;
    filter: hue-rotate(var(--hue, 0deg));
    cursor: pointer;
}

.button>span,
.buttonLiquid>span,
.buttonNeon>span,
.buttonWarp>span {
    z-index: 10;
    position: relative;
}

/* DEFAULT VARIANT - Slice effect with squiggle animation */
.button div { /* scratch marks on click */ }
.button::before { /* gradient background */ }
.button::after { /* animated overlay */ }
.button:hover::before { clip-path: polygon(...); }
.button:hover::after { animation: 1s squiggle 0.3s infinite; }

/* LIQUID VARIANT - Morphing liquid waves */
.buttonLiquid { overflow: hidden; background: #1a1a1a; }
.buttonLiquid::before { animation: liquid-wave 4s linear infinite; }
.buttonLiquid::after { animation: liquid-wave 5s linear infinite reverse; }
.buttonLiquid:hover::before { /* fills button */ }

/* NEON VARIANT - Glowing flickering effect */
.buttonNeon { border: 2px solid var(--color1); box-shadow: 0 0 5px var(--color1); }
.buttonNeon:hover { box-shadow: 0 0 20px var(--color1), 0 0 40px var(--color2); }
.buttonNeon:hover>span { animation: neon-flicker .2s infinite alternate; }

/* WARP VARIANT - Light speed streaks */
.buttonWarp { background: #000; animation: warp-pulse 3s infinite; }
.buttonWarp:hover { animation: warp-rumble 0.2s linear; }
.warpStreaks i { /* light streak lines */ }
.buttonWarp:hover .warpStreaks i { left: 120%; /* streaks fly through */ }

/* See full CSS file for complete animations */`

// Multi-file source code for tabs
const sourceFiles = [
    {
        filename: "valorant-btn.tsx",
        code: buttonSource,
        language: "tsx",
    },
    {
        filename: "types.ts",
        code: typesSource,
        language: "typescript",
    },
    {
        filename: "valorant.module.css",
        code: cssSource,
        language: "css",
    },
]

const variants = [
    {
        value: 'default' as const,
        label: 'Default',
        description: 'Classic slice effect with squiggle animation',
        buttonColor: 0,
        textColor: '#000',
    },
    {
        value: 'liquid' as const,
        label: 'Liquid',
        description: 'Smooth, morphing liquid wave layers',
        buttonColor: 200,
        textColor: '#fff',
    },
    {
        value: 'neon' as const,
        label: 'Neon',
        description: 'Glowing, flickering neon sign effect',
        buttonColor: 300,
        textColor: '#fff',
    },
    {
        value: 'warp' as const,
        label: 'Warp',
        description: 'High-speed light streak effect',
        buttonColor: 260,
        textColor: '#fff',
    },
]

const colorExamples = [
    { text: "JOIN NOW", buttonColor: 0, textColor: "#fff" },
    { text: "PLAY GAME", buttonColor: 120, textColor: "#000" },
    { text: "SETTINGS", buttonColor: 240, textColor: "#fff" },
    { text: "QUIT", buttonColor: 300, textColor: "#000" },
]

export default function ValorantButtonPage() {
    return (
        <div className="space-y-16">
            {/* Header */}
            <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">
                    Components / Valorant Button
                </div>
                <h1 className="font-serif text-4xl tracking-tight">Valorant Button</h1>
                <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                    Gaming-inspired buttons with four unique hover effect variants. Features
                    customizable hue rotation for infinite color options, dynamic animations,
                    and the iconic Valorant aesthetic. Perfect for gaming UIs and bold interfaces.
                </p>
            </div>

            {/* Preview - All Variants */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Effect Variants</h2>
                <p className="text-sm text-muted-foreground">
                    Four distinct hover effects. Hover over each button to see the animation.
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {variants.map((variant) => (
                        <ComponentPreview key={variant.value} className="bg-black p-6 sm:p-8">
                            <div className="flex w-full flex-col items-center gap-4">
                                <div className="text-center">
                                    <h3 className="text-base font-bold text-white">
                                        {variant.label}
                                    </h3>
                                    <p className="mt-1 text-xs text-gray-400">
                                        {variant.description}
                                    </p>
                                </div>
                                <div className="flex items-center justify-center py-4">
                                    <ValorantButton
                                        text={variant.label.toUpperCase()}
                                        buttonColor={variant.buttonColor}
                                        textColor={variant.textColor}
                                        variant={variant.value}
                                        onClick={() => console.log(`${variant.value} clicked!`)}
                                    />
                                </div>
                                <span className="rounded-full bg-gray-800 px-3 py-1 text-[10px] text-gray-400">
                                    variant=&quot;{variant.value}&quot;
                                </span>
                            </div>
                        </ComponentPreview>
                    ))}
                </div>
                <p className="text-xs text-muted-foreground">
                    <strong>Tip:</strong> Hover over each button to see its unique animation effect.
                </p>
            </section>

            {/* Color Examples */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Color Variations</h2>
                <p className="text-sm text-muted-foreground">
                    Use the <code className="bg-foreground/5 px-1.5 py-0.5 text-xs">buttonColor</code> prop
                    (0-360 hue value) to create any color.
                </p>
                <ComponentPreview className="bg-black p-6 sm:p-10">
                    <div className="flex w-full flex-wrap items-center justify-center gap-6 sm:gap-8">
                        {colorExamples.map((example, index) => (
                            <div key={index} className="flex flex-col items-center gap-3">
                                <ValorantButton
                                    text={example.text}
                                    buttonColor={example.buttonColor}
                                    textColor={example.textColor}
                                    onClick={() => console.log(`${example.text} clicked`)}
                                />
                                <span className="text-xs text-gray-500">
                                    hue: {example.buttonColor}°
                                </span>
                            </div>
                        ))}
                    </div>
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
                <div className="overflow-hidden border border-foreground/10">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-foreground/5 bg-foreground/[0.02]">
                                <th className="px-4 py-3 text-left font-medium">Prop</th>
                                <th className="px-4 py-3 text-left font-medium">Type</th>
                                <th className="px-4 py-3 text-left font-medium">Description</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-foreground/5">
                            <tr>
                                <td className="px-4 py-3 font-mono text-xs">text</td>
                                <td className="px-4 py-3 text-muted-foreground">string</td>
                                <td className="px-4 py-3 text-muted-foreground">Button label text (default: &quot;JOIN NOW&quot;)</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-mono text-xs">buttonColor</td>
                                <td className="px-4 py-3 text-muted-foreground">number</td>
                                <td className="px-4 py-3 text-muted-foreground">Hue rotation value 0-360 (default: 0)</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-mono text-xs">textColor</td>
                                <td className="px-4 py-3 text-muted-foreground">string</td>
                                <td className="px-4 py-3 text-muted-foreground">Text color in any CSS format (default: &quot;#000&quot;)</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-mono text-xs">variant</td>
                                <td className="px-4 py-3 text-muted-foreground">&apos;default&apos; | &apos;liquid&apos; | &apos;neon&apos; | &apos;warp&apos;</td>
                                <td className="px-4 py-3 text-muted-foreground">Hover effect variant (default: &apos;default&apos;)</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-mono text-xs">onClick</td>
                                <td className="px-4 py-3 text-muted-foreground">() =&gt; void</td>
                                <td className="px-4 py-3 text-muted-foreground">Click handler function</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Features */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Features</h2>
                <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground/40" />
                        <span><strong className="text-foreground">4 Effect Variants</strong> — Default (slice), Liquid (wave), Neon (glow), Warp (streaks)</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground/40" />
                        <span><strong className="text-foreground">Infinite Colors</strong> — Use hue rotation (0-360) for any color</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground/40" />
                        <span><strong className="text-foreground">CSS-Only Animations</strong> — No JavaScript for hover effects, pure CSS</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground/40" />
                        <span><strong className="text-foreground">Gaming Aesthetic</strong> — Bold typography with Anton font</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground/40" />
                        <span><strong className="text-foreground">Fully Typed</strong> — TypeScript support with exported prop types</span>
                    </li>
                </ul>
            </section>

            {/* Variant Details */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Variant Details</h2>
                <div className="overflow-hidden border border-foreground/10">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-foreground/5 bg-foreground/[0.02]">
                                <th className="px-4 py-3 text-left font-medium">Variant</th>
                                <th className="px-4 py-3 text-left font-medium">Effect</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-foreground/5">
                            <tr>
                                <td className="px-4 py-3 font-mono text-xs">default</td>
                                <td className="px-4 py-3 text-muted-foreground">Slice clip-path animation with squiggle shake on hover</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-mono text-xs">liquid</td>
                                <td className="px-4 py-3 text-muted-foreground">Wavy liquid fill animation that rises on hover</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-mono text-xs">neon</td>
                                <td className="px-4 py-3 text-muted-foreground">Glowing border with flickering text shadow on hover</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-mono text-xs">warp</td>
                                <td className="px-4 py-3 text-muted-foreground">Light speed streaks flying through on hover</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Dependencies */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Dependencies</h2>
                <p className="text-sm text-muted-foreground">
                    This component uses pure CSS animations — no external animation libraries required.
                    The Anton font is loaded via Google Fonts in the CSS file.
                </p>
            </section>

            {/* Source - Multi-file tabs */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Source Code</h2>
                <p className="text-sm text-muted-foreground">
                    This component requires 3 files. Copy all into your{" "}
                    <code className="bg-foreground/5 px-1.5 py-0.5 text-xs">components/valorant-button/</code> folder.
                </p>
                <p className="text-xs text-muted-foreground">
                    <strong>Note:</strong> The CSS file shown is abbreviated. Download the full 470-line CSS file
                    for all animations and effects.
                </p>
                <CodeBlock files={sourceFiles} />
            </section>
        </div>
    )
}

