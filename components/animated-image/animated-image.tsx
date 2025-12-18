export interface AnimatedImageProps {
    src: string
    alt?: string
    size?: number
    duration?: number
}

const AnimatedImage = ({
    src,
    alt = 'Animated Image',
    size = 400,
    duration = 500
}: AnimatedImageProps) => {
    return (
        <div className='overflow-hidden'>
            <img
                src={src}
                alt={alt}
                className='w-full h-full rounded-xl object-cover grayscale scale-100 transition-all hover:grayscale-0 hover:scale-95'
                style={{
                    clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                    width: `${size}px`,
                    height: `${size}px`,
                    transitionDuration: `${duration}ms`
                }}
                onMouseEnter={(e) =>
                (e.currentTarget.style.clipPath =
                    'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)')
                }
                onMouseLeave={(e) =>
                (e.currentTarget.style.clipPath =
                    'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)')
                }
            />
        </div>
    )
}

export default AnimatedImage
