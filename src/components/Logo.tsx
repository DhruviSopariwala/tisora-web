"use client";

interface LogoProps {
  color?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showTagline?: boolean;
  taglineColor?: string;
  className?: string;
}

const sizes = {
  sm:  { width: 80,  fontSize: 18, tagSize: 7,  tagSpacing: "0.3em" },
  md:  { width: 110, fontSize: 24, tagSize: 8,  tagSpacing: "0.35em" },
  lg:  { width: 150, fontSize: 34, tagSize: 10, tagSpacing: "0.4em" },
  xl:  { width: 220, fontSize: 50, tagSize: 13, tagSpacing: "0.45em" },
};

export default function Logo({
  color = "#0E5A43",
  size = "md",
  showTagline = false,
  taglineColor = "#A9C3A2",
  className = "",
}: LogoProps) {
  const s = sizes[size];
  const height = showTagline ? s.fontSize * 1.3 + s.tagSize * 2.8 : s.fontSize * 1.2;

  return (
    <svg
      viewBox={`0 0 ${s.width} ${height}`}
      width={s.width}
      height={height}
      className={className}
      aria-label="TISORA logo"
      role="img"
    >
      {/* TISORA wordmark — bold, tight, all-caps */}
      <text
        x="0"
        y={s.fontSize}
        fill={color}
        fontSize={s.fontSize}
        fontWeight="800"
        fontFamily="'Montserrat', 'Arial Black', sans-serif"
        letterSpacing="-0.01em"
        dominantBaseline="auto"
      >
        TISORA
      </text>

      {/* Optional tagline */}
      {showTagline && (
        <text
          x="0"
          y={s.fontSize + s.tagSize * 2.2}
          fill={taglineColor}
          fontSize={s.tagSize}
          fontWeight="600"
          fontFamily="'Montserrat', sans-serif"
          letterSpacing={s.tagSpacing}
          dominantBaseline="auto"
        >
          YOUR DAILY RESET DRINK
        </text>
      )}
    </svg>
  );
}
