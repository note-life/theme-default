import React from 'react';
import './index.pcss';

const CopyRights = (props) => (
    <footer className="copy-rights">
        © {(new Date()).getFullYear()} <i className="iconfont icon-aixin"></i> _始於夏末_
    </footer>
);

export default CopyRights;
