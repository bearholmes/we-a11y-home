import React, { useRef, useEffect } from 'react';

interface ParallaxSectionProps {
    backgroundImage: string;
    height?: string;
    text?: string;
    textColor?: string;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
    backgroundImage,
    height = '50vh',
    text,
    textColor = '#FFFFFF'
}) => {
    const bgRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!bgRef.current || !containerRef.current) return;

            // Check for reduced motion preference
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (prefersReducedMotion) return;

            const rect = containerRef.current.getBoundingClientRect();
            // Calculate how far the section is from the center of viewport
            const elementCenter = rect.top + rect.height / 2;
            const viewportCenter = window.innerHeight / 2;
            const distance = elementCenter - viewportCenter;
            const offset = distance * 0.15; // Parallax effect strength - moves WITH scroll

            bgRef.current.style.transform = `translateY(${offset}px)`;
        };

        // Initial call
        handleScroll();

        // Add scroll listener
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                position: 'relative',
                height: height,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                // Isolate stacking context
                isolation: 'isolate'
            }}
        >
            {/* Fixed Gradient Background - Stays still */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: backgroundImage.includes('gradient') ? backgroundImage : `url(${backgroundImage})`,
                    backgroundSize: backgroundImage.includes('gradient') ? '160% 160%' : 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: 'transparent',
                    zIndex: 1,
                }}
                aria-hidden="true"
            />

            {/* Moving Dot Pattern - This moves with parallax */}
            <div
                ref={bgRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `
                      radial-gradient(circle, rgba(208, 138, 78, 0.45) 4px, transparent 4px)
                    `,
                    backgroundSize: '80px 80px',
                    backgroundPosition: '0 0',
                    opacity: 0.7,
                    zIndex: 1,
                    pointerEvents: 'none',
                    willChange: 'transform'
                }}
                aria-hidden="true"
            />

            {text && (
                <h2 style={{
                    fontSize: '2rem',
                    color: textColor,
                    textAlign: 'center',
                    position: 'relative',
                    zIndex: 2 // Text at level 2 (above background)
                }}>
                    {text}
                </h2>
            )}
        </div>
    );
};

export default ParallaxSection;
