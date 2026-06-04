import { forwardRef, useCallback, useEffect, useRef, useState } from "react";

import * as Tabs from "@radix-ui/react-tabs";
import { twMerge } from "tailwind-merge";
import { motion, cubicBezier, MotionConfig } from "motion/react";
import { cn } from "@/lib/utils";

const LINKS = {
  NEWEST: "/scroll",
  TRENDING: "/scroll/trending",
  FOLLOWING: "/scroll/following",
} as const;

const TABS = {
  NEWEST: "newest",
  TRENDING: "trending",
  FOLLOWING: "following",
} as const;

const GRADIENT_POSITIONS = {
  [TABS.NEWEST]: 10,
  [TABS.TRENDING]: 45,
  [TABS.FOLLOWING]: 90,
} as const;

const CONSTANTS = {
  DEFAULT_CIRCLE_SIZE: 250,
  GRADIENT_MULTIPLIER: 1.5,
  DISTANCE_OFFSET: 25,
  /** Low = pointer-reactive glow barely moves (avoids “shimmer” next to text) */
  INTERPOLATION_FACTOR: 0.06,
  /** Slide / clip when changing tabs (glow + mask only; keep separate from pointer glow) */
  TAB_SWITCH_DURATION: 0.78,
  /** CSS-variable glow follows cursor without feeling sluggish */
  POINTER_GLOW_DURATION: 0.22,
} as const;

const tabSlideEase = cubicBezier(0.22, 1, 0.36, 1);
const tabSlideTransition = {
  duration: CONSTANTS.TAB_SWITCH_DURATION,
  ease: tabSlideEase,
} as const;

/** Space-separated RGB for Tailwind arbitrary values */
const COLORS = {
  railBg: "23 23 23",
  divider: "255 255 255",
  /** Bright neon — reference: luminous green stroke + bloom */
  neon: "52 255 140",
  primaryGradient: "52 255 140",
} as const;

const activeGlowShape = (tab: string) => {
  switch (tab) {
    case TABS.NEWEST:
      return "rounded-l-full rounded-r-none";
    case TABS.FOLLOWING:
      return "rounded-r-full rounded-l-none";
    default:
      return "rounded-none";
  }
};

const BaseTabsLabel = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => (
  <p className={cn("text-xs font-semibold uppercase tracking-wide", className)}>
    {children}
  </p>
);

const InactiveTabsLabel = ({ children }: { children: React.ReactNode }) => (
  <BaseTabsLabel className="text-white">{children}</BaseTabsLabel>
);

const ActiveTabsLabel = ({ children }: { children: React.ReactNode }) => (
  <BaseTabsLabel className="text-[rgb(52_255_140)] antialiased">
    {children}
  </BaseTabsLabel>
);

const TabsLink = forwardRef<HTMLAnchorElement, React.ComponentProps<"a">>(
  ({ className, style, ...restOfProps }, ref) => (
    <a
      ref={ref}
      className={twMerge(
        "flex items-center border-transparent px-4 uppercase focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--neon-ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--rail-bg))]",
        className
      )}
      style={
        {
          "--neon-ring": COLORS.neon,
          "--rail-bg": COLORS.railBg,
          ...style,
        } as React.CSSProperties
      }
      {...restOfProps}
    />
  )
);

TabsLink.displayName = "TabsLink";

const InteractiveTabsLink = forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<"a">
>(({ className, ...restOfProps }, ref) => (
  <TabsLink ref={ref} className={twMerge("py-2.5", className)} {...restOfProps} />
));

InteractiveTabsLink.displayName = "InteractiveTabsLink";

const calculateNewCircleSize = (
  gradientXPositionInPercent: number,
  currentGradientPositionInPercent: number,
  rectWidth: number
) => {
  const gradientDistance =
    ((Math.abs(gradientXPositionInPercent - currentGradientPositionInPercent) *
      rectWidth) /
      100) *
    CONSTANTS.GRADIENT_MULTIPLIER;
  return `${CONSTANTS.DEFAULT_CIRCLE_SIZE + gradientDistance - CONSTANTS.DISTANCE_OFFSET}px`;
};

function getActiveTabBoundsPercentage(activeTabElement: HTMLAnchorElement) {
  const activeTabParent = activeTabElement.parentElement;
  if (!activeTabParent) return;
  const parentRect = activeTabParent.getBoundingClientRect();
  const activeTabRect = activeTabElement.getBoundingClientRect();
  const activeTabLeft =
    (activeTabRect.left - parentRect.left) / parentRect.width;
  const activeTabRight =
    (parentRect.right - activeTabRect.right) / parentRect.width;
  return {
    leftPercentage: activeTabLeft * 100,
    rightPercentage: activeTabRight * 100,
  };
}

export interface ScrollFeedTabsProps {
  className?: string
}

export const SCROLL_FEED_TABS = TABS
export type ScrollFeedTabId = (typeof TABS)[keyof typeof TABS]

export const ScrollFeedTabs = () => {
  const [activeTab, setActiveTab] = useState({
    name: "newest",
    leftPercentage: 0,
    rightPercentage: 70,
  });
  const activeTabRef = useRef<HTMLAnchorElement>(null);
  const [gradientPositionPercentage, setGradientPositionPercentage] =
    useState<number>(GRADIENT_POSITIONS[TABS.NEWEST]);
  const [circleSize, setCircleSize] = useState("250px");

  const measureActiveTab = useCallback(() => {
    if (!activeTabRef.current) return;
    const activeTabBoundsPercentage = getActiveTabBoundsPercentage(
      activeTabRef.current
    );
    if (!activeTabBoundsPercentage) return;
    setActiveTab((prev) => ({
      ...prev,
      leftPercentage: activeTabBoundsPercentage.leftPercentage,
      rightPercentage: activeTabBoundsPercentage.rightPercentage,
    }));
  }, []);

  useEffect(() => {
    measureActiveTab();
    const id = requestAnimationFrame(measureActiveTab);
    return () => cancelAnimationFrame(id);
  }, [activeTab.name, measureActiveTab]);

  useEffect(() => {
    const el = activeTabRef.current?.parentElement;
    if (!el) return;
    const ro = new ResizeObserver(() => measureActiveTab());
    ro.observe(el);
    return () => ro.disconnect();
  }, [measureActiveTab, activeTab.name]);

  const onValueChange = (value: string) => {
    setActiveTab((prev) => ({
      ...prev,
      name: value,
    }));
    setGradientPositionPercentage(getGradientPosition(value));
    setCircleSize(`${CONSTANTS.DEFAULT_CIRCLE_SIZE}px`);
  };

  const getGradientPosition = (tab: string) =>
    GRADIENT_POSITIONS[tab as keyof typeof GRADIENT_POSITIONS] ??
    GRADIENT_POSITIONS[TABS.NEWEST];

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const gradientXPositionInPercent =
      ((e.clientX - rect.left) / rect.width) * 100;
    const currentGradientPositionInPercent = getGradientPosition(
      activeTab.name
    );

    const interpolatedGradientPositionInPercent =
      currentGradientPositionInPercent +
      (gradientXPositionInPercent - currentGradientPositionInPercent) *
        CONSTANTS.INTERPOLATION_FACTOR;

    setCircleSize(
      calculateNewCircleSize(
        gradientXPositionInPercent,
        currentGradientPositionInPercent,
        rect.width
      )
    );
    setGradientPositionPercentage(interpolatedGradientPositionInPercent);
  };

  const handleMouseLeave = () => {
    setGradientPositionPercentage(getGradientPosition(activeTab.name));
    setCircleSize(`${CONSTANTS.DEFAULT_CIRCLE_SIZE}px`);
  };

  const handleTabClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
  };

  const inactiveCell = (tab: (typeof TABS)[keyof typeof TABS]) =>
    activeTab.name !== tab ? "bg-[rgb(var(--rail-bg))]" : "bg-transparent";

  /** Vertical fades: emphasize the gap next to the active segment; soften the far gap. */
  const dividerNearOpacity = 0.88;
  const dividerMidOpacity = 0.48;
  const dividerFarOpacity = 0.22;
  const dividerLeftOpacity =
    activeTab.name === TABS.NEWEST
      ? dividerNearOpacity
      : activeTab.name === TABS.TRENDING
        ? dividerMidOpacity
        : dividerFarOpacity;
  const dividerRightOpacity =
    activeTab.name === TABS.FOLLOWING
      ? dividerNearOpacity
      : activeTab.name === TABS.TRENDING
        ? dividerMidOpacity
        : dividerFarOpacity;

  return (
    <MotionConfig transition={{ duration: CONSTANTS.POINTER_GLOW_DURATION, ease: "easeOut" }}>
      <Tabs.Root value={activeTab.name} onValueChange={onValueChange}>
        <Tabs.List asChild>
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative isolate z-10 inline-flex w-fit min-w-0 shrink-0 items-stretch overflow-visible rounded-full border border-[rgb(var(--divider)/0.12)] bg-[rgb(var(--rail-bg))]"
            style={{ "--rail-bg": COLORS.railBg, "--divider": COLORS.divider } as React.CSSProperties}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* Neon shell: NOT clip-path’d so outer bloom is visible */}
            <motion.div
              aria-hidden
              className={cn(
                "pointer-events-none absolute inset-y-0 z-0 box-border",
                activeGlowShape(activeTab.name)
              )}
              initial={false}
              animate={{
                left: `${activeTab.leftPercentage}%`,
                right: `${activeTab.rightPercentage}%`,
              }}
              transition={tabSlideTransition}
            >
              <div
                className={cn(
                  "relative box-border h-full min-h-full w-full overflow-visible",
                  activeGlowShape(activeTab.name)
                )}
              >
                <motion.div
                  className={cn(
                    "absolute inset-0 box-border",
                    activeGlowShape(activeTab.name)
                  )}
                  style={
                    {
                      "--primary-gradient": COLORS.primaryGradient,
                      background: `radial-gradient(var(--circle-size) circle at var(--gradient-position-x), rgb(var(--primary-gradient) / 0.22) 0%, transparent 50%)`,
                    } as React.CSSProperties
                  }
                  animate={{
                    "--gradient-position-x": `${gradientPositionPercentage}%`,
                    "--circle-size": circleSize,
                  }}
                  transition={{
                    duration: CONSTANTS.POINTER_GLOW_DURATION,
                    ease: "easeOut",
                  }}
                />
                <div
                  className={cn(
                    "absolute inset-0 box-border border",
                    activeGlowShape(activeTab.name)
                  )}
                  style={
                    {
                      borderColor: `rgb(${COLORS.neon})`,
                      boxShadow: `
                        0 0 14px 1px rgb(${COLORS.neon} / 0.35),
                        0 0 28px 4px rgb(${COLORS.neon} / 0.15),
                        inset 0 0 16px rgb(${COLORS.neon} / 0.08)
                      `,
                    } as React.CSSProperties
                  }
                />
              </div>
            </motion.div>

            <Tabs.Trigger value={TABS.NEWEST} asChild>
              <InteractiveTabsLink
                ref={
                  activeTab.name === TABS.NEWEST ? activeTabRef : undefined
                }
                className={cn(
                  "relative z-1 shrink-0 rounded-l-full bg-clip-padding data-[state=active]:opacity-0",
                  inactiveCell(TABS.NEWEST)
                )}
                href={LINKS.NEWEST}
                onClick={handleTabClick}
              >
                <InactiveTabsLabel>Newest</InactiveTabsLabel>
              </InteractiveTabsLink>
            </Tabs.Trigger>
            <Tabs.Trigger value={TABS.TRENDING} asChild>
              <InteractiveTabsLink
                ref={
                  activeTab.name === TABS.TRENDING ? activeTabRef : undefined
                }
                className={cn(
                  "relative z-1 shrink-0 overflow-visible bg-clip-padding data-[state=active]:opacity-0",
                  inactiveCell(TABS.TRENDING)
                )}
                href={LINKS.TRENDING}
                onClick={handleTabClick}
              >
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-[14%] left-0 z-0 w-px bg-linear-to-b from-transparent via-[rgb(var(--divider)/0.22)] to-transparent"
                  initial={false}
                  animate={{ opacity: dividerLeftOpacity }}
                  transition={tabSlideTransition}
                />
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-[14%] right-0 z-0 w-px bg-linear-to-b from-transparent via-[rgb(var(--divider)/0.22)] to-transparent"
                  initial={false}
                  animate={{ opacity: dividerRightOpacity }}
                  transition={tabSlideTransition}
                />
                <span className="relative z-1 block">
                  <InactiveTabsLabel>Trending</InactiveTabsLabel>
                </span>
              </InteractiveTabsLink>
            </Tabs.Trigger>
            <Tabs.Trigger value={TABS.FOLLOWING} asChild>
              <InteractiveTabsLink
                ref={
                  activeTab.name === TABS.FOLLOWING ? activeTabRef : undefined
                }
                className={cn(
                  "relative z-1 shrink-0 rounded-r-full bg-clip-padding data-[state=active]:opacity-0",
                  inactiveCell(TABS.FOLLOWING)
                )}
                href={LINKS.FOLLOWING}
                onClick={handleTabClick}
              >
                <InactiveTabsLabel>Following</InactiveTabsLabel>
              </InteractiveTabsLink>
            </Tabs.Trigger>

            <motion.div
              className="pointer-events-none absolute inset-0 z-2 flex items-stretch"
              initial={false}
              animate={{
                clipPath: `inset(0 ${activeTab.rightPercentage}% 0 ${activeTab.leftPercentage}%)`,
              }}
              transition={tabSlideTransition}
            >
              <InteractiveTabsLink
                href={LINKS.NEWEST}
                onClick={handleTabClick}
                className="shrink-0 rounded-l-full border border-transparent"
              >
                <ActiveTabsLabel>Newest</ActiveTabsLabel>
              </InteractiveTabsLink>
              <InteractiveTabsLink
                className="shrink-0 border border-transparent"
                href={LINKS.TRENDING}
                onClick={handleTabClick}
              >
                <ActiveTabsLabel>Trending</ActiveTabsLabel>
              </InteractiveTabsLink>
              <InteractiveTabsLink
                href={LINKS.FOLLOWING}
                onClick={handleTabClick}
                className="shrink-0 rounded-r-full border border-transparent"
              >
                <ActiveTabsLabel>Following</ActiveTabsLabel>
              </InteractiveTabsLink>
            </motion.div>
          </motion.div>
        </Tabs.List>
      </Tabs.Root>
    </MotionConfig>
  );
};
