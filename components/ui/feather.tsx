export function Feather({ className, id }: { className?: string; id: string }) {
    return (
      <svg
        viewBox="0 0 160 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <defs>
          <linearGradient id={`fg1-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
          <linearGradient id={`fg2-${id}`} x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="50%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <linearGradient id={`qg-${id}`} x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#ddd6fe" />
            <stop offset="100%" stopColor="#c4b5fd" />
          </linearGradient>
        </defs>
        <path d="M5 30 L155 30" stroke={`url(#qg-${id})`} strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M15 30 L8 18 L20 28 Z" fill={`url(#fg1-${id})`} opacity="0.9" />
        <path d="M28 30 L18 14 L32 27 Z" fill={`url(#fg2-${id})`} opacity="0.95" />
        <path d="M42 30 L30 10 L46 26 Z" fill={`url(#fg1-${id})`} opacity="0.9" />
        <path d="M56 30 L42 8 L60 25 Z" fill={`url(#fg2-${id})`} opacity="0.95" />
        <path d="M70 30 L55 6 L74 24 Z" fill={`url(#fg1-${id})`} opacity="0.9" />
        <path d="M84 30 L68 5 L88 23 Z" fill={`url(#fg2-${id})`} opacity="0.95" />
        <path d="M98 30 L82 6 L102 24 Z" fill={`url(#fg1-${id})`} opacity="0.9" />
        <path d="M112 30 L96 8 L116 25 Z" fill={`url(#fg2-${id})`} opacity="0.95" />
        <path d="M126 30 L112 12 L130 26 Z" fill={`url(#fg1-${id})`} opacity="0.85" />
        <path d="M140 30 L128 16 L144 27 Z" fill={`url(#fg2-${id})`} opacity="0.8" />
        <path d="M152 30 L144 22 L155 28 Z" fill={`url(#fg1-${id})`} opacity="0.75" />
        <path d="M15 30 L8 42 L20 32 Z" fill={`url(#fg2-${id})`} opacity="0.9" />
        <path d="M28 30 L18 46 L32 33 Z" fill={`url(#fg1-${id})`} opacity="0.95" />
        <path d="M42 30 L30 50 L46 34 Z" fill={`url(#fg2-${id})`} opacity="0.9" />
        <path d="M56 30 L42 52 L60 35 Z" fill={`url(#fg1-${id})`} opacity="0.95" />
        <path d="M70 30 L55 54 L74 36 Z" fill={`url(#fg2-${id})`} opacity="0.9" />
        <path d="M84 30 L68 55 L88 37 Z" fill={`url(#fg1-${id})`} opacity="0.95" />
        <path d="M98 30 L82 54 L102 36 Z" fill={`url(#fg2-${id})`} opacity="0.9" />
        <path d="M112 30 L96 52 L116 35 Z" fill={`url(#fg1-${id})`} opacity="0.95" />
        <path d="M126 30 L112 48 L130 34 Z" fill={`url(#fg2-${id})`} opacity="0.85" />
        <path d="M140 30 L128 44 L144 33 Z" fill={`url(#fg1-${id})`} opacity="0.8" />
        <path d="M152 30 L144 38 L155 32 Z" fill={`url(#fg2-${id})`} opacity="0.75" />
        <path d="M155 30 L160 30 L155 28 L155 32 Z" fill={`url(#fg1-${id})`} opacity="0.7" />
      </svg>
    )
  }