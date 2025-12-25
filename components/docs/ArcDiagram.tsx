export function ArcDiagram() {
  // Generate static grid paths instead of using Array.from().map()
  const verticalLines = Array.from({ length: 17 }, (_, i) => (
    <path key={`v-${i}`} d={`M ${20 + i * 52} 18 V 302`} />
  ));
  const horizontalLines = Array.from({ length: 7 }, (_, i) => (
    <path key={`h-${i}`} d={`M 20  ${18 + i * 48} H 900`} />
  ));

  return (
    <div className="w-full">
      <svg
        viewBox="0 0 920 320"
        className="w-full h-auto max-h-[320px]"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="ARC retain cycle diagram showing ViewController and Closure with strong reference cycle"
      >
        <defs>
          <marker
            id="arrow"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="5"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(255,255,255,0.6)" />
          </marker>
          <marker
            id="arrowAccent"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="5"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#a855f7" />
          </marker>
        </defs>

        <g fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1">
          {verticalLines}
          {horizontalLines}
        </g>

        <g>
          <rect
            x="90"
            y="72"
            width="260"
            height="176"
            rx="18"
            fill="rgba(42,45,62,0.8)"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1.5"
          />
          <text
            x="220"
            y="118"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="16"
            fontFamily="var(--font-sans)"
            fontWeight="600"
          >
            ViewController
          </text>
          <text
            x="220"
            y="144"
            textAnchor="middle"
            fill="rgba(255,255,255,0.7)"
            fontSize="12"
            fontFamily="var(--font-mono)"
          >
            owns closure property
          </text>
          <circle cx="220" cy="206" r="10" fill="rgba(168,85,247,0.2)" />
          <circle cx="220" cy="206" r="3" fill="#a855f7" />
        </g>

        <g>
          <rect
            x="570"
            y="72"
            width="260"
            height="176"
            rx="18"
            fill="rgba(42,45,62,0.8)"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1.5"
          />
          <text
            x="700"
            y="118"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="16"
            fontFamily="var(--font-sans)"
            fontWeight="600"
          >
            Closure
          </text>
          <text
            x="700"
            y="144"
            textAnchor="middle"
            fill="rgba(255,255,255,0.7)"
            fontSize="12"
            fontFamily="var(--font-mono)"
          >
            captures self
          </text>
          <circle cx="700" cy="206" r="10" fill="rgba(168,85,247,0.2)" />
          <circle cx="700" cy="206" r="3" fill="#a855f7" />
        </g>

        <path
          d="M 350 132 C 430 90, 500 90, 570 132"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="2.5"
          markerEnd="url(#arrow)"
          fill="none"
        />
        <text
          x="460"
          y="90"
          textAnchor="middle"
          fill="rgba(255,255,255,0.7)"
          fontSize="12"
          fontFamily="var(--font-mono)"
          fontWeight="500"
        >
          strong
        </text>

        <path
          d="M 570 192 C 500 236, 430 236, 350 192"
          stroke="#a855f7"
          strokeWidth="2.5"
          markerEnd="url(#arrowAccent)"
          fill="none"
        />
        <text
          x="460"
          y="262"
          textAnchor="middle"
          fill="#a855f7"
          fontSize="12"
          fontFamily="var(--font-mono)"
          fontWeight="500"
        >
          strong capture of self
        </text>
      </svg>
    </div>
  );
}

