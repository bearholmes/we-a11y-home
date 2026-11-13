import React, { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { useMotionPreference } from '../hooks/useMotionPreference';

interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  logoImage?: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, backgroundImage, logoImage }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useMotionPreference();

  useEffect(() => {
    if (reducedMotion) {
      if (contentRef.current) {
        contentRef.current.style.transform = 'none';
        contentRef.current.style.opacity = '1';
      }
      if (auraRef.current) {
        auraRef.current.style.transform = 'none';
      }
      return;
    }

    let rafId = 0;

    const update = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight || 800;
      if (scrollY > vh * 1.15) return;

      const ratio = Math.min(1, Math.max(0, scrollY / (vh * 0.78)));

      if (contentRef.current) {
        const yOffset = scrollY * 0.22;
        const scale = 1 - ratio * 0.05;
        const opacity = Math.max(0, 1 - ratio * 1.05);
        contentRef.current.style.transform = `translate3d(0, ${yOffset.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
        contentRef.current.style.opacity = `${opacity.toFixed(3)}`;
      }

      if (auraRef.current) {
        auraRef.current.style.transform = `translate3d(0, ${(scrollY * 0.1).toFixed(1)}px, 0) scale(${(1 + ratio * 0.12).toFixed(3)})`;
      }
    };

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [reducedMotion]);

  return (
    <header id="hero-top" className="hero-section">
      <div
        className="hero-background"
        style={{
          background: backgroundImage
            ? backgroundImage.includes('gradient')
              ? backgroundImage
              : `url(${backgroundImage}) center/cover`
            : `
              radial-gradient(circle at 20% 30%, rgba(208, 138, 78, 0.2) 0, transparent 48%),
              radial-gradient(circle at 80% 70%, rgba(240, 203, 122, 0.2) 0, transparent 45%),
              linear-gradient(120deg, #fffaf3 0%, #f3e7d8 45%, #d3b898 100%)
            `,
          backgroundSize: backgroundImage?.includes('gradient') ? '140% 140%' : 'cover',
        }}
        aria-hidden="true"
      />
      <div ref={auraRef} className="hero-focus-aura" aria-hidden="true" />

      <div ref={contentRef} className="hero-content container">
        {logoImage && (
          <div className="hero-logo-stage hero-enter-1">
            <img
              src={logoImage}
              alt="We A11y 로고 - 하트 모양 안에 접근성을 의미하는 a11y 텍스트"
              className="hero-logo-img"
            />
          </div>
        )}

        <h1 className="hero-title hero-enter-2">{title}</h1>
        {subtitle && <p className="hero-subtitle hero-enter-3">{subtitle}</p>}
      </div>

      <a
        href="#why-accessibility-section"
        className="hero-scroll-cue"
        aria-label="웹접근성은 왜 필요한가요 섹션으로 이동"
      >
        <span className="hero-scroll-cue-label">아래로 스크롤</span>
        <ChevronDown size={18} className="hero-scroll-chevron" aria-hidden="true" />
      </a>
    </header>
  );
};

export default Hero;
