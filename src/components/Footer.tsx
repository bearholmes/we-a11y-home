import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer style={{
            backgroundColor: '#111',
            color: '#FFF',
            padding: '40px 0',
            textAlign: 'center',
            marginTop: 'auto'
        }}>
            <div className="container">
                <p>We ❤️A11y · 모든 사람을 위한 포괄적 접근성 캠페인</p>
                <nav aria-label="푸터">
                    <a href="#why-accessibility">접근성 알아보기</a>
                    {' · '}
                    <a href="#participate">함께하는 방법</a>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;
