/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "motion/react";
import { RefObject, useRef, useState, useEffect, useCallback } from "react";

import { cn } from "@/lib/utils";

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

export interface DraggableCardItem {
    id: string;
    src: string;
    alt: string;
    top: string;
    left: string;
    rotate: string;
    /** Width class for the card (e.g., "w-36", "w-48") */
    width?: string;
    /** Mobile width class (e.g., "w-24", "w-32") */
    mobileWidth?: string;
}

interface DraggableCardsProps {
    /** Array of card items to display */
    cards: DraggableCardItem[];
    /** Optional title to display */
    title?: string;
    /** Optional accent color for the title dot (supports Tailwind color classes) */
    accentColor?: string;
    /** Custom class name for the container */
    className?: string;
    /** Custom class name for the cards container */
    cardsContainerClassName?: string;
}

export function DraggableCards({
    cards,
    title,
    accentColor = "text-orange-500",
    className,
    cardsContainerClassName,
}: DraggableCardsProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const isMobile = useIsMobile();

    return (
        <section
            className={cn(
                "relative grid min-h-[500px] w-full place-content-center overflow-hidden bg-background md:min-h-screen",
                className
            )}
        >
            {title && (
                <h1 className="pointer-events-none relative z-0 select-none text-center text-[12vw] font-black text-muted-foreground/50 md:text-[80px] lg:text-[100px]">
                    {title}
                    <span className={accentColor}>.</span>
                </h1>
            )}
            <div
                ref={containerRef}
                className={cn("absolute inset-0 z-10", cardsContainerClassName)}
            >
                {cards.map((card) => (
                    <DraggableCard
                        key={card.id}
                        containerRef={containerRef}
                        src={card.src}
                        alt={card.alt}
                        rotate={card.rotate}
                        top={card.top}
                        left={card.left}
                        className={cn(
                            isMobile ? (card.mobileWidth || "w-24") : (card.width || "w-48")
                        )}
                    />
                ))}
            </div>
        </section>
    );
}

type DraggableCardProps = {
    containerRef: RefObject<HTMLDivElement | null>;
    src: string;
    alt: string;
    top: string;
    left: string;
    rotate: string;
    className?: string;
};

function DraggableCard({
    containerRef,
    src,
    alt,
    top,
    left,
    rotate,
    className,
}: DraggableCardProps) {
    const [zIndex, setZIndex] = useState(0);

    const updateZIndex = useCallback(() => {
        const elements = document.querySelectorAll(".draggable-card-item");
        let maxZIndex = -Infinity;

        elements.forEach((el) => {
            const currentZIndex = parseInt(
                window.getComputedStyle(el).getPropertyValue("z-index")
            );

            if (!isNaN(currentZIndex) && currentZIndex > maxZIndex) {
                maxZIndex = currentZIndex;
            }
        });

        setZIndex(maxZIndex + 1);
    }, []);

    return (
        <motion.img
            onMouseDown={updateZIndex}
            onTouchStart={updateZIndex}
            src={src}
            alt={alt}
            drag
            dragConstraints={containerRef}
            dragElastic={0.65}
            whileDrag={{ scale: 1.05 }}
            whileHover={{ scale: 1.02 }}
            className={cn(
                "draggable-card-item absolute cursor-grab bg-card p-1 pb-4 shadow-lg ring-1 ring-foreground/10 transition-shadow hover:shadow-xl active:cursor-grabbing dark:ring-foreground/20",
                className
            )}
            style={{
                top,
                left,
                rotate,
                zIndex,
            }}
        />
    );
}

// Default demo cards for showcase
export const demoDraggableCards: DraggableCardItem[] = [
    {
        id: "blonde",
        src: "/albums/blonde.png",
        alt: "Blonde Album",
        rotate: "6deg",
        top: "20%",
        left: "25%",
        width: "w-32",
        mobileWidth: "w-20",
    },
    {
        id: "college-dropout",
        src: "/images/college-dropout.jpg",
        alt: "College Dropout Album",
        rotate: "12deg",
        top: "45%",
        left: "60%",
        width: "w-28",
        mobileWidth: "w-16",
    },
    {
        id: "graduation",
        src: "/images/graduation.jpg",
        alt: "Graduation Album",
        rotate: "-6deg",
        top: "20%",
        left: "40%",
        width: "w-44",
        mobileWidth: "w-24",
    },
    {
        id: "mbdtf",
        src: "/images/mbdtf.jpg",
        alt: "MBDTF Album",
        rotate: "8deg",
        top: "50%",
        left: "40%",
        width: "w-40",
        mobileWidth: "w-20",
    },
    {
        id: "tlop",
        src: "/images/tlop.jpg",
        alt: "TLOP Album",
        rotate: "18deg",
        top: "20%",
        left: "65%",
        width: "w-36",
        mobileWidth: "w-20",
    },
    {
        id: "yeezus",
        src: "/albums/yeezus.png",
        alt: "Yeezus Album",
        rotate: "-3deg",
        top: "35%",
        left: "55%",
        width: "w-28",
        mobileWidth: "w-16",
    },
    {
        id: "gnx",
        src: "/albums/gnx.png",
        alt: "GNX Album",
        rotate: "4deg",
        top: "55%",
        left: "20%",
        width: "w-32",
        mobileWidth: "w-18",
    },
    {
        id: "nwts",
        src: "/albums/nwts.png",
        alt: "NWTS Album",
        rotate: "-4deg",
        top: "40%",
        left: "10%",
        width: "w-32",
        mobileWidth: "w-18",
    },
];

