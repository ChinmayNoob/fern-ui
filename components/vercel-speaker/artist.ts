import type { StaticImageData } from 'next/image'

export interface Artist {
  id: string;
  name: string;
  image: string | StaticImageData;
  album: string;
  social: {
    twitter?: string
    instagram?: string
  }
}