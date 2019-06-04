import React, { useState, useEffect, PureComponent } from 'react';
import NoteItem from '@components/note-item';
import pageProgress from '@components/page-progress';

import API from '@api';
import { getUrlParams } from '@helper/utils';

import './index.pcss';

const NoteList = ({ query }) => {
    const [ params, setParams ] = useState(getUrlParams());
    const [ loading, setLoading ] = useState(false);
    const [ { total, notes, pageNo }, setData ] = useState({});

    /**
     * 下拉加载
     */
    const scrollHandler = () => {
        const { scrollY } = window;

        if (document.documentElement.clientHeight + scrollY > document.body.scrollHeight - 200) {
            fetchNotes(pageNo + 1);
        }
    };

    /**
     * 获取文章
     * @param {Number} pageNo 
     */
    const fetchNotes = async (pageNo = 1) => {

        if ((notes && total <= notes.length)|| loading) return;

        setLoading(true);

        pageProgress.start();
        const res = await API.fetchNotes({...getUrlParams(), ...query, pageNo });
        pageProgress.done();

        if (pageNo === 1) {
            window.scrollTo(0, 0);
        }

        setLoading(false);
        setData({
            total: res.total || 0,
            pageNo: pageNo,
            notes: pageNo === 1 ? res.notes || [] : (notes || []).concat(res.notes || [])
        });
    };

    useEffect(() => {
        fetchNotes();
    }, true);

    useEffect(() => {
        window.addEventListener('scroll', scrollHandler, false);

        return () => {
            window.removeEventListener('scroll', scrollHandler, false);
        }
    }, null);

    if (params.tags && params.tags !== getUrlParams().tags) {
        fetchNotes(1);
        setParams(getUrlParams());
    }

    return notes && notes.length ? notes.map(note => <NoteItem key={note._id} {...note} />) : <div className="empty">暂无文章</div>
};

NoteList.defaultProps = {
    className: '',
    query: {}
};

export default NoteList;
