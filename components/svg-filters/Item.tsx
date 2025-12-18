'use client';

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

        // Set up GSAP transform origin
        if (svgImageRef.current) {
            gsap.set(svgImageRef.current, { transformOrigin: '50% 50%' });
        }

        // Create hover timeline
        createHoverTimeline();

        // Add event listeners
        const handleMouseEnter = () => {
            if (tlRef.current) {
                tlRef.current.restart();
            }
        };

        const handleMouseLeave = () => {
            if (tlRef.current) {
                tlRef.current.reverse();
            }
        };

        if (thumbRef.current) {
            thumbRef.current.addEventListener('mouseenter', handleMouseEnter);
            thumbRef.current.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            if (thumbRef.current) {
                thumbRef.current.removeEventListener('mouseenter', handleMouseEnter);
                thumbRef.current.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, []);

    const updateFilterValues = () => {
        if (filterType === 'turbulence') {
            updateTurbulenceBaseFrequency();
        } else {
            updateDisplacementMapScale();
        }
    };

    const updateTurbulenceBaseFrequency = (val?: number) => {
        const value = val !== undefined ? val : primitiveValuesRef.current.baseFrequency;
        if (feTurbulenceRef.current) {
            feTurbulenceRef.current.setAttribute('baseFrequency', String(value));
        }
    };

    const updateDisplacementMapScale = (val?: number) => {
        const value = val !== undefined ? val : (primitiveValuesRef.current as any).scale;
        if (feDisplacementMapRef.current) {
            feDisplacementMapRef.current.setAttribute('scale', String(value));
        }
    };

    const createHoverTimeline = () => {
        tlRef.current = gsap.timeline({
            paused: true,
            defaults: {
                duration: 0.7,
                ease: 'power2'
            },
            onUpdate: () => updateFilterValues(),
            onReverseComplete: () => {
                if (filterType === 'turbulence') {
                    primitiveValuesRef.current.baseFrequency = 0;
                    updateFilterValues();
                }
            }
        });

        if (filterType === 'turbulence') {
            tlRef.current.to(primitiveValuesRef.current, {
                startAt: { baseFrequency: 0.09 },
                baseFrequency: 0
            }, 0);
        } else {
            tlRef.current.to(primitiveValuesRef.current, {
                startAt: { scale: 0 },
                scale: 150
            }, 0);
        }

        if (captionRef.current) {
            tlRef.current.to(captionRef.current, {
                y: '0%'
            }, 0);
        }

        if (captionTitleRef.current && captionLinkRef.current) {
            tlRef.current.to([captionTitleRef.current, captionLinkRef.current], {
                y: 0,
                startAt: { y: 100, opacity: 0 },
                opacity: 1,
                stagger: 0.1
            }, 0);
        }

        const metaElements = [
            metaCounterRef.current,
            metaTitleRef.current,
            ...metaDetailRefs.current
        ].filter(Boolean);

        if (metaElements.length > 0) {
            tlRef.current.to(metaElements, {
                duration: 0.1,
                x: (i: number) => i % 2 === 0 ? '-5%' : '5%',
                opacity: 0,
                stagger: 0.05
            }, 0)
                .to(metaElements, {
                    duration: 0.5,
                    ease: 'power3',
                    startAt: { x: (i: number) => i % 2 === 0 ? '15%' : '-15%' },
                    x: '0%',
                    opacity: 1,
                    stagger: 0.08
                }, 0.1);
        }

        if (navigator.userAgent.indexOf('Firefox') === -1 && svgImageRef.current) {
            tlRef.current.to(svgImageRef.current, {
                scale: 1.2
            }, 0);
        }
    };

    return (
        <div ref={itemRef} className="sf-item">
            <figure ref={thumbRef} className="sf-thumb">
                <svg className="sf-distort" width="350" height="450" viewBox="0 0 350 450" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <filter id={id} data-type={filterType}>
                        <feTurbulence
                            ref={feTurbulenceRef}
                            type={filterType === 'turbulence' ? 'fractalNoise' : (turbulenceProps.type || displacementProps.type || 'fractalNoise')}
                            baseFrequency={filterType === 'turbulence' ? '0' : (turbulenceProps.baseFrequency || displacementProps.baseFrequency || '0.01 0.005')}
                            numOctaves={turbulenceProps.numOctaves || displacementProps.numOctaves || '1'}
                            seed={displacementProps.seed || undefined}
                            result={filterType === 'turbulence' ? 'warp' : 'noise'}
                        />
                        <feDisplacementMap
                            ref={feDisplacementMapRef}
                            xChannelSelector={displacementProps.xChannelSelector || 'R'}
                            yChannelSelector={displacementProps.yChannelSelector || 'G'}
                            scale={filterType === 'turbulence' ? (turbulenceProps.scale || '250') : '0'}
                            in={filterType === 'turbulence' ? 'SourceGraphic' : 'SourceGraphic'}
                            in2={filterType !== 'turbulence' ? 'noise' : undefined}
                            filterUnits={filterType !== 'turbulence' ? 'userSpaceOnUse' : undefined}
                        />
                    </filter>
                    <image
                        ref={svgImageRef}
                        filter={`url(#${id})`}
                        className="sf-distort__img"
                        x="50"
                        y="50"
                        xlinkHref={imageSrc}
                        height="350"
                        width="250"
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
                <p ref={(el) => { if (el) metaDetailRefs.current[0] = el; }} className="sf-item__meta-detail">{location}</p>
                <p ref={(el) => { if (el) metaDetailRefs.current[1] = el; }} className="sf-item__meta-detail">{year}</p>
            </div>
        </div>
    );
}
