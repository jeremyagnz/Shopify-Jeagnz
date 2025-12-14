interface LogoProps {
  className?: string
}

function Logo({ className = "w-7 h-7 sm:w-8 sm:h-8" }: LogoProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Shopping bag icon with "J" monogram */}
      <path
        d="M20 30 L25 85 C25 90 28 95 33 95 L67 95 C72 95 75 90 75 85 L80 30 Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M35 30 L35 20 C35 12 42 5 50 5 C58 5 65 12 65 20 L65 30"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M15 30 L85 30"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* "J" monogram */}
      <text
        x="50"
        y="65"
        fontSize="36"
        fontWeight="bold"
        textAnchor="middle"
        fill="white"
        style={{ fontFamily: 'inherit' }}
      >
        J
      </text>
    </svg>
  )
}

export default Logo
