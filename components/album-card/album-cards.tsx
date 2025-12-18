/* eslint-disable @next/next/no-img-element */
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

    // Create animation refs for each album
    const animationRefs = albums.reduce((acc, album) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [scope, animate] = useAnimate<HTMLDivElement>();
        acc[album.id] = { scope, animate };
        return acc;
    }, {} as { [key: string]: { scope: AnimationScope<HTMLDivElement>, animate: ReturnType<typeof useAnimate>[1] } });

    const [highlightedIndices, setHighlightedIndices] = useState<{ [key: string]: number }>({});

    // Get dimensions based on screen size
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
                setHighlightedIndices(prev => ({
                    ...prev,
                    [album.id]: 0
                }));
            }
        });

        return () => {
            Object.values(intervals).forEach(interval => clearInterval(interval));
        };
    }, [expandedId, albums]);

    const toggleExpand = async (clickedCardId: string) => {
        const currentlyExpandedCardId = expandedId;
        const newTargetCardId = (currentlyExpandedCardId === clickedCardId) ? null : clickedCardId;
        const collapsedSize = getCollapsedSize();
        const expandedSize = getExpandedSize();

        if (currentlyExpandedCardId && currentlyExpandedCardId !== newTargetCardId) {
            const { scope, animate } = animationRefs[currentlyExpandedCardId];
            if (scope.current) {
                await animate(
                    scope.current,
                    collapsedSize,
                    { duration: 0.3, ease: "easeInOut" }
                );
            }
        }

        setExpandedId(newTargetCardId);

        if (newTargetCardId) {
            const { scope, animate } = animationRefs[newTargetCardId];
            if (scope.current) {
                animate(
                    scope.current,
                    expandedSize,
                    {
                        duration: 0.4,
                        ease: "easeOut",
                        type: "spring",
                        stiffness: 100,
                        damping: 16,
                    }
                );
            }
        }
    };

    // Navigate to next/prev album on mobile
    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % albums.length);
        setExpandedId(null);
    };

    const goToPrev = () => {
        setCurrentIndex((prev) => (prev - 1 + albums.length) % albums.length);
        setExpandedId(null);
    };

    // Get albums to display based on screen size
    const displayedAlbums = isMobile ? [albums[currentIndex]] : albums;
    const collapsedSize = getCollapsedSize();

    return (
        <div className={cn("w-full flex flex-col items-center gap-4 font-courier", className)}>
            {/* Cards container */}
            <div className="flex flex-row gap-6 justify-center items-start">
                {displayedAlbums.map((album) => (
                    <motion.div
                        key={album.id}
                        className="flex flex-col items-center justify-between border bg-card border-foreground/10 rounded-2xl shadow-sm cursor-pointer overflow-auto z-10 hide-scrollbar"
                        style={{
                            willChange: "width, height",
                            width: collapsedSize.width,
                            height: collapsedSize.height,
                        }}
                        onClick={() => toggleExpand(album.id)}
                        ref={animationRefs[album.id].scope}
                        layout
                    >
                        <div className={cn(
                            "flex gap-4 justify-between cursor-pointer w-full sticky top-0 z-10 bg-card",
                            isMobile ? "p-3" : "p-4"
                        )}>
                            <Image
                                width={144}
                                height={144}
                                src={album.image}
                                alt={album.id}
                                className={cn(
                                    "rounded-xl object-cover border border-foreground/10",
                                    isMobile ? "w-32 h-32" : "w-36 h-36"
                                )}
                            />
                            {expandedId === album.id && (
                                <motion.div
                                    className="flex flex-col gap-1 text-right min-h-full justify-between items-end"
                                    transition={{
                                        duration: 0.6,
                                        ease: "easeOut",
                                        delay: 0.2,
                                    }}
                                    style={{ willChange: "opacity" }}
                                    initial={{ opacity: 0, filter: "blur(10px)" }}
                                    animate={{ opacity: expandedId === album.id ? 1 : 0, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, filter: "blur(10px)" }}
                                >
                                    <p className={cn(
                                        "leading-none font-bold text-foreground",
                                        isMobile ? "text-xs" : "text-sm"
                                    )}>{album.id.toUpperCase()}</p>
                                    <div className="flex flex-col gap-1">
                                        <h2 className={cn(
                                            "font-bold leading-none text-foreground",
                                            isMobile ? "text-base" : "text-lg"
                                        )}>
                                            {album.title}
                                        </h2>
                                        <p className={cn(
                                            "text-muted-foreground leading-none",
                                            isMobile ? "text-xs" : "text-sm"
                                        )}>
                                            {album.artist}
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                        {expandedId === album.id && (
                            <motion.div
                                initial={{ opacity: 0, filter: "blur(10px)" }}
                                animate={{ opacity: expandedId === album.id ? 1 : 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, filter: "blur(10px)" }}
                                transition={{
                                    duration: 0.6,
                                    ease: "easeOut",
                                    delay: 0.2,
                                }}
                                className={cn("pb-4", isMobile ? "px-3" : "px-4")}
                            >
                                <p className={cn(
                                    "leading-none font-bold flex flex-col gap-2",
                                    isMobile ? "text-lg" : "text-2xl"
                                )}>
                                    {album.lines.map((line, index) => (
                                        <motion.span
                                            key={index}
                                            initial={{
                                                color: "hsl(var(--muted-foreground))",
                                                scale: 1,
                                            }}
                                            animate={{
                                                color: index === (highlightedIndices[album.id] || 0)
                                                    ? "hsl(var(--foreground))"
                                                    : "hsl(var(--muted-foreground))",
                                                scale: index === (highlightedIndices[album.id] || 0) ? 1.004 : 1,
                                            }}
                                            exit={{
                                                color: "hsl(var(--muted-foreground))",
                                                scale: 1,
                                            }}
                                            transition={{
                                                duration: 1,
                                            }}
                                        >
                                            {line}
                                        </motion.span>
                                    ))}
                                </p>
                            </motion.div>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Mobile navigation */}
            {isMobile && albums.length > 1 && (
                <div className="flex items-center gap-4 mt-2">
                    {/* Previous button */}
                    <button
                        onClick={goToPrev}
                        className="p-2 rounded-full border border-foreground/10 bg-card hover:bg-foreground/5 transition-colors"
                        aria-label="Previous album"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Dots indicator */}
                    <div className="flex gap-2">
                        {albums.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setCurrentIndex(index);
                                    setExpandedId(null);
                                }}
                                className={cn(
                                    "w-2 h-2 rounded-full transition-all",
                                    index === currentIndex
                                        ? "bg-foreground w-4"
                                        : "bg-foreground/30 hover:bg-foreground/50"
                                )}
                                aria-label={`Go to album ${index + 1}`}
                            />
                        ))}
                    </div>

                    {/* Next button */}
                    <button
                        onClick={goToNext}
                        className="p-2 rounded-full border border-foreground/10 bg-card hover:bg-foreground/5 transition-colors"
                        aria-label="Next album"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
}

// Default demo albums for showcase
export const demoAlbums: Album[] = [
    {
        id: "gnx",
        title: "reincarnated",
        artist: "Kendrick Lamar",
        image: "/albums/gnx.png",
        lines: [
            "...",
            "My present life is Kendrick Lamar",
            "A rapper lookin' at the lyrics to keep you in awe",
            "The only factor I respected was raisin' the bar",
            "My instincts sent material straight to the charts, huh",
            "My father kicked me out the house, I finally forgive him",
            "I'm old enough to understand the way I was livin'",
            "Ego and pride had me lookin' at him with resentment",
            "I close my eyes hopin' that I don't come off contentious",
            "...",
        ]
    },
    {
        id: "yeezus",
        title: "On Sight",
        artist: "Kanye West",
        image: "/albums/yeezus.png",
        lines: [
            "...",
            "Yeezy season approaching",
            "F*** whatever y'all been hearing",
            "F*** what, f*** whatever y'all been wearing",
            "A monster about to come alive again",
            "Soon as I pull up and park the Benz",
            "We get this b**** shaking like Parkinsons",
            "Take my number and lock it in",
            "Indian hair, no moccasins",
            "...",
        ]
    },
];

