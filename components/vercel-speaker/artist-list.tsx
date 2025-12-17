'use client'
import { type Artist } from "./artist";
import { useState } from "react";
import { ArtistMember } from "./artist-member";
import { ArtistProfile } from "./artist-profile";

interface ArtistListProps {
    artists: Artist[];
}

export function ArtistList({ artists }: ArtistListProps) {
    const [activeArtist, setActiveArtist] = useState<Artist | null>(artists[0] || null);
    const handleHover = (artist: Artist) => {
        setActiveArtist(artist);
    }

    return (
        <div className="flex flex-col md:flex-row md:items-stretch md:divide-x divide-zinc-800">
            {/* Mobile: Show active artist profile at top */}
            <div className="relative aspect-video md:hidden">
                {activeArtist && <ArtistProfile artist={activeArtist} />}
            </div>

            {/* Artist list */}
            <div className="w-full md:w-3/5 min-w-0 divide-y divide-zinc-800">
                {artists.map((artist) => (
                    <ArtistMember
                        key={artist.id}
                        artist={artist}
                        isActive={activeArtist?.id === artist.id}
                        onHover={() => handleHover(artist)}
                    />
                ))}
            </div>

            {/* Desktop: Show active artist profile on right */}
            <div className="relative hidden md:block md:w-2/5 shrink-0 min-h-[400px]">
                {activeArtist && <ArtistProfile artist={activeArtist} />}
            </div>
        </div>
    )
}