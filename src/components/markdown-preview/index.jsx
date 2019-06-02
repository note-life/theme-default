import React from 'react';
import mark from '@helper/mark';
import './index.pcss';

const MarkdownPreview = ({ text }) => (
    <div className="markdown-preview" dangerouslySetInnerHTML={{__html: mark(text)}} />
);

export default MarkdownPreview;
