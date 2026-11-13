import React from 'react';
import RevealOnScroll from './RevealOnScroll';
import CardMotionGraphic, { type CardGraphicVariant } from './CardMotionGraphic';

interface FeatureCardProps {
  label: string;
  title: string;
  description: string;
  backgroundColor?: string;
  minHeight?: string;
  graphic?: CardGraphicVariant;
  index?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  label,
  title,
  description,
  backgroundColor = '#ffffff',
  minHeight = '240px',
  graphic,
  index = 0,
}) => {
  return (
    <RevealOnScroll delay={index * 70} variant="fade-up" style={{ height: '100%' }}>
      <article
        className="feature-card"
        tabIndex={0}
        style={{
          background: backgroundColor,
          minHeight,
        }}
      >
        {graphic && (
          <div className="feature-card-motion-banner">
            <CardMotionGraphic variant={graphic} />
            <span className="chip" aria-hidden="true">
              {label}
            </span>
          </div>
        )}
        {!graphic && (
          <div className="feature-card-top">
            <span className="chip" aria-hidden="true">
              {label}
            </span>
          </div>
        )}
        <h3>{title}</h3>
        <p>{description}</p>
      </article>
    </RevealOnScroll>
  );
};

export default FeatureCard;
