import React, { useEffect, useRef } from 'react';
import { useMotionPreference } from '../hooks/useMotionPreference';

interface ParallaxSectionProps {
  backgroundImage: string;
  height?: string;
  text?: string;
  textColor?: string;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  backgroundImage,
  height = '44vh',
  text,
  textColor = 'var(--color-text)',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const waveTopRef = useRef<HTMLDivElement>(null);
  const waveBottomRef = useRef<HTMLDivElement>(null);
  const lineLeftRef = useRef<HTMLSpanElement>(null);
  const lineRightRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const { reducedMotion } = useMotionPreference();

  useEffect(() => {
    if (reducedMotion) {
      if (bgRef.current) bgRef.current.style.transform = 'none';
      if (waveTopRef.current) waveTopRef.current.style.transform = 'none';
      if (waveBottomRef.current) waveBottomRef.current.style.transform = 'none';
      if (lineLeftRef.current) lineLeftRef.current.style.transform = 'scaleX(1)';
      if (lineRightRef.current) lineRightRef.current.style.transform = 'scaleX(1)';
      if (textRef.current) {
        textRef.current.style.transform = 'none';
        textRef.current.style.opacity = '1';
      }
      return;
    }

    let rafId = 0;

    const update = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      if (rect.bottom < -160 || rect.top > vh + 160) return;

      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = vh / 2;
      const normalized = (elementCenter - viewportCenter) / (vh * 0.65);
      const clamped = Math.max(-1, Math.min(1, normalized));
      const focusFactor = Math.max(0, 1 - Math.abs(clamped) * 0.85);

      if (bgRef.current) {
        bgRef.current.style.transform = `translate3d(0, ${(clamped * 46).toFixed(1)}px, 0) scale(1.14)`;
      }

      if (waveTopRef.current) {
        waveTopRef.current.style.transform = `translate3d(${(clamped * -72).toFixed(1)}px, ${(clamped * -22).toFixed(1)}px, 0)`;
      }

      if (waveBottomRef.current) {
        waveBottomRef.current.style.transform = `translate3d(${(clamped * 72).toFixed(1)}px, ${(clamped * 22).toFixed(1)}px, 0)`;
      }

      const lineScale = (0.2 + focusFactor * 0.8).toFixed(3);
      if (lineLeftRef.current) {
        lineLeftRef.current.style.transform = `scaleX(${lineScale})`;
      }
      if (lineRightRef.current) {
        lineRightRef.current.style.transform = `scaleX(${lineScale})`;
      }

      if (textRef.current) {
        const opacity = 0.25 + focusFactor * 0.75;
        const yOffset = clamped * 28;
        const scale = 0.94 + focusFactor * 0.06;
        textRef.current.style.transform = `translate3d(0, ${yOffset.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
        textRef.current.style.opacity = `${opacity.toFixed(3)}`;
      }
    };

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [reducedMotion]);

  return (
    <div ref={containerRef} className="parallax-divider" style={{ height }}>
      <div
        ref={bgRef}
        className="parallax-gradient-bg"
        style={{
          backgroundImage: backgroundImage.includes('gradient')
            ? backgroundImage
            : `url(${backgroundImage})`,
          backgroundSize: backgroundImage.includes('gradient') ? '140% 140%' : 'cover',
        }}
        aria-hidden="true"
      />

      {/* Counter-moving Parallax Ribbon Layers */}
      <div ref={waveTopRef} className="parallax-ribbon parallax-ribbon-top" aria-hidden="true" />
      <div
        ref={waveBottomRef}
        className="parallax-ribbon parallax-ribbon-bottom"
        aria-hidden="true"
      />

      {text && (
        <div className="container parallax-text-wrap">
          <div className="parallax-accent-row" aria-hidden="true">
            <span ref={lineLeftRef} className="parallax-accent-line origin-right" />
            <span className="parallax-accent-dot" />
            <span ref={lineRightRef} className="parallax-accent-line origin-left" />
          </div>
          <h2 ref={textRef} className="parallax-heading" style={{ color: textColor }}>
            {text}
          </h2>
        </div>
      )}
    </div>
  );
};

export default ParallaxSection;
