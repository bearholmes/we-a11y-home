import React, { useEffect, useRef, useState } from 'react';
import { useMotionPreference } from '../hooks/useMotionPreference';

export type RevealVariant = 'fade-up' | 'fade-scale' | 'slide-left' | 'slide-right';

interface RevealOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  variant?: RevealVariant;
  className?: string;
  style?: React.CSSProperties;
  threshold?: number;
}

const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  delay = 0,
  variant = 'fade-up',
  className = '',
  style,
  threshold = 0.12,
}) => {
  const { reducedMotion } = useMotionPreference();
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (reducedMotion) return;

    const element = ref.current;
    if (!element || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else if (entry.boundingClientRect.top > window.innerHeight * 0.92) {
            // Reset smoothly when scrolled back above so re-scrolling replays motion
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [reducedMotion, threshold]);

  const revealed = reducedMotion || isVisible;

  return (
    <div
      ref={ref}
      className={`reveal-block reveal-${variant} ${revealed ? 'is-revealed' : ''} ${className}`.trim()}
      style={{
        ...style,
        transitionDelay: reducedMotion ? '0ms' : revealed ? `${delay}ms` : '0ms',
      }}
    >
      {children}
    </div>
  );
};

export default RevealOnScroll;
