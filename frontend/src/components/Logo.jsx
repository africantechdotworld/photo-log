import React from 'react';

export default function Logo({
  showText = true,
  showTagline = true,
  dark = false,
  animated = false,
  size = 'md',
  layout = 'horizontal',
  className = '',
}) {
  // Sizing styles
  const sizeClasses = {
    xs: 'h-6',
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
    xl: 'h-24',
    '2xl': 'h-32',
  };

  const selectedSizeClass = sizeClasses[size] || size;

  // Colors config based on theme (dark green background vs light cream background)
  const bgColor = dark ? '#1a4d2e' : '#f5f0e8';
  const textColor = dark ? 'text-cream' : 'text-deep-green';

  // Staggered QR block coordinates (scaled to 100x100 viewBox)
  const qrBlocks = [
    { x: 6, y: 32 }, { x: 10, y: 32 }, { x: 14, y: 36 }, { x: 22, y: 32 }, { x: 26, y: 36 }, { x: 30, y: 32 },
    { x: 6, y: 44 }, { x: 10, y: 40 }, { x: 18, y: 40 }, { x: 22, y: 44 }, { x: 30, y: 40 },
    { x: 10, y: 48 }, { x: 14, y: 52 }, { x: 22, y: 48 }, { x: 26, y: 52 }, { x: 30, y: 48 },
    { x: 6, y: 52 }, { x: 18, y: 52 }, { x: 30, y: 56 }
  ];

  return (
    <div className={`flex ${layout === 'vertical' ? 'flex-col items-center' : 'items-center gap-3'} select-none ${className}`}>
      {/* Symbol SVG */}
      <svg
        viewBox="0 0 100 100"
        className={`${selectedSizeClass} w-auto flex-shrink-0`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>{`
          @keyframes aperture-spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes pulse-block {
            0%, 100% { opacity: 0.25; }
            50% { opacity: 1; }
          }
          @keyframes gold-glow {
            0%, 100% { filter: drop-shadow(0 0 1px #D4AF37) brightness(1); }
            50% { filter: drop-shadow(0 0 6px #E8C965) brightness(1.25); }
          }
          .animate-aperture-spin {
            animation: aperture-spin 8s linear infinite;
          }
          .animate-pulse-block {
            animation: pulse-block 1.5s ease-in-out infinite;
          }
          .animate-gold-glow {
            animation: gold-glow 2s ease-in-out infinite;
          }
        `}</style>

        {/* Outer stylized "P" shape + circular cutout */}
        <path
          d="M 34,90 V 26 A 16,16 0 0 1 50,10 H 72 A 26,26 0 0 1 98,36 A 26,26 0 0 1 72,62 H 48 V 90 Z M 68,36 m -16,0 a 16,16 0 1,0 32,0 a 16,16 0 1,0 -32,0"
          fill="currentColor"
          fillRule="evenodd"
          className={dark ? 'text-cream' : 'text-deep-green'}
        />

        {/* Camera Aperture blades inside the cutout centered at (68, 36) */}
        <g className={animated ? 'animate-aperture-spin' : ''} style={{ transformOrigin: '68px 36px' }}>
          {[...Array(6)].map((_, i) => (
            <path
              key={i}
              d="M 0,-15.5 A 15.5,15.5 0 0,1 13.42,-7.75 L 5.2,1 Z"
              transform={`translate(68, 36) rotate(${i * 60})`}
              fill="currentColor"
              className={dark ? 'text-cream' : 'text-deep-green'}
              stroke={bgColor}
              strokeWidth="0.75"
            />
          ))}
        </g>

        {/* QR Code top-left Finder Pattern */}
        <rect
          x="6"
          y="10"
          width="20"
          height="20"
          rx="4"
          fill="currentColor"
          className={dark ? 'text-cream' : 'text-deep-green'}
        />
        <rect
          x="9"
          y="13"
          width="14"
          height="14"
          rx="2"
          fill={bgColor}
        />
        <rect
          x="12"
          y="16"
          width="8"
          height="8"
          rx="1.5"
          fill="#D4AF37"
          className={animated ? 'animate-gold-glow' : ''}
          style={{ transformOrigin: '16px 20px' }}
        />

        {/* QR Code bottom-left Finder Pattern */}
        <rect
          x="6"
          y="60"
          width="20"
          height="20"
          rx="4"
          fill="currentColor"
          className={dark ? 'text-cream' : 'text-deep-green'}
        />
        <rect
          x="9"
          y="63"
          width="14"
          height="14"
          rx="2"
          fill={bgColor}
        />
        <rect
          x="12"
          y="66"
          width="8"
          height="8"
          rx="1.5"
          fill="currentColor"
          className={dark ? 'text-cream' : 'text-deep-green'}
        />

        {/* Small QR Code blocks */}
        {qrBlocks.map((block, i) => (
          <rect
            key={i}
            x={block.x}
            y={block.y}
            width="4"
            height="4"
            rx="1"
            fill="currentColor"
            className={`${dark ? 'text-cream' : 'text-deep-green'} ${animated ? 'animate-pulse-block' : ''}`}
            style={animated ? { animationDelay: `${(i % 5) * 150}ms` } : undefined}
          />
        ))}
      </svg>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col justify-center">
          <span className={`text-xl sm:text-2xl font-bold tracking-tight leading-none ${textColor}`}>
            Photo<span className={dark ? 'text-cream-light' : 'text-emerald'}>Log</span>
          </span>
          {showTagline && (
            <span className={`text-[8px] sm:text-[9px] tracking-[0.2em] font-semibold mt-1 uppercase ${dark ? 'text-deep-gold/90' : 'text-deep-gold'}`}>
              Collect Every Moment
            </span>
          )}
        </div>
      )}
    </div>
  );
}
