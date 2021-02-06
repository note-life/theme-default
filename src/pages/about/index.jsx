import React, { useEffect } from 'react';
import Layout from '@components/layout';
import pageProgress from '@components/page-progress';
// import Comment from '@components/comment';

import CONFIG from '@config';

import './index.pcss';

const { Header, Content } = Layout;

const AboutPage = () => {

    useEffect(() => {
        pageProgress.start();

        setTimeout(() => {
            pageProgress.done();
        }, 100);

        document.title = localStorage.getItem('title') || 'NOTE.LIFE';
    }, []);

    return (
        <Layout className="about-page">
            <Header bgImg={CONFIG.aboutPage.wrapper} bgColor={CONFIG.aboutPage.bgColor}>
                <h1 className="title"><i className="iconfont icon-about"></i>关于本站</h1>
            </Header>
            <Content>
                <div className="links">
                    <ul>
                        <li>页面搭建：基于React (v16.8) + React Router (v5.0)</li>
                        <li>API 内容管理 Powered By <a href="https://github.com/note-life" target="_blank">Note.Life</a></li>
                    </ul>
                </div>
                {/* <Comment title={'about'} /> */}
            </Content>
        </Layout>
    );
}

export default AboutPage;
