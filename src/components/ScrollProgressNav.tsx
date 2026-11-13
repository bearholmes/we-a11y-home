import React, { useEffect, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { useMotionPreference } from '../hooks/useMotionPreference';

interface SectionNavItem {
  id: string;
  label: string;
}

const SECTION_ITEMS: SectionNavItem[] = [
  { id: 'hero-top', label: '소개' },
  { id: 'why-accessibility-section', label: '필요성' },
  { id: 'context-section', label: '맥락 기반' },
  { id: 'daily-life-section', label: '일상 접근성' },
  { id: 'responsibility-section', label: '모두의 역할' },
];

const ScrollProgressNav: React.FC = () => {
  const { reducedMotion, toggleReducedMotion } = useMotionPreference();
  const [progress, setProgress] = useState<number>(0);
  const [activeId, setActiveId] = useState<string>('hero-top');

  useEffect(() => {
    let rafId = 0;

    const updateOnScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = docHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / docHeight)) : 0;
      setProgress(ratio);

      const viewportMid = window.innerHeight * 0.4;
      let currentSection = SECTION_ITEMS[0].id;
      for (const item of SECTION_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= viewportMid) {
            currentSection = item.id;
          }
        }
      }
      setActiveId(currentSection);
    };

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateOnScroll);
    };

    updateOnScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <>
      <a href="#why-accessibility-section" className="skip-link">
        본문 바로가기
      </a>

      {/* Top Reading Progress Indicator */}
      <div className="reading-progress-track" aria-hidden="true">
        <div
          className="reading-progress-fill"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      {/* Non-Overlapping Top-Right Motion Toggle Pill */}
      <div className="motion-control-top">
        <button
          type="button"
          className={`motion-toggle-btn ${reducedMotion ? 'is-paused' : ''}`}
          onClick={toggleReducedMotion}
          aria-pressed={reducedMotion}
          title={reducedMotion ? '모션 효과 다시 켜기' : '모션 및 스크롤 전환 효과 줄이기'}
        >
          {reducedMotion ? (
            <>
              <Play size={14} aria-hidden="true" />
              <span>모션 켜기</span>
            </>
          ) : (
            <>
              <Pause size={14} aria-hidden="true" />
              <span>모션 줄이기</span>
            </>
          )}
        </button>
      </div>

      {/* Right-side Section Focus Dots (Desktop) */}
      <nav className="section-focus-nav" aria-label="페이지 섹션 탐색">
        <ul>
          {SECTION_ITEMS.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  className={`section-dot-btn ${isActive ? 'is-active' : ''}`}
                  onClick={() => scrollToSection(item.id)}
                  aria-label={`${item.label} 섹션으로 이동`}
                  aria-current={isActive ? 'location' : undefined}
                >
                  <span className="section-dot-label">{item.label}</span>
                  <span className="section-dot-indicator" aria-hidden="true" />
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default ScrollProgressNav;
