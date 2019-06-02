import React from 'react';
import { Link } from 'react-router-dom';
import { randomNum } from '@helper/utils';
import './index.pcss';

const emojis = [
    {
        img: '//note-cdn.hxtao.xyz/404/1.gif',
        text: '卧槽！页面跟隔壁老王跑了'
    },
    {
        img: '//note-cdn.hxtao.xyz/404/2.png',
        text: ''
    },
    {
        img: '//note-cdn.hxtao.xyz/404/3.jpg',
        text: '好像页面不存在呢~'
    },
    {
        img: '//note-cdn.hxtao.xyz/404/4.jpg',
        text: '卧槽！想干啥'
    }
];

const NotFound = () => {
    const emoji = emojis[randomNum(0, 3)];

    document.title = '404';

    return (
        <div className="not-found">
            <div className="emoji-wrapper">
                <img src={emoji.img} alt="404"/>
                <p>{emoji.text}</p>
                <h1>404</h1>
                <h2><i className="iconfont icon-home"></i><Link to="/">返回首页</Link></h2>
            </div>
        </div>
    );
}

export default NotFound;
