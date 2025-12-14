interface LogoProps {
  className?: string
  showText?: boolean
}

function Logo({ className = "w-10 h-10 sm:w-12 sm:h-12", showText = true }: LogoProps) {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <svg
        className={className}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Gradient definition for modern look */}
        <defs>
          <linearGradient id="bagGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'currentColor', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: 'currentColor', stopOpacity: 0.8 }} />
          </linearGradient>
        </defs>
        
        {/* Main shopping bag body with gradient */}
        <path
          d="M20 32 L24 88 C24 92 27 96 32 96 L68 96 C73 96 76 92 76 88 L80 32 Z"
          fill="url(#bagGradient)"
          stroke="currentColor"
          strokeWidth="2"
        />
        
        {/* Bag handle */}
        <path
          d="M33 32 L33 22 C33 13 40 6 50 6 C60 6 67 13 67 22 L67 32"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        
        {/* Top rim of bag */}
        <path
          d="M15 32 L85 32"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
        />
        
        {/* Stylized "J" monogram with serif */}
        <path
          d="M50 45 L50 65 C50 72 45 77 38 77 M48 45 L52 45"
          stroke="white"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        
        {/* Decorative circle accent */}
        <circle cx="50" cy="42" r="3" fill="white" />
      </svg>
      {showText && (
        <span className="text-xl sm:text-2xl font-bold tracking-tight">
          Jeagnz
        </span>
      )}
    </div>
  )
}

export default Logo
