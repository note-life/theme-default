import React, { useEffect, useState } from 'react';
import './index.pcss';

const ToTop = (props) => {
    const [ visible, setVisible ] = useState(false);

    const scrollHandler = () => {
        setVisible(window.scrollY > 2000);
    };

    const backTop = () => {
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        window.addEventListener('scroll', scrollHandler, false);

        return () => {
            window.removeEventListener('scroll', scrollHandler, false);
        }
    }, true);

    if (!visible) return null;

    return (
        <div className="to-top" onClick={backTop}>
            <i className="iconfont icon-top"></i>
        </div>
    );
};

export default ToTop;
