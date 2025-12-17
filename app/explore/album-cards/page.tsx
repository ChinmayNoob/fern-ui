import { AlbumCards, demoAlbums } from "@/components/album-card/album-cards"
import { CodeBlock } from "@/components/ui/code-block"
import { ComponentPreview } from "@/components/ui/component-preview"

const usageCode = `import { AlbumCards, Album } from "@/components/ui/album-cards"

const albums: Album[] = [
  {
    id: "album-1",
    title: "Track Name",
    artist: "Artist Name",
    image: "/albums/cover.png",
    lines: [
      "...",
      "First lyric line",
      "Second lyric line",
      "Third lyric line",
      "...",
    ]
  }
]

export function Example() {
  return <AlbumCards albums={albums} />
}`

const sourceCode = `/* eslint-disable @next/next/no-img-element */
"use client";

import { motion, useAnimate, AnimationScope } from "motion/react";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

import { cn } from "@/lib/utils";

export interface Album {
    id: string;
    title: string;
    artist: string;
    image: string;
    lines: string[];
}

interface AlbumCardsProps {
    albums: Album[];
    className?: string;
}

// Hook to detect mobile screen
function useIsMobile(breakpoint = 768) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < breakpoint);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, [breakpoint]);

    return isMobile;
}

export function AlbumCards({ albums, className }: AlbumCardsProps) {
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const isMobile = useIsMobile();

    const animationRefs = albums.reduce((acc, album) => {
        const [scope, animate] = useAnimate<HTMLDivElement>();
        acc[album.id] = { scope, animate };
        return acc;
    }, {} as { [key: string]: { scope: AnimationScope<HTMLDivElement>, animate: ReturnType<typeof useAnimate>[1] } });

    const [highlightedIndices, setHighlightedIndices] = useState<{ [key: string]: number }>({});

    // Get responsive dimensions
    const getCollapsedSize = useCallback(() => ({
        width: isMobile ? "160px" : "180px",
        height: isMobile ? "160px" : "180px",
    }), [isMobile]);

    const getExpandedSize = useCallback(() => ({
        width: isMobile ? "320px" : "400px",
        height: isMobile ? "420px" : "500px",
    }), [isMobile]);

    useEffect(() => {
        const intervals: { [key: string]: NodeJS.Timeout } = {};
        albums.forEach(album => {
            if (expandedId === album.id) {
                intervals[album.id] = setInterval(() => {
                    setHighlightedIndices(prev => ({
                        ...prev,
                        [album.id]: ((prev[album.id] || 0) + 1) % album.lines.length
                    }));
                }, 1500);
            } else {
                setHighlightedIndices(prev => ({ ...prev, [album.id]: 0 }));
            }
        });
        return () => Object.values(intervals).forEach(clearInterval);
    }, [expandedId, albums]);

    const toggleExpand = async (clickedCardId: string) => {
        const currentlyExpandedCardId = expandedId;
        const newTargetCardId = (currentlyExpandedCardId === clickedCardId) ? null : clickedCardId;
        const collapsedSize = getCollapsedSize();
        const expandedSize = getExpandedSize();

        if (currentlyExpandedCardId && currentlyExpandedCardId !== newTargetCardId) {
            const { scope, animate } = animationRefs[currentlyExpandedCardId];
            if (scope.current) {
                await animate(scope.current, collapsedSize, { duration: 0.3, ease: "easeInOut" });
            }
        }
        setExpandedId(newTargetCardId);
        if (newTargetCardId) {
            const { scope, animate } = animationRefs[newTargetCardId];
            if (scope.current) {
                animate(scope.current, expandedSize, {
                    duration: 0.4, ease: "easeOut", type: "spring", stiffness: 100, damping: 16,
                });
            }
        }
    };

    // Mobile navigation
    const goToNext = () => { setCurrentIndex((prev) => (prev + 1) % albums.length); setExpandedId(null); };
    const goToPrev = () => { setCurrentIndex((prev) => (prev - 1 + albums.length) % albums.length); setExpandedId(null); };

    const displayedAlbums = isMobile ? [albums[currentIndex]] : albums;
    const collapsedSize = getCollapsedSize();

    return (
        <div className={cn("w-full flex flex-col items-center gap-4 font-courier", className)}>
            <div className="flex flex-row gap-6 justify-center items-start">
                {displayedAlbums.map((album) => (
                    <motion.div
                        key={album.id}
                        className="flex flex-col items-center justify-between border bg-card border-foreground/10 rounded-2xl shadow-sm cursor-pointer overflow-auto z-10 hide-scrollbar"
                        style={{ willChange: "width, height", ...collapsedSize }}
                        onClick={() => toggleExpand(album.id)}
                        ref={animationRefs[album.id].scope}
                        layout
                    >
                        {/* Card content... */}
                    </motion.div>
                ))}
            </div>

            {/* Mobile navigation */}
            {isMobile && albums.length > 1 && (
                <div className="flex items-center gap-4 mt-2">
                    <button onClick={goToPrev} className="p-2 rounded-full border border-foreground/10 bg-card">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <div className="flex gap-2">
                        {albums.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => { setCurrentIndex(index); setExpandedId(null); }}
                                className={cn("w-2 h-2 rounded-full transition-all",
                                    index === currentIndex ? "bg-foreground w-4" : "bg-foreground/30"
                                )}
                            />
                        ))}
                    </div>
                    <button onClick={goToNext} className="p-2 rounded-full border border-foreground/10 bg-card">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
}`

export default function AlbumCardsPage() {
    return (
        <div className="space-y-16">
            {/* Header */}
            <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">
                    Components / Album Cards
                </div>
                <h1 className="font-serif text-4xl tracking-tight">Album Cards</h1>
                <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                    An interactive card component for displaying album artwork with expandable lyrics.
                    Features smooth spring animations, auto-scrolling lyric highlights, and a karaoke-style
                    text effect. Fully responsive — shows one card at a time on mobile with navigation controls.
                </p>
            </div>

            {/* Preview */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Preview</h2>
                <ComponentPreview className="min-h-[550px] overflow-x-auto">
                    <AlbumCards albums={demoAlbums} />
                </ComponentPreview>
                <p className="text-xs text-muted-foreground">
                    <strong>Note:</strong> Click on a card to expand it. Requires album images at{" "}
                    <code className="bg-foreground/5 px-1.5 py-0.5 text-xs">/public/albums/</code>
                </p>
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
                                <td className="px-4 py-3 font-mono text-xs">albums</td>
                                <td className="px-4 py-3 text-muted-foreground">Album[]</td>
                                <td className="px-4 py-3 text-muted-foreground">Array of album objects to display</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-mono text-xs">className</td>
                                <td className="px-4 py-3 text-muted-foreground">string?</td>
                                <td className="px-4 py-3 text-muted-foreground">Additional CSS classes for the container</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3 className="mt-8 text-base font-medium">Album Type</h3>
                <div className="overflow-hidden border border-foreground/10">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-foreground/5 bg-foreground/[0.02]">
                                <th className="px-4 py-3 text-left font-medium">Property</th>
                                <th className="px-4 py-3 text-left font-medium">Type</th>
                                <th className="px-4 py-3 text-left font-medium">Description</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-foreground/5">
                            <tr>
                                <td className="px-4 py-3 font-mono text-xs">id</td>
                                <td className="px-4 py-3 text-muted-foreground">string</td>
                                <td className="px-4 py-3 text-muted-foreground">Unique identifier for the album</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-mono text-xs">title</td>
                                <td className="px-4 py-3 text-muted-foreground">string</td>
                                <td className="px-4 py-3 text-muted-foreground">Track/song title</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-mono text-xs">artist</td>
                                <td className="px-4 py-3 text-muted-foreground">string</td>
                                <td className="px-4 py-3 text-muted-foreground">Artist name</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-mono text-xs">image</td>
                                <td className="px-4 py-3 text-muted-foreground">string</td>
                                <td className="px-4 py-3 text-muted-foreground">Path to album cover image</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-mono text-xs">lines</td>
                                <td className="px-4 py-3 text-muted-foreground">string[]</td>
                                <td className="px-4 py-3 text-muted-foreground">Array of lyric lines to display</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
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

            {/* Source */}
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Source Code</h2>
                <p className="text-sm text-muted-foreground">
                    Copy this into your{" "}
                    <code className="bg-foreground/5 px-1.5 py-0.5 text-xs">components/ui/</code> folder.
                </p>
                <CodeBlock code={sourceCode} language="tsx" filename="album-cards.tsx" />
            </section>
        </div>
    )
}

