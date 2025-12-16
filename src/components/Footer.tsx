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
                <p>&copy; 2025 We A11y. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
