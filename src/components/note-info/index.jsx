import React from 'react';
import { Link } from 'react-router-dom';

import { dateDesc, formatDate, replaceImg } from '@helper/utils';


import './index.pcss';

const NoteInfo = (props) => {
    if (!props.author) return null;

    return (
        <div className="note-info">
            <div className="row">
                <Link to={`/author/${props.author._id}`}>
                   {<img src={replaceImg(props.author.avator)} className="avator" alt="avator"/>}
                </Link>
                <div>
                    <span className="nickname">{props.author.nickname}</span>
                    <div className="times">
                        <time data-title={`发布于: ${formatDate(props.publishTime)}`}>{dateDesc(props.publishTime)}</time>
                        {props.showUpdateTime && <time data-title={`更新于: ${formatDate(props.updateTime)}`}>・{dateDesc(props.updateTime)}</time>}
                    </div>
                </div>
            </div>
            <div className="row tags-archive">
                {props.showArchive && <div>
                    <i className="iconfont icon-archive"></i>
                    <Link to="/archive">{props.archive}</Link>
                </div>}
                {props.showTags && <div className="tags">
                    {/* <i className="iconfont icon-tags"></i> */}
                    {props.tags && props.tags.map(tag => <Link to={`/notes?tags=${tag}`} key={tag}>{tag}</Link>)}
                </div>}
            </div>
        </div>
    );
}

NoteInfo.defaultProps = {
    author: null
};

export default NoteInfo;
