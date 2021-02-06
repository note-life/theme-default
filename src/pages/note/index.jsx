import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@components/layout';
import ImgModal from '@components/img-modal';
import MarkdownPreview from '@components/markdown-preview';
import NoteInfo from '@components/note-info';
import DisqusComment from '@components/disqus-comment';
import ExpirationPrompt from '@components/expiration-prompt';
import pageProgress from '@components/page-progress';

import API from '@api';

import './index.pcss';

const { Header, Content } = Layout;

const NotePage = (props) => {
    const [ { prev, note = {}, next }, setNoteData ] = useState({});
    const [ bigImg, setBigImg ] = useState(null);
    const handleClick = useCallback((e) => {
        const target = e.target;

        if (target.tagName === 'IMG' && target.getAttribute('alt') !== 'emoji') {
            setBigImg(target.getAttribute('src'));
        }
    }, [setBigImg]);

    const handleClose = useCallback(() => {
        setBigImg(null);
    }, [setBigImg]);

    useEffect(() => {
        const fetchNote = async () => {
            pageProgress.start();

            const data = await API.fetchNote(props.match.params.id);

            pageProgress.done();

            if (!data.note) {
                props.history.push('/404');
            }

            setNoteData(data);
            document.title = data && data.note && data.note.title + '・' + (localStorage.getItem('title') || 'NOTE.LIFE');
            window.scrollTo(0, 0);
        };

        fetchNote();
    }, [props.match.params.id]);

    return (
        <Layout className="note-page">
            <Header bgImg={note.coverImg}>
                <h1 className="note-title">{note.title}</h1>
                <div className="note-info-wrapper">
                    <NoteInfo {...note} showTags showUpdateTime />
                </div>
            </Header>
            <Content>
                <ExpirationPrompt {...note} />
                <MarkdownPreview onClick={handleClick} text={note.content} />
                <div className="article-nav">
                    {prev && <Link to={`/notes/${prev._id}`} className="prev"><i className="iconfont icon-prev"></i>{prev.title}</Link>}
                    {next && <Link to={`/notes/${next._id}`} className="next">{next.title}<i className="iconfont icon-next"></i></Link>}
                </div>
                <DisqusComment id={note._id} />
            </Content>
            <ImgModal visible={!!bigImg} url={bigImg} onClose={handleClose}>
                <img src={bigImg} alt="bigImg" />
            </ImgModal>
        </Layout>
    );
};

export default NotePage;
