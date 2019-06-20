import React from 'react';
import mark from '@helper/mark';
import './index.pcss';

const MarkdownPreview = ({ text, onClick }) => (
    <div className="markdown-preview" onClick={onClick} dangerouslySetInnerHTML={{__html: mark(text)}} />
);

export default MarkdownPreview;
