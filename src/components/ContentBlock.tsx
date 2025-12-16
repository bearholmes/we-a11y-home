import React from 'react';

interface ContentBlockProps {
    children: React.ReactNode;
    backgroundColor?: string;
    textColor?: string;
}

const ContentBlock: React.FC<ContentBlockProps> = ({
    children,
    backgroundColor = 'var(--color-bg)',
    textColor = 'var(--color-text)'
}) => {
    return (
        <section
            style={{
                position: 'relative',
                padding: '80px 0',
                backgroundColor: backgroundColor,
                color: textColor,
                zIndex: 1,
            }}
        >
            <div className="container">
                {children}
            </div>
        </section>
    );
};

export default ContentBlock;
