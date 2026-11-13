import React from 'react';

interface ContentBlockProps {
  children: React.ReactNode;
  backgroundColor?: string;
  textColor?: string;
}

const ContentBlock: React.FC<ContentBlockProps> = ({
  children,
  backgroundColor = 'var(--color-bg)',
  textColor = 'var(--color-text)',
}) => {
  return (
    <div
      className="content-block"
      style={{
        backgroundColor,
        color: textColor,
      }}
    >
      <div className="container">{children}</div>
    </div>
  );
};

export default ContentBlock;
