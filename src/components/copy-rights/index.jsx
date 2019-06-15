import React, { useEffect } from 'react';
import './index.pcss';

const CopyRights = (props) => {
    useEffect(() => {
        console.log('render');
        const script = document.createElement('script');

        script.src = '//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js';
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };

    }, true);

    return (
        <footer className="copy-rights">
            © {(new Date()).getFullYear()} <i className="iconfont icon-aixin"></i> _始於夏末_
            <div className="busuanzi-couter">
                <span id="busuanzi_container_site_pv">总访问量<span id="busuanzi_value_site_pv"></span>次</span>
                <span id="busuanzi_container_site_uv">总访客量<span id="busuanzi_value_site_uv"></span>次</span>
                <span>备案号:浙ICP备17057854号-1</span>
            </div>
        </footer>
    );
};

export default CopyRights;
