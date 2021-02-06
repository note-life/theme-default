import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@components/layout';
import Loading from '@components/loading';
import pageProgress from '@components/page-progress';
import API from '@api';
import CONFIG from '@config';

import { formatDate } from '@helper/utils';

import './index.pcss';

const { Header, Content } = Layout;

const formatData = (data) => {
    if (!data) return [[]];

    const arr = [[]];
    let j = 0;
    let year = data[0] && new Date(data[0].publishTime).getFullYear();

    for(let i = 0, len = data.length; i < len; i++) {
        const currentYear = new Date(data[i].publishTime).getFullYear();

        if (year === currentYear) {
            j = j;
        } else {
            j++;
            year = currentYear;
            arr.push([]);
        }

        arr[j].push(data[i]);
    }

    return arr;
};


const ArchivePage = () => {
    const [ loading, setLoading ] = useState(false);
    const [ { total, notes, pageNo }, setData ] = useState({});

    /**
     * 获取归档
     * @param {Number} pageNo 
     */
    const fetchArchive = useCallback(async (pageNo = 1) => {

        if ((notes && total <= notes.length)|| loading) return;

        setLoading(true);
        pageProgress.start();
        const res = await API.fetchArchive(pageNo);
        pageProgress.done()

        setLoading(false);
        setData({
            total: res.total || 0,
            pageNo: pageNo,
            notes: pageNo === 1 ? res.notes || [] : (notes || []).concat(res.notes || [])
        });
    }, [setLoading, setData]);

    /**
     * 下拉加载
     */
    const scrollHandler = useCallback(() => {
        const { scrollY } = window;

        if (document.documentElement.clientHeight + scrollY > document.body.scrollHeight - 200) {
            fetchArchive(pageNo + 1);
        }
    }, [fetchArchive]);

    useEffect(() => {
        fetchArchive();
    }, [fetchArchive]);

    useEffect(() => {
        window.addEventListener('scroll', scrollHandler, false);

        return () => {
            window.removeEventListener('scroll', scrollHandler, false);
        };
    }, [scrollHandler]);

    document.title = localStorage.getItem('title') || 'NOTE.LIFE';

    return (
        <Layout className="archive-page">
            <Header bgImg={CONFIG.archivePage.wrapper} bgColor={CONFIG.archivePage.bgColor}>
                <h1 className="title"><i className="iconfont icon-archive"></i>归档</h1>
            </Header>
            <Content>
                <h1>共计 {total} 条记录</h1>
                {
                    formatData(notes).map((x, i) => (
                        <section key={i}>
                            <h1>{x[0] && new Date(x[0].publishTime).getFullYear()}</h1>
                            {
                                x.map((y) => (
                                    <p key={y._id}> <Link to={`/notes/${y._id}`}>{y.title}</Link> <time>{formatDate(y.publishTime).split(' ')[0]}</time> </p>
                                ))
                            }
                        </section>
                    ))
                }
                <Loading visible={loading} />
            </Content>
        </Layout>
    );
};

export default ArchivePage;
