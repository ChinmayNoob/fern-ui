'use client'
import { useState, useCallback, useMemo } from 'react'

interface HoverFlipCardProps {
    children: React.ReactNode
    imageBackground: string
    className?: string
}

const HoverFlipCard = ({ children, imageBackground, className }: HoverFlipCardProps) => {
    const [position, setPosition] = useState({ x: 50, y: 50 })
    const [isHovered, setIsHovered] = useState(false)

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
        const x = ((e.clientX - left) / width) * 100
        const y = ((e.clientY - top) / height) * 100
        setPosition({ x, y })
    }, [])

    const memoizedChildren = useMemo(() => children, [children])

    return (
        <div
            className='relative w-96 h-96 mx-auto mt-20 perspective-[1000px]'
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className={`relative w-full h-full transition-transform duration-500 transform-3d ${isHovered ? 'rotate-y-180' : ''
                    }`}
            >
                <div className={`absolute w-full h-full backface-hidden ${className}`}>
                    {memoizedChildren}
                </div>

                <div
                    className={`absolute w-full h-full backface-hidden rotate-y-180 bg-cover bg-center p-0 overflow-hidden ${className}`}
                    style={{
                        backgroundImage: `url(${imageBackground})`,
                        backgroundPosition: `${position.x}% ${position.y}%`
                    }}
                >
                    {memoizedChildren}
                </div>
            </div>
        </div>
    )
}

export default HoverFlipCard
