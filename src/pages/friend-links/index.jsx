import React, { useEffect, useState } from 'react';
import Layout from '@components/layout';
import pageProgress from '@components/page-progress';
import { replaceImg } from '@helper/utils';
import CONFIG from '@config';
import API from '@api';

import './index.pcss';

const { Header, Content } = Layout;


const FriendLinks = () => {
    const [ links, setLinks ] = useState([]);

    useEffect(() => {
        async function fetchFriendLinks() {
            pageProgress.start();
            const links = await API.fetchFriendLinks();
            pageProgress.done();

            setLinks(links)
        };

        fetchFriendLinks();
        document.title = localStorage.getItem('title') || 'NOTE.LIFE';
    }, true);

    return (
        <Layout className="friend-links-page">
            <Header bgImg={CONFIG.friendLinksPage.wrapper} bgColor={CONFIG.friendLinksPage.bgColor}>
                <h1 className="title"><i className="iconfont icon-links"></i>友链</h1>
            </Header>
            <Content>
                <div className="links">
                    {
                        links.map(v => (
                            <a className="link-item" href={v.url} key={v.id} target="_blank">
                                <div className="img"><img src={replaceImg(v.logo)} alt=""/></div>
                                <h1>{v.name}</h1>
                            </a>
                        ))
                    }
                </div>
            </Content>
        </Layout>
    );
}

export default FriendLinks;
