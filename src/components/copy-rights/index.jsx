import React from 'react';
import './index.pcss';

const CopyRights = () => {
    return (
        <footer className="copy-rights">
            © {(new Date()).getFullYear()} <i className="iconfont icon-aixin"></i> _始於夏末_
            <div className="gov-num">
                <span>备案号:浙ICP备17057854号-3</span>
            </div>
        </footer>
    );
};

export default CopyRights;
