/**
 * Static geometric stand-in for the Skill Core. Shown while the WebGL
 * scene loads, when WebGL is unavailable, and for reduced-motion visitors.
 * Pure SVG — no hooks, no browser APIs.
 */
export function SkillCoreFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center md:justify-end md:pr-[8vw]">
      <svg
        viewBox="0 0 480 480"
        className="h-[min(72vw,420px)] w-[min(72vw,420px)] max-w-full md:h-[min(38vw,560px)] md:w-[min(38vw,560px)]"
        role="presentation"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00dfdf" stopOpacity="0.18" />
            <stop offset="45%" stopColor="#006464" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#004040" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient glow */}
        <circle cx="240" cy="240" r="230" fill="url(#core-glow)" />

        {/* Orbit paths */}
        <ellipse
          cx="240"
          cy="240"
          rx="204"
          ry="82"
          fill="none"
          stroke="rgba(176,228,204,0.14)"
          strokeWidth="1"
          transform="rotate(-18 240 240)"
        />
        <ellipse
          cx="240"
          cy="240"
          rx="182"
          ry="120"
          fill="none"
          stroke="rgba(176,228,204,0.1)"
          strokeWidth="1"
          strokeDasharray="3 7"
          transform="rotate(32 240 240)"
        />

        {/* Icosahedral shell — hexagonal projection with internal edges */}
        <g
          stroke="rgba(176,228,204,0.34)"
          strokeWidth="1"
          fill="rgba(13,27,24,0.35)"
        >
          <polygon points="240,98 363,169 363,311 240,382 117,311 117,169" />
          <path
            d="M240,98 L240,240 M363,169 L240,240 M363,311 L240,240 M240,382 L240,240 M117,311 L240,240 M117,169 L240,240"
            fill="none"
            stroke="rgba(176,228,204,0.18)"
          />
          <path
            d="M240,98 L363,311 M363,169 L240,382 M240,382 L117,169 M117,311 L240,98"
            fill="none"
            stroke="rgba(64,138,113,0.22)"
          />
        </g>

        {/* Inner particle field, abstracted as dots */}
        <g fill="#00dfdf">
          <circle cx="240" cy="240" r="3.5" fillOpacity="0.9" />
          <circle cx="214" cy="222" r="1.6" fillOpacity="0.55" />
          <circle cx="266" cy="218" r="1.4" fillOpacity="0.5" />
          <circle cx="252" cy="266" r="1.8" fillOpacity="0.6" />
          <circle cx="222" cy="258" r="1.2" fillOpacity="0.45" />
          <circle cx="240" cy="196" r="1.5" fillOpacity="0.5" />
          <circle cx="196" cy="244" r="1.3" fillOpacity="0.4" />
          <circle cx="284" cy="246" r="1.5" fillOpacity="0.45" />
          <circle cx="262" cy="290" r="1.2" fillOpacity="0.35" />
          <circle cx="208" cy="286" r="1.3" fillOpacity="0.35" />
        </g>
        <g fill="#b0e4cc">
          <circle cx="230" cy="212" r="1" fillOpacity="0.5" />
          <circle cx="258" cy="238" r="1.1" fillOpacity="0.5" />
          <circle cx="226" cy="242" r="0.9" fillOpacity="0.45" />
          <circle cx="246" cy="222" r="0.9" fillOpacity="0.4" />
          <circle cx="236" cy="272" r="1" fillOpacity="0.4" />
        </g>

        {/* Orbiting nodes */}
        <g>
          <rect
            x="52"
            y="196"
            width="8"
            height="8"
            fill="#0d1b18"
            stroke="rgba(176,228,204,0.5)"
            transform="rotate(45 56 200)"
          />
          <rect
            x="416"
            y="262"
            width="8"
            height="8"
            fill="#0d1b18"
            stroke="rgba(176,228,204,0.5)"
            transform="rotate(45 420 266)"
          />
          <rect
            x="330"
            y="106"
            width="7"
            height="7"
            fill="#0d1b18"
            stroke="rgba(0,223,223,0.6)"
            transform="rotate(45 333.5 109.5)"
          />
          <rect
            x="150"
            y="356"
            width="7"
            height="7"
            fill="#0d1b18"
            stroke="rgba(176,228,204,0.4)"
            transform="rotate(45 153.5 359.5)"
          />
        </g>

        {/* Connections */}
        <g stroke="rgba(0,223,223,0.25)" strokeWidth="1">
          <line x1="60" y1="200" x2="150" y2="222" />
          <line x1="333" y1="110" x2="290" y2="180" />
          <line x1="418" y1="264" x2="350" y2="258" strokeDasharray="2 6" />
        </g>
      </svg>
    </div>
  );
}
