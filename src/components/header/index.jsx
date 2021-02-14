import React, { useState, useEffect, useCallback } from 'react';
import { replaceImg, generateImgPath } from '@helper/utils';
import './index.pcss';

const Header = ({ className, bgImg, bgColor, children }) => {
    const [ bgY, setBgY ] = useState();
    const [ imgSrc, setImgSrc ] = useState();

    const handleScroll = () => {
        const { innerHeight, scrollY } = window;
        const isMobile = /Mobile/.test(navigator.userAgent);
    
        if (scrollY > innerHeight || isMobile) return;

        setBgY(- (scrollY / 3));
    };

    const style = { backgroundPositionY: window.parseInt(bgY) };

    if (imgSrc) {
        style.backgroundImage = `url(${replaceImg(imgSrc)})`;
    }

    if (bgColor) {
        style.backgroundColor = bgColor;
    }

    const lazyLoad = useCallback((imgPath) => {
        if (!imgPath) {
            return;
        }

        const { common, origin, thumbnail } = generateImgPath(imgPath);
        const image = new Image();

        if (!thumbnail) {
            setImgSrc(common);
            return;
        }

        setImgSrc(thumbnail);

        image.onload = () => {
            setImgSrc(origin);
            image.onload = null;
        };

        image.src = origin;

        if (image.complete && image.src) {
            setImgSrc(origin);
        }

    }, [setImgSrc]);

    useEffect(() => {
        lazyLoad(bgImg);
    }, [bgImg]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, false);

        return () => {
            window.removeEventListener('scroll', handleScroll, false);
        }
    }, []);

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
