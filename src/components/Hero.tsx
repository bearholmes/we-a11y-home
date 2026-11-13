import React, { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { useMotionPreference } from '../hooks/useMotionPreference';

interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  logoImage?: string;
}

interface HeroBgFigure {
  id: string;
  imageSrc: string;
  viewBox: string;
  className: string;
  depth: number;
}

const HERO_BG_FIGURES: HeroBgFigure[] = [
  {
    id: 'sunlight-user',
    imageSrc: '/images/everyday-accessibility.jpg',
    viewBox: '55 25 480 380',
    className: 'hero-bg-fig hero-bg-fig-lt',
    depth: -0.28,
  },
  {
    id: 'senior-user',
    imageSrc: '/images/everyday-accessibility.jpg',
    viewBox: '670 25 380 365',
    className: 'hero-bg-fig hero-bg-fig-rt',
    depth: -0.22,
  },
  {
    id: 'onehand-user',
    imageSrc: '/images/everyday-accessibility.jpg',
    viewBox: '305 335 375 355',
    className: 'hero-bg-fig hero-bg-fig-lb',
    depth: -0.36,
  },
  {
    id: 'mobility-user',
    imageSrc: '/images/connected-life-accessibility.jpg',
    viewBox: '875 65 320 285',
    className: 'hero-bg-fig hero-bg-fig-rb',
    depth: -0.3,
  },
];

const Hero: React.FC<HeroProps> = ({ title, subtitle, backgroundImage, logoImage }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);
  const figRefs = useRef<Array<HTMLDivElement | null>>([]);
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
      figRefs.current.forEach((el) => {
        if (el) el.style.transform = 'none';
      });
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

      figRefs.current.forEach((el, idx) => {
        if (!el) return;
        const yMove = scrollY * HERO_BG_FIGURES[idx].depth;
        el.style.transform = `translate3d(0, ${yMove.toFixed(1)}px, 0)`;
      });
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

      {/* Seamless Background Character Layer (Blended directly into Hero background, no card boxes) */}
      <div className="hero-bg-figures-layer" aria-hidden="true">
        {HERO_BG_FIGURES.map((fig, idx) => (
          <div
            key={fig.id}
            ref={(el) => {
              figRefs.current[idx] = el;
            }}
            className={fig.className}
          >
            <svg viewBox={fig.viewBox} className="bg-blended-svg">
              <image href={fig.imageSrc} x="0" y="0" width="1280" height="714" />
            </svg>
          </div>
        ))}
      </div>

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
