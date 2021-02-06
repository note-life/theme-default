import React, { useState, useEffect } from 'react';
import NoteList from '@components/note-list';
import Layout from '@components/layout';
import pageProgress from '@components/page-progress';

import CONFIG from '@config';
import API from '@api';

import './index.pcss';

const { Header, Content } = Layout;

const HomePage = () => {
    const [ siteInfo, setSiteInfo ] = useState({});
    const fetchSiteInfo = useCallback(async () => {
        pageProgress.start()
        const siteInfo = await API.fetchSiteInfo();
        pageProgress.done();

        document.title = siteInfo.title;
        localStorage.setItem('title', siteInfo.title);
        setSiteInfo(siteInfo);
    }, [setSiteInfo]);

    useEffect(() => {
        fetchSiteInfo();
    }, [fetchSiteInfo]);

    return (
        <Layout className="home-page">
            <Header bgImg={siteInfo.wrapper} bgColor={CONFIG.homePage.bgColor}>
                <div className="site-info">
                    <h1>{siteInfo.title}</h1>
                    <p>{siteInfo.subTitle}</p>
                    <div className="associated-links">
                        {siteInfo.associatedLinks && siteInfo.associatedLinks.map(v => (
                            <a href={v.url} target="view_window" key={v._id}>
                                <i className={`iconfont icon-${v.name}`}></i>
                            </a>
                        ))}
                    </div>
                </div>
            </Header>
            <Content>
                <NoteList />
            </Content>
        </Layout>
    );
};

export default HomePage;
