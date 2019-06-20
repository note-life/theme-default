import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@components/layout';
import MarkdownPreview from '@components/markdown-preview';
import NoteInfo from '@components/note-info';
import Comment from '@components/comment';
import pageProgress from '@components/page-progress';

import API from '@api';

import './index.pcss';

const { Header, Content } = Layout;

const NotePage = (props) => {
    const [ { prev, note = {}, next }, setNoteData ] = useState({});

    useEffect(() => {
        const fetchNote = async () => {
            pageProgress.start();

            const note = await API.fetchNote(props.match.params.id);

            pageProgress.done();
            setNoteData(note);
            document.title = note.title + '・' + (localStorage.getItem('title') || 'NOTE.LIFE');
            window.scrollTo(0, 0);
        };

        fetchNote();
    }, props.match.params.id);

    return (
        <Layout className="note-page">
            <Header bgImg={note.coverImg}>
                <h1 className="note-title">{note.title}</h1>
                <div className="note-info-wrapper">
                    <NoteInfo {...note} showTags showUpdateTime />
                </div>
            </Header>
            <Content>
                <MarkdownPreview text={note.content} />
                <div className="article-nav">
                    {prev && <Link to={`/notes/${prev._id}`} className="prev"><i className="iconfont icon-prev"></i>{prev.title}</Link>}
                    {next && <Link to={`/notes/${next._id}`} className="next">{next.title}<i className="iconfont icon-next"></i></Link>}
                </div>
                <Comment title={note.title} />
            </Content>
        </Layout>
    );
};

export default NotePage;
