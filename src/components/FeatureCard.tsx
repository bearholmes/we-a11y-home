import React from 'react';

interface FeatureCardProps {
    label: string;
    title: string;
    description: string;
    backgroundColor?: string;
    minHeight?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
    label,
    title,
    description,
    backgroundColor = '#ffffff',
    minHeight = '220px'
}) => {
    return (
        <article
            className="feature-card"
            style={{
                background: backgroundColor,
                minHeight: minHeight
            }}
        >
            <span className="chip" aria-hidden="true">
                {label}
            </span>
            <h3 style={{ marginTop: '0.6rem' }}>{title}</h3>
            <p style={{ margin: 0 }}>{description}</p>
        </article>
    );
};

export default FeatureCard;
