import React from 'react';
import { Link } from 'react-router-dom';
import MarkdownPreview from '@components/markdown-preview';
import NoteInfo from '@components/note-info';

import './index.pcss';

const NoteItem = (props) => (
    <article className="note-item">
        <h1 className="title"><Link to={`/notes/${props._id}`}>{props.title}</Link></h1>
        <NoteInfo {...props} showTags />
        <MarkdownPreview text={props.summary} />
        <Link to={`/notes/${props._id}`} className="read-more">Read More</Link>
    </article>
);

export default NoteItem;
