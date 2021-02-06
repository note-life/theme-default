import React, { useState ,useEffect, useCallback } from 'react';
import NoteList from '@components/note-list';
import Layout from '@components/layout';
import pageProgress from '@components/page-progress';
import API from '@api';

import './index.pcss';

const { Header, Content } = Layout;

const AuthorPage = ({ match }) => {
    const [ author, setAuthor ] = useState({});
    const fetchAuthoInfo = useCallback(async () => {
        pageProgress.start();
        setAuthor(await API.fetchAuthorInfo(match.params.id));
        pageProgress.done();
    }, [setAuthor]);

    useEffect(() => {
        fetchAuthoInfo();
    }, []);

    document.title = localStorage.getItem('title') || 'NOTE.LIFE';

    return (
        <Layout className="author-page" navLess>
            <Header bgImg={author.coverImg || author.avator}>
                <div className="avator-info">
                    <img src={author.avator} alt="avator"/>
                    <h1>{author.nickname}</h1>
                    {author.sites && author.sites.map(v => (
                        <a href={v.url} target="view_window" key={v._id}>
                            <i className={`iconfont icon-${v.name}`}></i>
                        </a>
                    ))}
                </div>
            </Header>
            <Content>
                <NoteList query={{ author: match.params.id }} />
            </Content>
        </Layout>
    );
};

export default AuthorPage;
