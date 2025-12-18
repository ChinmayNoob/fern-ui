'use client';

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
                        key={`svg-filter-${index}`}
                        id={`distortionFilter-${index}`}
                        {...item}
                    />
                ))}
            </div>
        </div>
    );
}

// Re-export types and Item component
export { Item, type SvgFilterItemProps };

// Demo data for showcase
export const demoSvgFilterItems: Omit<SvgFilterItemProps, 'id'>[] = [
    {
        filterType: 'turbulence',
        imageSrc: '/images/college-dropout.jpg',
        title: 'Hover to see the turbulence distortion effect animate smoothly.',
        counter: '01',
        metaTitle: 'College Dropout',
        location: 'Kanye West',
        year: '2004',
        turbulenceProps: {
            type: 'fractalNoise',
            baseFrequency: '0',
            numOctaves: '1',
            scale: '250'
        }
    },
    {
        filterType: 'turbulence',
        imageSrc: '/artists/kendrick.png',
        title: 'A different scale creates a more subtle wave-like effect.',
        counter: '02',
        metaTitle: 'Good Kid',
        location: 'Kendrick Lamar',
        year: '2012',
        turbulenceProps: {
            type: 'fractalNoise',
            baseFrequency: '0',
            numOctaves: '1',
            scale: '20'
        }
    },
    {
        filterType: 'displacementMap',
        imageSrc: '/albums/blonde.png',
        title: 'Displacement map creates a liquid-like distortion pattern.',
        counter: '03',
        metaTitle: 'Blonde',
        location: 'Frank Ocean',
        year: '2016',
        displacementProps: {
            type: 'fractalNoise',
            baseFrequency: '0.01 0.005',
            numOctaves: '5',
            seed: '2',
            xChannelSelector: 'R',
            yChannelSelector: 'B'
        }
    },
    {
        filterType: 'displacementMap',
        imageSrc: '/images/mbdtf.jpg',
        title: 'Turbulence type with displacement creates organic movement.',
        counter: '04',
        metaTitle: 'MBDTF',
        location: 'Kanye West',
        year: '2010',
        displacementProps: {
            type: 'turbulence',
            baseFrequency: '0.07 0.01',
            numOctaves: '5',
            seed: '2',
            xChannelSelector: 'R',
            yChannelSelector: 'B'
        }
    },
];

