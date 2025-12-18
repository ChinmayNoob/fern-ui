'use client'
import { useRef, useEffect, useCallback, ReactNode } from 'react'

export interface TiltCardProps {
    children: ReactNode
    maxRotation?: number
    perspective?: number
    scaleOnHover?: number
}

const TiltCard = ({
    children,
    maxRotation = 3,
    perspective = 300,
    scaleOnHover = 1.02
}: TiltCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null)
    const rafId = useRef<number | null>(null)
    const dimensions = useRef({ width: 0, height: 0 })

    const updateDimensions = useCallback(() => {
        if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect()
            dimensions.current = {
                width: rect.width,
                height: rect.height
            }
        }
    }, [])

    useEffect(() => {
        updateDimensions()
        window.addEventListener('resize', updateDimensions)
        return () => {
            window.removeEventListener('resize', updateDimensions)
            if (rafId.current) cancelAnimationFrame(rafId.current)
        }
    }, [updateDimensions])

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (!cardRef.current) return

            if (rafId.current) cancelAnimationFrame(rafId.current)

            rafId.current = requestAnimationFrame(() => {
                if (!cardRef.current) return

                const { width, height } = dimensions.current
                const centerX = width / 2
                const centerY = height / 2

                const rect = cardRef.current.getBoundingClientRect()
                const x = e.clientX - rect.left
                const y = e.clientY - rect.top

                const rotateY = ((x - centerX) / centerX) * maxRotation
                const rotateX = -((y - centerY) / centerY) * maxRotation

                cardRef.current.style.transform = `
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale3d(${scaleOnHover}, ${scaleOnHover}, ${scaleOnHover})
      `
            })
        },
        [maxRotation, scaleOnHover]
    )

    const handleMouseLeave = useCallback(() => {
        if (rafId.current) cancelAnimationFrame(rafId.current)
        if (cardRef.current) {
            cardRef.current.style.transform = `
      rotateX(0deg)
      rotateY(0deg)
      scale3d(1, 1, 1)
    `
        }
    }, [])

    return (
        <div style={{ perspective: `${perspective}px` }} className=''>
            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className='transition-transform duration-300 ease-out'
            >
                {children}
            </div>
        </div>
    )
}

export default TiltCard
