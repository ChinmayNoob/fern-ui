import { type Artist } from "./artist";
import { SocialLinks } from "./social-links";
import { motion } from 'motion/react'

export interface ArtistMemberProps {
    artist: Artist;
    isActive: boolean;
    onHover: () => void;
}

export function ArtistMember({ artist, isActive, onHover }: ArtistMemberProps) {
    return (
        <div
            className={`cursor-pointer p-4 sm:p-6 transition-all duration-400 hover:bg-zinc-900/50 ${isActive ? 'bg-zinc-900' : ''} `}
            onMouseEnter={onHover}
            onClick={onHover}
        >
            <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                    <motion.h3
                        className={`mb-1 sm:mb-2 font-serif text-lg sm:text-2xl font-bold tracking-wider transition-colors duration-400 truncate ${isActive ? 'text-zinc-300' : 'text-zinc-700'} `}
                        animate={{ y: isActive ? -5 : 0 }}
                        transition={{ type: "spring", bounce: 0.5, duration: 0.6 }}
                    >
                        {artist.name}
                    </motion.h3>
                    <motion.p
                        className={`font-serif text-sm sm:text-lg tracking-wide text-zinc-400 uppercase`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{
                            height: isActive ? 'auto' : 0,
                            opacity: isActive ? 1 : 0
                        }}
                        transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
                    >
                        {artist.album}
                    </motion.p>
                </div>
                {artist.social && isActive && (
                    <SocialLinks links={artist.social} />
                )}
            </div>
        </div>
    )
}