"use client";

import { ButtonHTMLAttributes, useState } from "react";
import ValorantButton from "./valorant-btn";

export type ValorantButtonProps = {
    text?: string;
    buttonColor?: number;
    textColor?: string;
    variant?: 'default' | 'liquid' | 'neon' | 'warp';
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function ValorantPlayground() {
    const [playgroundText, setPlaygroundText] = useState("PLAYGROUND");
    const [playgroundButtonColor, setPlaygroundButtonColor] = useState(0);
    const [playgroundTextColor, setPlaygroundTextColor] = useState("#fff");
    const [playgroundVariant, setPlaygroundVariant] = useState<NonNullable<ValorantButtonProps['variant']>>('default');

    const variants = [
        { value: 'default', label: 'Default (Original)', description: 'Classic slice effect with squiggle animation' },
        { value: 'liquid', label: 'Liquid', description: 'Smooth, morphing liquid layers' },
        { value: 'neon', label: 'Neon', description: 'Glowing, flickering neon sign effect' },
        { value: 'warp', label: 'Warp', description: 'High-speed light streaks' },
    ] as const;

    return (
        <div className="w-full bg-neutral-900 rounded-lg p-6 font-courier-prime">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Valorant Button Variants Playground
            </h2>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Controls */}
                <div className="flex-1 space-y-4">
                    <div>
                        <label className="block text-white font-semibold mb-2">
                            Button Text
                        </label>
                        <input
                            type="text"
                            value={playgroundText}
                            onChange={(e) => setPlaygroundText(e.target.value)}
                            className="w-full p-3 bg-neutral-800 text-white rounded border border-gray-600 focus:border-white focus:outline-none"
                            placeholder="Enter button text"
                        />
                    </div>

                    <div>
                        <label className="block text-white font-semibold mb-2">
                            Hover Effect Variant
                        </label>
                        <select
                            value={playgroundVariant}
                            onChange={(e) => setPlaygroundVariant(e.target.value as any)}
                            className="w-full p-3 bg-neutral-800 text-white rounded border border-gray-600 focus:border-white focus:outline-none"
                        >
                            {variants.map((variant) => (
                                <option key={variant.value} value={variant.value}>
                                    {variant.label}
                                </option>
                            ))}
                        </select>
                        <p className="text-gray-400 text-sm mt-1">
                            {variants.find(v => v.value === playgroundVariant)?.description}
                        </p>
                    </div>

                    <div>
                        <label className="block text-white font-semibold mb-2">
                            Button Color (Hue: {playgroundButtonColor}°)
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="360"
                            value={playgroundButtonColor}
                            onChange={(e) => setPlaygroundButtonColor(Number(e.target.value))}
                            className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer"
                        />
                        <input
                            type="number"
                            min="0"
                            max="360"
                            value={playgroundButtonColor}
                            onChange={(e) => setPlaygroundButtonColor(Number(e.target.value))}
                            className="mt-2 w-full p-2 bg-neutral-800 text-white rounded border border-gray-600 focus:border-white focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-white font-semibold mb-2">
                            Text Color
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="color"
                                value={playgroundTextColor}
                                onChange={(e) => setPlaygroundTextColor(e.target.value)}
                                className="w-16 h-10 bg-neutral-800 rounded cursor-pointer"
                            />
                            <input
                                type="text"
                                value={playgroundTextColor}
                                onChange={(e) => setPlaygroundTextColor(e.target.value)}
                                className="flex-1 p-2 bg-neutral-800 text-white rounded border border-gray-600 focus:border-white focus:outline-none"
                                placeholder="#ffffff or rgb(255,255,255)"
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <h3 className="text-white font-semibold mb-2">Quick Presets:</h3>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => {
                                    setPlaygroundText("DEFAULT");
                                    setPlaygroundButtonColor(0);
                                    setPlaygroundTextColor("#000");
                                    setPlaygroundVariant("default");
                                }}
                                className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                            >
                                Default
                            </button>
                            <button
                                onClick={() => {
                                    setPlaygroundText("LIQUID");
                                    setPlaygroundButtonColor(200);
                                    setPlaygroundTextColor("#fff");
                                    setPlaygroundVariant("liquid");
                                }}
                                className="px-3 py-1 bg-cyan-600 text-white rounded text-sm hover:bg-cyan-700"
                            >
                                Liquid
                            </button>
                            <button
                                onClick={() => {
                                    setPlaygroundText("NEON");
                                    setPlaygroundButtonColor(300);
                                    setPlaygroundTextColor("#fff");
                                    setPlaygroundVariant("neon");
                                }}
                                className="px-3 py-1 bg-pink-600 text-white rounded text-sm hover:bg-pink-700"
                            >
                                Neon
                            </button>
                            <button
                                onClick={() => {
                                    setPlaygroundText("WARP");
                                    setPlaygroundButtonColor(260);
                                    setPlaygroundTextColor("#fff");
                                    setPlaygroundVariant("warp");
                                }}
                                className="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700"
                            >
                                Warp
                            </button>
                        </div>
                    </div>
                </div>

                {/* Live Preview */}
                <div className="flex-1 flex flex-col items-center justify-center">
                    <h3 className="text-white font-semibold mb-4">Live Preview</h3>
                    <div className="bg-black p-8 rounded-lg border border-gray-600">
                        <ValorantButton
                            text={playgroundText}
                            buttonColor={playgroundButtonColor}
                            textColor={playgroundTextColor}
                            variant={playgroundVariant}
                            onClick={() => console.log(`${playgroundVariant} button clicked!`)}
                        />
                    </div>

                    {/* Code Preview */}
                    <div className="mt-4 w-full">
                        <h4 className="text-white font-semibold mb-2">Generated Code:</h4>
                        <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs overflow-x-auto">
                            {`<ValorantButton
    text="${playgroundText}"
    buttonColor={${playgroundButtonColor}}
    textColor="${playgroundTextColor}"
    variant="${playgroundVariant}"
    onClick={() => console.log("clicked")}
/>`}
                        </pre>
                    </div>
                </div>
            </div>

            {/* Showcase All Variants */}
            <div className="mt-8 pt-8 border-t border-gray-700">
                <h3 className="text-white font-semibold mb-6 text-center">All Variants Showcase</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-items-center">
                    {variants.map((variant) => (
                        <div key={variant.value} className="bg-black p-6 rounded-lg border border-gray-600 text-center flex flex-col items-center gap-4">
                            <h4 className="text-white font-semibold mb-2">{variant.label}</h4>
                            <p className="text-gray-400 text-sm mb-4 min-h-[40px]">{variant.description}</p>
                            <ValorantButton
                                text={variant.label}
                                buttonColor={variant.value === 'default' ? 0 : variant.value === 'liquid' ? 200 : variant.value === 'neon' ? 300 : 260}
                                textColor={variant.value === 'default' ? '#000' : '#fff'}
                                variant={variant.value}
                                onClick={() => console.log(`${variant.value} clicked!`)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
} 