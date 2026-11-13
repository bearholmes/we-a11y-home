import React from 'react';
import { ArrowUp } from 'lucide-react';
import { useMotionPreference } from '../hooks/useMotionPreference';

const Footer: React.FC = () => {
  const { reducedMotion } = useMotionPreference();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p className="footer-copy">&copy; 2025 We A11y. All rights reserved.</p>
        <button
          type="button"
          className="back-to-top-btn"
          onClick={scrollToTop}
          aria-label="페이지 맨 위로 이동"
        >
          <ArrowUp size={16} aria-hidden="true" />
          <span>맨 위로</span>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
