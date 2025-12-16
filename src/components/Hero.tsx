import React, { useEffect, useRef } from 'react';


interface HeroProps {
    title: string;
    subtitle?: string;
    backgroundImage?: string;
    logoImage?: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, backgroundImage, logoImage }) => {
    const bgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!bgRef.current) return;

            // Check for reduced motion preference
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (prefersReducedMotion) return;

            const scrollY = window.scrollY;
            const offset = scrollY * -0.4; // Pattern moves upward (opposite to scroll)
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
        <header
            className="hero-section"
            style={{
                height: '100vh',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {/* Fixed Background Layer - Stays still */}
            <div
                className="hero-background"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    // Support both URL and direct gradient strings
                    background: backgroundImage
                        ? (backgroundImage.includes('gradient') ? backgroundImage : `url(${backgroundImage}) center/cover`)
                        : `
                        radial-gradient(circle at 20% 30%, rgba(233, 122, 138, 0.25) 0, transparent 45%),
                        radial-gradient(circle at 80% 70%, rgba(143, 185, 214, 0.25) 0, transparent 40%),
                        linear-gradient(120deg, #fff9fb 0%, #f6f0f2 45%, #f0b27a 100%)
                    `,
                    backgroundSize: backgroundImage?.includes('gradient') ? '140% 140%' : 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    zIndex: 0,
                    backgroundColor: '#f6f0f2',
                    pointerEvents: 'none'
                }}
            />

            {/* Moving Icon Pattern - This moves with parallax */}
            <div
                ref={bgRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    opacity: 0.2,
                    zIndex: 0,
                    pointerEvents: 'none',
                    willChange: 'transform',
                    fontSize: '2rem',
                    userSelect: 'none'
                }}
                aria-hidden="true"
            >
                {['♿', '👁️', '👂', '❤️', '🤝', '♿', '👁️', '👂', '❤️', '🤝',
                  '♿', '👁️', '👂', '❤️', '🤝', '♿', '👁️', '👂', '❤️', '🤝',
                  '♿', '👁️', '👂', '❤️', '🤝', '♿', '👁️', '👂', '❤️', '🤝'].map((emoji, i) => (
                    <span
                        key={i}
                        style={{
                            position: 'absolute',
                            left: `${(i % 6) * 18 + 5}%`,
                            top: `${Math.floor(i / 6) * 20 + 10}%`,
                        }}
                    >
                        {emoji}
                    </span>
                ))}
            </div>

            {/* 3. Content Layer - Static (Relative) */}
            <div
                className="hero-content container"
                style={{
                    position: 'relative',
                    zIndex: 1,
                    textAlign: 'center',
                    color: 'var(--color-text)', // Dark text for contrast on light gradient
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '2rem',
                }}
            >
                {/* Logo Section Removed or Separate Prop needed if they want a logo */}
                {/* Previously backgroundImage was here as an img tag. Removed to fix the "Background not working" issue. */}

                {/* Logo Image */}
                {logoImage && (
                    <div style={{
                        maxWidth: '300px',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '2rem',
                    }}>
                        <img
                            src={logoImage}
                            alt="We A11y 로고 - 하트 모양 안에 접근성을 의미하는 a11y 텍스트"
                            style={{
                                width: '100%',
                                height: 'auto',
                                objectFit: 'contain',
                                filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))'
                            }}
                        />
                    </div>
                )}

                <h1 style={{
                    fontSize: '4rem',
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    color: 'inherit',
                    marginBottom: '0',
                    textShadow: '0 4px 12px rgba(0, 0, 0, 0.12)'
                }}>
                    {title}
                </h1>
                {subtitle && (
                    <p style={{
                        fontSize: '1.75rem',
                        color: 'var(--color-text)',
                        maxWidth: '800px',
                        margin: '0 auto',
                        fontWeight: 700
                    }}>
                        {subtitle}
                    </p>
                )}
            </div>
        </header>
    );
};

export default Hero;
