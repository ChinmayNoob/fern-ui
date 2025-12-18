'use client'

import { CodeBlock } from "@/components/ui/code-block"
import { ComponentPreview } from "@/components/ui/component-preview"
import SpiderButton from "@/components/spiderman-theme-buttons/spider-button"

const usageCode = `import SpiderButton from "@/components/spiderman-theme-buttons/spider-button"

export function Example() {
  const handleClick = (e: React.MouseEvent) => {
    console.log('Button clicked!', e)
  }

  return (
    <SpiderButton
      buttonName="CLICK ME"
      hoverBtnName="DO IT!"
      variant="primary"
      handleButtonClick={handleClick}
    />
  )
}`

const sourceCode = `'use client'
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import style from "./spider-button.module.css";
import { buttonAnim, clickAnim } from "./spiderbtn-animation";

export type SpidermanButtonProps = {
    buttonName: string;
    hoverBtnName: string;
    btnClassName?: string;
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'default';
    handleButtonClick: (e: any) => void;
}

export const RANDOM_INT = (min: number, max: number): number => 
    Math.floor(Math.random() * (max - min + 1) + min);

export default function SpiderButton({ 
    buttonName, 
    hoverBtnName, 
    btnClassName, 
    variant = 'default', 
    handleButtonClick 
}: SpidermanButtonProps) {
    const [btnName, setBtnName] = useState(buttonName);
    const [shakeAmount, setShakeAmount] = useState(8);
    const [clickOffset, setClickOffset] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setShakeAmount(RANDOM_INT(6, 12));
        setClickOffset(RANDOM_INT(-50, 50));
        setIsMounted(true);
    }, []);

    const getButtonClassName = () => {
        let className = style.btn;
        if (variant !== 'default') {
            className += \` \${style[variant]}\`;
        }
        if (btnClassName) {
            className += \` \${btnClassName}\`;
        }
        return className;
    };

    if (!isMounted) {
        return (
            <button type="button" className={getButtonClassName()} onClick={handleButtonClick}>
                {buttonName}
            </button>
        );
    }

    return (
        <motion.button
            type="button"
            className={getButtonClassName()}
            initial="init"
            animate="init"
            whileHover="hover"
            whileTap="tap"
            whileFocus="focus"
            variants={buttonAnim}
            custom={shakeAmount}
            onMouseEnter={() => setBtnName(hoverBtnName)}
            onMouseLeave={() => setBtnName(buttonName)}
            onClick={handleButtonClick}
        >
            {btnName}
            <motion.div className={style.click} variants={clickAnim} custom={clickOffset} />
        </motion.button>
    );
}`

const cssCode = `@import url('https://fonts.googleapis.com/css?family=Dekko|Lato:900|Rock+Salt');

.btn {
    min-width: fit-content;
    border: none;
    font-family: 'Dekko';
    font-size: 24px;
    font-weight: 600;
    padding: 0.3rem 1.75rem 0.2rem 1.75rem;
    position: relative;
    z-index: 2;
    border: 3px solid rgb(0, 0, 0);
    background-color: rgb(253, 217, 11);
}

/* Color Variants */
.btn.primary { background-color: rgb(10, 4, 211); color: white; }
.btn.secondary { background-color: rgb(207, 4, 254); color: black; }
.btn.success { background-color: rgb(1, 187, 112); color: white; }
.btn.warning { background-color: rgb(201, 15, 31); color: white; }

.btn:hover { cursor: url('/buttons/spiderman/pointer.png'), auto; }
.btn:active { cursor: url('/buttons/spiderman/clicked.png'), auto; }

.click {
    position: absolute;
    width: 100%;
    height: 64px;
    background-image: url('/buttons/spiderman/click.png');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    top: -80px;
    left: 0;
    right: 0;
}

.btn::after {
    background-color: #dfdbe5;
    background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23c4aa12' fill-opacity='0.6' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E");
    content: '';
    width: 100%;
    height: 100%;
    background-size: 5%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -3;
}

.btn::before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: inset 0px 0px 50px rgb(253, 217, 11);
    z-index: -2;
}

/* Shadow variants for different button colors */
.btn.primary::before { box-shadow: inset 0px 0px 50px rgb(10, 4, 211); }
.btn.secondary::before { box-shadow: inset 0px 0px 50px rgb(207, 4, 254); }
.btn.success::before { box-shadow: inset 0px 0px 50px rgb(1, 187, 112); }
.btn.warning::before { box-shadow: inset 0px 0px 50px rgb(201, 15, 31); }`

const animationCode = `export const buttonAnim = {
    init: {
        translateX: [0, 0, 0, 0, 0, 0, 0, 0],
        scale: 1,
        textShadow: [
            "0px 0px 0px #ff006a, 0px 0px 0px #00dcff",
            "0x 0px 2px #ff006a, 0px 0px 0px #00dcff",
            "0px 0px 0px #ff006a, 0px 0px 0px #00dcff",
            "0px 0px 0px #ff006a, 0x 0px 0px #00dcff",
            "0px 0px 0px #ff006a, 0px 0px 0px #00dcff",
            "0px 0px 0px #ff006a, 0px 0px 0px #00dcff",
        ],
        filter: [
            "drop-shadow(0px 0px 0px #ff006a) drop-shadow(0px 0px 0px #00dcff)",
            "drop-shadow(0px 0px 0px #ff006a) drop-shadow(0px 0px 0px #00dcff)",
            "drop-shadow(0px 0px 0px #ff006a) drop-shadow(0px 0px 0px #00dcff)",
            "drop-shadow(0px 0px 0px #ff006a) drop-shadow(0px 0px 0px #00dcff)",
            "drop-shadow(0px 0px 0px #ff006a) drop-shadow(0px 0px 0px #00dcff)",
            "drop-shadow(0px 0px 0px #ff006a) drop-shadow(0px 0px 0px #00dcff)",
        ],
        transition: { duration: 0.1, ease: [0.455, 0.03, 0.515, 0.955] as const },
    },
    hover: (custom: number) => ({
        translateX: [0, -custom, custom, -custom + 2, custom - 2, -custom, custom, 0],
        textShadow: [
            "0px 0px 0px #ff006a, 0px 0px 0px #00dcff",
            "-14px 0px 2px #ff006a, 14px 0px 2px #00dcff",
            "14px 0px 2px #ff006a, -14px 0px 2px #00dcff",
            "-14px 0px 2px #ff006a, 14px 0px 2px #00dcff",
            "14px 0px 2px #ff006a, -14px 0px 2px #00dcff",
            "0px 0px 0px #ff006a, 0px 0px 0px #00dcff",
        ],
        filter: [
            "drop-shadow(0px 0px 0px #ff006a) drop-shadow(0px 0px 0px #00dcff)",
            "drop-shadow(-5px 0px 1px #ff006a) drop-shadow(5px 0px 1px #00dcff)",
            "drop-shadow(5px 0px 1px #ff006a) drop-shadow(-5px 0px 1px #00dcff)",
            "drop-shadow(-5px 0px 1px #ff006a) drop-shadow(5px 0px 1px #00dcff)",
            "drop-shadow(5px 0px 1px #ff006a) drop-shadow(-5px 0px 1px #00dcff)",
            "drop-shadow(0px 0px 0px #ff006a) drop-shadow(0px 0px 0px #00dcff)",
        ],
        transition: { duration: 0.2, ease: [0.455, 0.03, 0.515, 0.955] as const },
    }),
    tap: {
        scale: 0.9,
        transition: { duration: 0.1, ease: [0.455, 0.03, 0.515, 0.955] as const },
    },
};

export const clickAnim = {
    init: (custom: number) => ({
        x: custom,
        scale: 0,
        opacity: 0,
        transition: { duration: 0.1 },
    }),
    anim: {},
    tap: (custom: number) => ({
        x: custom,
        opacity: 1,
        scale: 1.2,
        transition: { duration: 0.07 },
    }),
};`

// Multi-file source code for tabs
const sourceFiles = [
    {
        filename: "spider-button.tsx",
        code: sourceCode,
        language: "tsx",
    },
    {
        filename: "spider-button.module.css",
        code: cssCode,
        language: "css",
    },
    {
        filename: "spiderbtn-animation.ts",
        code: animationCode,
        language: "typescript",
    },
]

export default function SpiderButtonPage() {
    const handleButtonClick = () => {
        console.log('Button clicked!')
    }

    const buttonVariants = [
        {
            variant: "default" as const,
            buttonName: "DEFAULT",
            hoverBtnName: "CLICK ME!",
            title: "Default",
            description: "Classic comic book yellow"
        },
        {
            variant: "primary" as const,
            buttonName: "PRIMARY",
            hoverBtnName: "CLICK IT!",
            title: "Primary",
            description: "Main call-to-action"
        },
        {
            variant: "secondary" as const,
            buttonName: "SECONDARY",
            hoverBtnName: "DANGER!",
            title: "Secondary",
            description: "Alternate actions"
        },
        {
            variant: "success" as const,
            buttonName: "SUCCESS",
            hoverBtnName: "GO GO!",
            title: "Success",
            description: "Positive operations"
        },
        {
            variant: "warning" as const,
            buttonName: "WARNING",
            hoverBtnName: "ALERT!",
            title: "Warning",
            description: "Caution needed"
        }
    ]

    const actionExamples = [
        { variant: "primary" as const, buttonName: "PLAY", hoverBtnName: "START!", title: "Play Action" },
        { variant: "success" as const, buttonName: "SUBMIT", hoverBtnName: "SEND IT!", title: "Submit Form" },
        { variant: "secondary" as const, buttonName: "DELETE", hoverBtnName: "DESTROY!", title: "Delete Action" },
        { variant: "warning" as const, buttonName: "SAVE", hoverBtnName: "KEEP IT!", title: "Save Action" }
    ]

    return (
        <div className="space-y-16">
            {/* Header */}
            <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">
                    Components / Spider Button
                </div>
                <h1 className="font-serif text-4xl tracking-tight">Spider Button</h1>
                <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                    Comic book-style interactive buttons inspired by Spider-Man aesthetics.
                    Features glitch text effects on hover, chromatic aberration animations,
                    custom cursors, and a satisfying tap animation. Five color variants available.
                </p>
            </div>

            {/* Preview - All Variants */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Button Variants</h2>
                <div className="space-y-4">
                    {/* Row 1: Default, Primary, Secondary */}
                    <ComponentPreview className="bg-black p-6 sm:p-10">
                        <div className="flex w-full flex-wrap items-end justify-center gap-8 sm:gap-12 md:gap-16">
                            {buttonVariants.slice(0, 3).map((button, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center gap-4 pt-20"
                                >
                                    <SpiderButton
                                        buttonName={button.buttonName}
                                        hoverBtnName={button.hoverBtnName}
                                        variant={button.variant}
                                        handleButtonClick={handleButtonClick}
                                    />
                                    <div className="text-center">
                                        <h3 className="text-sm font-bold text-white">
                                            {button.title}
                                        </h3>
                                        <p className="mt-1 text-xs text-gray-400">
                                            {button.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ComponentPreview>

                    {/* Row 2: Success, Warning */}
                    <ComponentPreview className="bg-black p-6 sm:p-10">
                        <div className="flex w-full flex-wrap items-end justify-center gap-8 sm:gap-12 md:gap-16">
                            {buttonVariants.slice(3).map((button, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center gap-4 pt-20"
                                >
                                    <SpiderButton
                                        buttonName={button.buttonName}
                                        hoverBtnName={button.hoverBtnName}
                                        variant={button.variant}
                                        handleButtonClick={handleButtonClick}
                                    />
                                    <div className="text-center">
                                        <h3 className="text-sm font-bold text-white">
                                            {button.title}
                                        </h3>
                                        <p className="mt-1 text-xs text-gray-400">
                                            {button.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ComponentPreview>
                </div>
                <p className="text-xs text-muted-foreground">
                    <strong>Tip:</strong> Hover over buttons to see the glitch effect and custom cursor.
                    Click to see the tap animation and &quot;CLICK&quot; text popup.
                </p>
            </section>

            {/* Real-World Examples */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Real-World Examples</h2>
                <ComponentPreview className="bg-black p-6 sm:p-10">
                    <div className="flex w-full flex-wrap items-end justify-center gap-8 sm:gap-12 md:gap-16">
                        {actionExamples.map((button, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center gap-4 pt-20"
                            >
                                <SpiderButton
                                    buttonName={button.buttonName}
                                    hoverBtnName={button.hoverBtnName}
                                    variant={button.variant}
                                    handleButtonClick={handleButtonClick}
                                />
                                <h3 className="text-sm font-bold text-white">
                                    {button.title}
                                </h3>
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
                                <td className="px-4 py-3 font-mono text-xs">buttonName</td>
                                <td className="px-4 py-3 text-muted-foreground">string</td>
                                <td className="px-4 py-3 text-muted-foreground">Default text displayed on the button</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-mono text-xs">hoverBtnName</td>
                                <td className="px-4 py-3 text-muted-foreground">string</td>
                                <td className="px-4 py-3 text-muted-foreground">Text shown when hovering over the button</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-mono text-xs">variant</td>
                                <td className="px-4 py-3 text-muted-foreground">&apos;default&apos; | &apos;primary&apos; | &apos;secondary&apos; | &apos;success&apos; | &apos;warning&apos;</td>
                                <td className="px-4 py-3 text-muted-foreground">Color variant (default: &apos;default&apos;)</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-mono text-xs">handleButtonClick</td>
                                <td className="px-4 py-3 text-muted-foreground">(e: any) =&gt; void</td>
                                <td className="px-4 py-3 text-muted-foreground">Click handler function</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-mono text-xs">btnClassName</td>
                                <td className="px-4 py-3 text-muted-foreground">string?</td>
                                <td className="px-4 py-3 text-muted-foreground">Additional CSS classes for the button</td>
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
                        <span><strong className="text-foreground">Glitch Effect</strong> — Text shakes with chromatic aberration on hover</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground/40" />
                        <span><strong className="text-foreground">Custom Cursors</strong> — Comic-style cursor on hover, click cursor on press</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground/40" />
                        <span><strong className="text-foreground">Click Popup</strong> — &quot;CLICK&quot; text appears above button on tap</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground/40" />
                        <span><strong className="text-foreground">5 Variants</strong> — Default (yellow), Primary (blue), Secondary (purple), Success (green), Warning (red)</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground/40" />
                        <span><strong className="text-foreground">Random Shake</strong> — Each button instance has unique shake intensity</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground/40" />
                        <span><strong className="text-foreground">SSR Safe</strong> — Hydration-safe with proper mounting detection</span>
                    </li>
                </ul>
            </section>

            {/* Dependencies */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Dependencies</h2>
                <p className="text-sm text-muted-foreground">
                    This component requires the{" "}
                    <code className="bg-foreground/5 px-1.5 py-0.5 text-xs">motion/react</code> library
                    for animations. Install it with:
                </p>
                <CodeBlock code="pnpm add motion" language="bash" />
            </section>

            {/* Required Assets */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Required Assets</h2>
                <p className="text-sm text-muted-foreground">
                    Place these cursor and click images in your{" "}
                    <code className="bg-foreground/5 px-1.5 py-0.5 text-xs">public/buttons/spiderman/</code> folder:
                </p>
                <ul className="ml-4 list-disc space-y-1 text-sm text-muted-foreground">
                    <li><code className="bg-foreground/5 px-1 py-0.5 text-xs">pointer.png</code> — Custom hover cursor</li>
                    <li><code className="bg-foreground/5 px-1 py-0.5 text-xs">clicked.png</code> — Custom click cursor</li>
                    <li><code className="bg-foreground/5 px-1 py-0.5 text-xs">click.png</code> — Click popup text image</li>
                </ul>
            </section>

            {/* Source - Multi-file tabs */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Source Code</h2>
                <p className="text-sm text-muted-foreground">
                    This component requires 3 files. Copy all into your{" "}
                    <code className="bg-foreground/5 px-1.5 py-0.5 text-xs">components/spiderman-theme-buttons/</code> folder.
                </p>
                <CodeBlock files={sourceFiles} />
            </section>
        </div>
    )
}

