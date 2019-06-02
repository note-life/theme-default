import React from 'react';
import Layout from '@components/layout';
import NoteList from '@components/note-list';

import { getUrlParams } from '@helper/utils';

import './index.pcss';

const { Header, Content } = Layout;

const NotesPage = ({ children, className }) => (
    <Layout className={`notes-page ${className}`}>
        <Header bgImg={''}>
            {
                children
                    ? children
                    : <h1 className="title"><i className="iconfont icon-tags"></i> {getUrlParams().tags}</h1>
            }
        </Header>
        <Content>
            <NoteList />
        </Content>
    </Layout>
);

NotesPage.defaultProps = {
    className: ''
};

export default NotesPage;
