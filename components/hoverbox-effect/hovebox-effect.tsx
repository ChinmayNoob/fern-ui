'use client'
import { useState, useLayoutEffect, useRef } from 'react'

interface HoverBoxEffectProps {
    children: React.ReactNode
    perspective?: string
    transitionDuration?: number
    grayscale?: boolean
}

const HoverBoxEffect = ({
    children,
    perspective = '3000px',
    transitionDuration = 500,
    grayscale = true
}: HoverBoxEffectProps) => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
    const [reduceMotion, setReduceMotion] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const childRef = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        const updateDimensions = () => {
            if (childRef.current) {
                const { offsetWidth: width, offsetHeight: height } = childRef.current
                setDimensions({ width, height })
            }
        }

        const observer = new ResizeObserver(updateDimensions)
        if (childRef.current) observer.observe(childRef.current)

        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        setReduceMotion(mediaQuery.matches)
        const motionHandler = (e: MediaQueryListEvent) => setReduceMotion(e.matches)
        mediaQuery.addEventListener('change', motionHandler)

        return () => {
            observer.disconnect()
            mediaQuery.removeEventListener('change', motionHandler)
        }
    }, [])

    const frontTransform = `translateZ(${dimensions.height / 2}px)`
    const backTransform = `rotateX(-90deg) translateZ(${dimensions.height / 2}px)`

    const handleHover = (state: boolean) => {
        setIsHovered(state)
    }

    return (
        <>
            <div style={{ visibility: 'hidden', position: 'absolute' }}>
                <div ref={childRef}>{children}</div>
            </div>

            <div
                style={{
                    perspective,
                    width: dimensions.width,
                    height: dimensions.height,
                    margin: '0 auto'
                }}
            >
                <div
                    style={{
                        transformStyle: 'preserve-3d',
                        transition: reduceMotion
                            ? 'none'
                            : `transform ${transitionDuration}ms ease-in-out`,
                        transform: isHovered ? 'rotateX(90deg)' : 'none',
                        height: '100%',
                        width: '100%',
                        position: 'relative'
                    }}
                    onMouseEnter={() => handleHover(true)}
                    onMouseLeave={() => handleHover(false)}
                >
                    <div
                        style={{
                            transform: frontTransform,
                            backfaceVisibility: 'hidden',
                            filter: grayscale ? 'grayscale(1)' : 'none',
                            position: 'absolute',
                            width: '100%',
                            height: '100%'
                        }}
                    >
                        {children}
                    </div>

                    <div
                        style={{
                            transform: backTransform,
                            backfaceVisibility: 'hidden',
                            position: 'absolute',
                            width: '100%',
                            height: '100%'
                        }}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default HoverBoxEffect
