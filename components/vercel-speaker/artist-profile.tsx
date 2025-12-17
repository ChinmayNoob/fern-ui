'use client'
import { type Artist } from "./artist";
import { motion } from "motion/react";
import Image from "next/image";

interface ArtistProfileProps {
    artist: Artist;
}

export function ArtistProfile({ artist }: ArtistProfileProps) {
    return (
        <div className="absolute inset-0">
            {artist.image ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    key={typeof artist.image === "string" ? artist.image : artist.image.src}
                    className="h-full w-full"
                >
                    <Image
                        src={artist.image}
                        alt={artist.name}
                        className="h-full w-full object-cover"
                        fill
                    />
                </motion.div>
            ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-zinc-800">
                    <span className="text-6xl font-bold text-zinc-400">
                        {artist.name.charAt(0)}
                    </span>
                </div>
            )}
        </div>
    )
}