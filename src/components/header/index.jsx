import React, { useState, useEffect } from 'react';
import { replaceImg } from '@helper/utils';
import './index.pcss';

const Header = ({ className, bgImg, bgColor, children }) => {
    const [ bgY, setBgY ] = useState();

    const handleScroll = () => {
        const { innerHeight, scrollY } = window;
        const isMobile = /Mobile/.test(navigator.userAgent);
    
        if (scrollY > innerHeight || isMobile) return;

        setBgY(- (scrollY / 3));
    };

    const style = { backgroundPositionY: window.parseInt(bgY) };

    if (bgImg) {
        style.backgroundImage = `url(${replaceImg(bgImg)})`;
    }

    if (bgColor) {
        style.backgroundColor = bgColor;
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, false);

        return () => {
            window.removeEventListener('scroll', handleScroll, false);
        }
    }, true);

    return (
        <header className={`global-header ${className}`} style={style}>
            <div className="content">
                {children}
            </div>
        </header>
    );
};

Header.defaultProps = {
    bgImg: '',
    className: ''
};

export default Header;
