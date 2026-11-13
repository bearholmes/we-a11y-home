import React from 'react';

export type CardGraphicVariant =
  | 'needs'
  | 'outcome'
  | 'life-bridge'
  | 'multimodal'
  | 'continuous'
  | 'senior'
  | 'sunlight'
  | 'caption-haptic'
  | 'network-resilient'
  | 'device-save'
  | 'one-hand';

interface CardMotionGraphicProps {
  variant: CardGraphicVariant;
}

const CardMotionGraphic: React.FC<CardMotionGraphicProps> = ({ variant }) => {
  const renderSvg = () => {
    switch (variant) {
      case 'needs':
        return (
          <svg viewBox="0 0 88 52" className="cmg-svg" aria-hidden="true">
            {/* Track 1 */}
            <line x1="12" y1="14" x2="76" y2="14" className="cmg-track" />
            <g className="cmg-knob-1">
              <circle cx="30" cy="14" r="5" className="cmg-knob" />
            </g>
            {/* Track 2 */}
            <line x1="12" y1="26" x2="76" y2="26" className="cmg-track" />
            <g className="cmg-knob-2">
              <circle cx="56" cy="26" r="5" className="cmg-knob cmg-knob-accent" />
            </g>
            {/* Track 3 */}
            <line x1="12" y1="38" x2="76" y2="38" className="cmg-track" />
            <g className="cmg-knob-3">
              <circle cx="38" cy="38" r="5" className="cmg-knob" />
            </g>
          </svg>
        );

      case 'outcome':
        return (
          <svg viewBox="0 0 88 52" className="cmg-svg" aria-hidden="true">
            <circle cx="44" cy="26" r="18" className="cmg-ring-bg" />
            <circle cx="44" cy="26" r="18" className="cmg-ring-progress" />
            <circle cx="44" cy="26" r="18" className="cmg-ripple" />
            <path d="M36 26.5 L41.5 32 L52.5 20.5" className="cmg-check-draw" />
          </svg>
        );

      case 'life-bridge':
        return (
          <svg viewBox="0 0 88 52" className="cmg-svg" aria-hidden="true">
            <path
              d="M16 32 C 30 14, 58 14, 72 32"
              className="cmg-bridge-line"
            />
            <path
              d="M16 32 C 30 14, 58 14, 72 32"
              className="cmg-bridge-flow"
            />
            <circle cx="16" cy="32" r="5.5" className="cmg-node cmg-node-pulse-1" />
            <circle cx="44" cy="18.5" r="5.5" className="cmg-node cmg-node-pulse-2" />
            <circle cx="72" cy="32" r="5.5" className="cmg-node cmg-node-pulse-3" />
          </svg>
        );

      case 'multimodal':
        return (
          <svg viewBox="0 0 88 52" className="cmg-svg" aria-hidden="true">
            {/* Sound / voice bars */}
            <rect x="18" y="18" width="4.5" height="16" rx="2.25" className="cmg-wave-bar cmg-wb-1" />
            <rect x="27" y="12" width="4.5" height="28" rx="2.25" className="cmg-wave-bar cmg-wb-2" />
            <rect x="36" y="16" width="4.5" height="20" rx="2.25" className="cmg-wave-bar cmg-wb-3" />
            <rect x="45" y="11" width="4.5" height="30" rx="2.25" className="cmg-wave-bar cmg-wb-4" />
            {/* Haptic / visual pulse rings */}
            <circle cx="64" cy="26" r="5" className="cmg-node" />
            <circle cx="64" cy="26" r="10" className="cmg-haptic-ring cmg-hr-1" />
            <circle cx="64" cy="26" r="15" className="cmg-haptic-ring cmg-hr-2" />
          </svg>
        );

      case 'continuous':
        return (
          <svg viewBox="0 0 88 52" className="cmg-svg" aria-hidden="true">
            <g className="cmg-orbit-spin">
              <circle cx="44" cy="26" r="16" className="cmg-orbit-dashed" />
              <circle cx="44" cy="10" r="3.8" className="cmg-knob cmg-knob-accent" />
              <circle cx="44" cy="42" r="3.8" className="cmg-knob" />
            </g>
            <circle cx="44" cy="26" r="6" className="cmg-core-pulse" />
          </svg>
        );

      case 'senior':
        return (
          <svg viewBox="0 0 88 52" className="cmg-svg" aria-hidden="true">
            <rect x="14" y="11" width="60" height="30" rx="8" className="cmg-card-outline" />
            <g className="cmg-zoom-text">
              <text x="30" y="32" className="cmg-aa-label">
                가A
              </text>
            </g>
            <circle cx="58" cy="25" r="8" className="cmg-lens-move" />
          </svg>
        );

      case 'sunlight':
        return (
          <svg viewBox="0 0 88 52" className="cmg-svg" aria-hidden="true">
            <g className="cmg-sun-spin">
              <circle cx="28" cy="26" r="8" className="cmg-sun-core" />
              <line x1="28" y1="12" x2="28" y2="15" className="cmg-sun-ray" />
              <line x1="28" y1="37" x2="28" y2="40" className="cmg-sun-ray" />
              <line x1="14" y1="26" x2="17" y2="26" className="cmg-sun-ray" />
              <line x1="39" y1="26" x2="42" y2="26" className="cmg-sun-ray" />
              <line x1="18" y1="16" x2="20.5" y2="18.5" className="cmg-sun-ray" />
              <line x1="35.5" y1="33.5" x2="38" y2="36" className="cmg-sun-ray" />
              <line x1="38" y1="16" x2="35.5" y2="18.5" className="cmg-sun-ray" />
              <line x1="20.5" y1="33.5" x2="18" y2="36" className="cmg-sun-ray" />
            </g>
            <rect x="48" y="14" width="26" height="24" rx="5" className="cmg-contrast-box" />
            <rect x="53" y="20" width="16" height="4" rx="2" className="cmg-contrast-bar-1" />
            <rect x="53" y="28" width="11" height="4" rx="2" className="cmg-contrast-bar-2" />
          </svg>
        );

      case 'caption-haptic':
        return (
          <svg viewBox="0 0 88 52" className="cmg-svg" aria-hidden="true">
            {/* Vibration waves left & right */}
            <path d="M15 19 Q11 26 15 33" className="cmg-vibe-wave cmg-vw-1" />
            <path d="M73 19 Q77 26 73 33" className="cmg-vibe-wave cmg-vw-2" />
            {/* Caption bubble */}
            <rect x="22" y="13" width="44" height="26" rx="7" className="cmg-card-outline" />
            <rect x="29" y="20" width="22" height="3.8" rx="1.9" className="cmg-type-line-1" />
            <rect x="29" y="27.5" width="30" height="3.8" rx="1.9" className="cmg-type-line-2" />
          </svg>
        );

      case 'network-resilient':
        return (
          <svg viewBox="0 0 88 52" className="cmg-svg" aria-hidden="true">
            <rect x="18" y="30" width="6" height="9" rx="2" className="cmg-net-bar cmg-nb-1" />
            <rect x="28" y="24" width="6" height="15" rx="2" className="cmg-net-bar cmg-nb-2" />
            <rect x="38" y="18" width="6" height="21" rx="2" className="cmg-net-bar cmg-nb-3" />
            <rect x="48" y="12" width="6" height="27" rx="2" className="cmg-net-bar cmg-nb-4" />
            <circle cx="66" cy="26" r="8.5" className="cmg-sync-badge" />
            <path d="M62.5 26 L65 28.5 L70 23.5" className="cmg-sync-check" />
          </svg>
        );

      case 'device-save':
        return (
          <svg viewBox="0 0 88 52" className="cmg-svg" aria-hidden="true">
            <rect x="18" y="15" width="46" height="22" rx="6" className="cmg-card-outline" />
            <rect x="66" y="21" width="4" height="10" rx="2" className="cmg-battery-cap" />
            <rect x="23" y="20" width="36" height="12" rx="3" className="cmg-battery-fill" />
          </svg>
        );

      case 'one-hand':
        return (
          <svg viewBox="0 0 88 52" className="cmg-svg" aria-hidden="true">
            <path d="M22 42 A 26 26 0 0 1 66 42" className="cmg-thumb-zone" />
            <circle cx="44" cy="28" r="12" className="cmg-tap-ripple" />
            <circle cx="44" cy="28" r="6.5" className="cmg-tap-target" />
          </svg>
        );
    }
  };

  return (
    <div className="card-motion-stage" aria-hidden="true">
      {renderSvg()}
    </div>
  );
};

export default CardMotionGraphic;
