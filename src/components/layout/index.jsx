import React from 'react';
import Nav from '@components/nav';
import Header from '@components/header';
import CopyRights from '@components/copy-rights';
import ToTop from '@components/to-top';
import './index.pcss';

const Layout = ({ children, className, navLess }) => {
    document.body.className = className;

    return (
        <>
            <div className="off-header">当然也不缺乏高度 <i className="iconfont icon-off-header"></i></div>
            {!navLess && <Nav />}
            {children}
            <CopyRights />
            <ToTop />
            <div className="off-footer">我是有底线 <i className="iconfont icon-off-footer"></i></div>
        </>
    );
};

Layout.Header = Header;

Layout.Content = ({ children }) => (
    <main className="global-main">{children}</main>
);

Layout.defaultProps = {
    headerBgImg: '',
    headerClassName: '',
    headerContent: null
};

export default Layout;
