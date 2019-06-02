import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.pcss';

const NAV_PATHS = [
    {
        name: '首页',
        key: 'home',
        path: '/'
    },
    {
        name: '归档',
        key: 'archive',
        path: '/archive'
    },
    {
        name: '友链',
        key: 'links',
        path: '/links'
    },
    {
        name: '关于',
        key: 'about',
        path: '/about'
    }
];

const Nav = ({ visible, onPushState }) => (
    <nav className={visible ? 'global-nav actived' : 'global-nav'}>
        {NAV_PATHS.map(v => (
            <NavLink exact data-title={v.name} activeClassName="actived" to={v.path} key={v.key}>
                <i className={`iconfont icon-${v.key}`}></i>
            </NavLink>
        ))}
    </nav>
);


Nav.defaultProps = {
    visible: false,
    onPushState: () => {}
};

export default Nav;
