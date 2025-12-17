import { type Artist } from "./artist";
import { motion } from "motion/react";
import { Twitter, Instagram } from "lucide-react";

interface SocialLinksProps {
    links: Artist['social'];
}

const iconVariants = {
    hover: {
        rotate: [0, -10, 10, -10, 0],
        transition: { duration: 0.5 },
    },
};

export function SocialLinks({ links }: SocialLinksProps) {
    if (!links) return null

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="ml-2 sm:ml-4 flex gap-2 sm:gap-3 shrink-0"
        >
            {links.twitter && (
                <motion.a
                    href={links.twitter}
                    className="text-zinc-400 transition-colors duration-400 hover:text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover="hover"
                >
                    <motion.span className="inline-block" variants={iconVariants}>
                        <Twitter className="w-4 h-4 sm:w-6 sm:h-6" />
                    </motion.span>
                </motion.a>
            )}
            {links.instagram && (
                <motion.a
                    href={links.instagram}
                    className="text-zinc-400 transition-colors duration-400 hover:text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover="hover"
                >
                    <motion.span className="inline-block" variants={iconVariants}>
                        <Instagram className="w-4 h-4 sm:w-6 sm:h-6" />
                    </motion.span>
                </motion.a>
            )}
        </motion.div>
    )
}