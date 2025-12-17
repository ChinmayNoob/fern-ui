'use client'
import { useState, useEffect } from 'react'
import { type Artist } from '@/components/vercel-speaker/artist'

export const useArtist = () => {
    const [artists, setArtists] = useState<Artist[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const mockData: Artist[] = [
            {
                id: crypto.randomUUID(),
                name: 'KENDRICK LAMAR',
                image: '/artists/kendrick.png',
                album: 'TO PIMP A BUTTERFLY',
                social: {
                    twitter: 'https://x.com/kendricklamar',
                    instagram: 'https://www.instagram.com/kendricklamar/',
                },
            },
            {
                id: crypto.randomUUID(),
                name: 'A$AP ROCKY',
                image: '/artists/rocky.jpg',
                album: 'AT.LONG.LAST.A$AP',
                social: {
                    twitter: 'https://x.com/asvpxrocky',
                    instagram: 'https://www.instagram.com/asaprocky/',
                },
            },
            {
                id: crypto.randomUUID(),
                name: 'J. COLE',
                image: '/artists/cole.png',
                album: '2014 FOREST HILL',
                social: {
                    twitter: 'https://x.com/JColeNC',
                    instagram: 'https://www.instagram.com/realcoleworld/',
                },
            },
            {
                id: crypto.randomUUID(),
                name: 'PLAYBOI CARTI',
                image: '/artists/carti.png',
                album: 'WHOLE LOTTA RED',
                social: {
                    twitter: 'https://x.com/playboicarti',
                    instagram: 'https://www.instagram.com/playboicarti/',
                },
            },
            {
                id: crypto.randomUUID(),
                name: 'FRANK OCEAN',
                image: '/artists/frank.jpg',
                album: 'BLONDE',
                social: {
                    twitter: 'https://chinmaynoob-porfolio-v1.vercel.app/',
                    instagram: 'https://chinmaynoob-porfolio-v1.vercel.app/',
                },
            },
            {
                id: crypto.randomUUID(),
                name: 'TYLER, THE CREATOR',
                image: '/artists/tyler.jpg',
                album: 'CHROMAKOPIA',
                social: {
                    twitter: 'https://chinmaynoob-porfolio-v1.vercel.app/',
                    instagram: 'https://chinmaynoob-porfolio-v1.vercel.app/',
                },
            },
        ]

        setTimeout(() => {
            setArtists(mockData)
            setLoading(false)
        }, 1000)
    }, [])

    return { artists, loading }
}
