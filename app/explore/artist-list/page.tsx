'use client'

import { useArtist } from "@/hooks/use-artist"
import { ArtistList } from "@/components/vercel-speaker/artist-list"
import { CodeBlock } from "@/components/ui/code-block"
import { ComponentPreview } from "@/components/ui/component-preview"
import { Loader } from "lucide-react"
import Link from "next/link"

const usageCode = `import { useArtist } from "@/hooks/use-artist"
import { ArtistList } from "@/components/vercel-speaker/artist-list"
import { Loader } from "lucide-react"

export default function ArtistPage() {
  const { artists, loading } = useArtist()

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader className="animate-spin text-4xl text-zinc-400" />
      </div>
    )
  }

  return (
    <div className="overflow-hidden border border-zinc-800">
      <ArtistList artists={artists} />
    </div>
  )
}`

const artistListSource = `'use client'
import { type Artist } from "./artist"
import { useState } from "react"
import { ArtistMember } from "./artist-member"
import { ArtistProfile } from "./artist-profile"

interface ArtistListProps {
  artists: Artist[]
}

export function ArtistList({ artists }: ArtistListProps) {
  const [activeArtist, setActiveArtist] = useState<Artist | null>(artists[0] || null)

  const handleHover = (artist: Artist) => {
    setActiveArtist(artist)
  }

  return (
    <div className="flex flex-col md:flex-row md:items-stretch md:divide-x divide-zinc-800">
      {/* Mobile: Show active artist profile at top */}
      <div className="relative aspect-[16/9] md:hidden">
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
      <div className="relative hidden md:block md:w-2/5 flex-shrink-0 min-h-[400px]">
        {activeArtist && <ArtistProfile artist={activeArtist} />}
      </div>
    </div>
  )
}`

const artistMemberSource = `import { type Artist } from "./artist"
import { SocialLinks } from "./social-links"
import { motion } from 'motion/react'

export interface ArtistMemberProps {
  artist: Artist
  isActive: boolean
  onHover: () => void
}

export function ArtistMember({ artist, isActive, onHover }: ArtistMemberProps) {
  return (
    <div
      className={\`cursor-pointer p-4 sm:p-6 transition-all duration-400 hover:bg-zinc-900/50 \${isActive ? 'bg-zinc-900' : ''}\`}
      onMouseEnter={onHover}
      onClick={onHover}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <motion.h3
            className={\`mb-1 sm:mb-2 font-courier-prime text-lg sm:text-2xl font-bold tracking-wider transition-colors duration-400 truncate \${isActive ? 'text-zinc-300' : 'text-zinc-700'}\`}
            animate={{ y: isActive ? -5 : 0 }}
            transition={{ type: "spring", bounce: 0.5, duration: 0.6 }}
          >
            {artist.name}
          </motion.h3>
          <motion.p
            className="font-courier-prime text-sm sm:text-lg tracking-wide text-zinc-400 uppercase"
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
}`

const artistProfileSource = `'use client'
import { type Artist } from "./artist"
import { motion } from "motion/react"
import Image from "next/image"

interface ArtistProfileProps {
  artist: Artist
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
}`

const artistTypeSource = `import type { StaticImageData } from 'next/image'

export interface Artist {
  id: string
  name: string
  image: string | StaticImageData
  album: string
  social: {
    twitter?: string
    instagram?: string
  }
}`

const socialLinksSource = `import { type Artist } from "./artist"
import { motion } from "motion/react"
import { Twitter, Instagram } from "lucide-react"

interface SocialLinksProps {
  links: Artist['social']
}

const iconVariants = {
  hover: {
    rotate: [0, -10, 10, -10, 0],
    transition: { duration: 0.5 },
  },
}

export function SocialLinks({ links }: SocialLinksProps) {
  if (!links) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="ml-2 sm:ml-4 flex gap-2 sm:gap-3 flex-shrink-0"
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
}`

const useArtistSource = `'use client'

import { useState, useEffect } from 'react'
import { type Artist } from '@/components/vercel-speaker/artist'

// Sample artist data - in a real app, this would come from an API
const sampleArtists: Artist[] = [
  {
    id: '1',
    name: 'Kendrick Lamar',
    image: '/artists/kendrick.png',
    album: 'GNX',
    social: {
      twitter: 'https://twitter.com/kendricklamar',
      instagram: 'https://instagram.com/kendricklamar',
    },
  },
  // ... more artists
]

interface UseArtistReturn {
  artists: Artist[]
  loading: boolean
  error: Error | null
}

export function useArtist(): UseArtistReturn {
  const [artists, setArtists] = useState<Artist[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        setLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 500))
        setArtists(sampleArtists)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch artists'))
      } finally {
        setLoading(false)
      }
    }

    fetchArtists()
  }, [])

  return { artists, loading, error }
}`

const sourceFiles = [
  {
    filename: "artist-list.tsx",
    code: artistListSource,
    language: "tsx",
  },
  {
    filename: "artist-member.tsx",
    code: artistMemberSource,
    language: "tsx",
  },
  {
    filename: "artist-profile.tsx",
    code: artistProfileSource,
    language: "tsx",
  },
  {
    filename: "artist.ts",
    code: artistTypeSource,
    language: "typescript",
  },
  {
    filename: "social-links.tsx",
    code: socialLinksSource,
    language: "tsx",
  },
  {
    filename: "use-artist.ts (hook)",
    code: useArtistSource,
    language: "typescript",
  },
]

export default function ArtistListPage() {
  const { artists, loading } = useArtist()

  return (
    <div className="space-y-16">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">
          Components / Artist List
        </div>
        <h1 className="font-serif text-4xl tracking-tight">Artist List</h1>
        <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
          An interactive artist showcase component with hover-activated profiles. Features smooth
          spring animations, social links, and a responsive layout that adapts beautifully across
          all screen sizes.
        </p>
        <p className="text-xs text-muted-foreground">
          Inspired by{" "}
          <Link
            href="https://vercel.com/ship"
            target="_blank"
            className="underline underline-offset-2 hover:text-foreground transition-colors"
          >
            Vercel Ship 2025
          </Link>
        </p>
      </div>

      {/* Preview */}
      <section className="space-y-4">
        <h2 className="text-lg font-medium">Preview</h2>
        <ComponentPreview className="min-h-[500px] p-0 bg-zinc-950 items-stretch">
          {loading ? (
            <div className="flex h-full w-full items-center justify-center">
              <Loader className="w-10 h-10 animate-spin text-zinc-400" />
            </div>
          ) : (
            <div className="w-full overflow-hidden">
              <ArtistList artists={artists} />
            </div>
          )}
        </ComponentPreview>
      </section>

      {/* Usage */}
      <section className="space-y-4">
        <h2 className="text-lg font-medium">Usage</h2>
        <CodeBlock code={usageCode} language="tsx" />
      </section>

      {/* Features */}
      <section className="space-y-4">
        <h2 className="text-lg font-medium">Features</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-foreground">•</span>
            <span><strong>Hover interactions</strong> — Artist profiles reveal on hover with smooth transitions</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-foreground">•</span>
            <span><strong>Spring animations</strong> — Bouncy, natural-feeling motion using Motion library</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-foreground">•</span>
            <span><strong>Mobile responsive</strong> — Profile image moves to top on smaller screens with tap support</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-foreground">•</span>
            <span><strong>Social links</strong> — Animated icon wobble effect on hover</span>
          </li>
        </ul>
      </section>

      {/* Props */}
      <section className="space-y-4">
        <h2 className="text-lg font-medium">Props</h2>
        <div className="overflow-x-auto">
          <div className="overflow-hidden border border-foreground/10 min-w-[500px]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-foreground/5 bg-foreground/[0.02]">
                  <th className="px-4 py-3 text-left font-medium">Component</th>
                  <th className="px-4 py-3 text-left font-medium">Prop</th>
                  <th className="px-4 py-3 text-left font-medium">Type</th>
                  <th className="px-4 py-3 text-left font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-foreground/5">
                <tr>
                  <td className="px-4 py-3 font-mono text-xs">ArtistList</td>
                  <td className="px-4 py-3 font-mono text-xs">artists</td>
                  <td className="px-4 py-3 text-muted-foreground">Artist[]</td>
                  <td className="px-4 py-3 text-muted-foreground">Array of artist objects</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs">ArtistMember</td>
                  <td className="px-4 py-3 font-mono text-xs">artist</td>
                  <td className="px-4 py-3 text-muted-foreground">Artist</td>
                  <td className="px-4 py-3 text-muted-foreground">Individual artist data</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs">ArtistMember</td>
                  <td className="px-4 py-3 font-mono text-xs">isActive</td>
                  <td className="px-4 py-3 text-muted-foreground">boolean</td>
                  <td className="px-4 py-3 text-muted-foreground">Whether this artist is selected</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs">ArtistMember</td>
                  <td className="px-4 py-3 font-mono text-xs">onHover</td>
                  <td className="px-4 py-3 text-muted-foreground">() =&gt; void</td>
                  <td className="px-4 py-3 text-muted-foreground">Callback when hovered/clicked</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs">ArtistProfile</td>
                  <td className="px-4 py-3 font-mono text-xs">artist</td>
                  <td className="px-4 py-3 text-muted-foreground">Artist</td>
                  <td className="px-4 py-3 text-muted-foreground">Artist to display profile image</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Artist Type */}
      <section className="space-y-4">
        <h2 className="text-lg font-medium">Artist Type</h2>
        <p className="text-sm text-muted-foreground">
          The <code className="bg-foreground/5 px-1.5 py-0.5 text-xs">Artist</code> interface defines the shape of each artist object.
        </p>
        <CodeBlock code={artistTypeSource} language="typescript" filename="artist.ts" />
      </section>

      {/* Dependencies */}
      <section className="space-y-4">
        <h2 className="text-lg font-medium">Dependencies</h2>
        <p className="text-sm text-muted-foreground">
          This component requires the following packages:
        </p>
        <CodeBlock
          code={`pnpm add motion lucide-react react-icons`}
          language="bash"
        />
      </section>

      {/* Source */}
      <section className="space-y-4">
        <h2 className="text-lg font-medium">Source Code</h2>
        <p className="text-sm text-muted-foreground">
          This component requires 6 files. Copy them into your{" "}
          <code className="bg-foreground/5 px-1.5 py-0.5 text-xs">components/vercel-speaker/</code> folder
          and the hook into <code className="bg-foreground/5 px-1.5 py-0.5 text-xs">hooks/</code>.
        </p>
        <CodeBlock files={sourceFiles} />
      </section>
    </div>
  )
}

