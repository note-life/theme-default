import React from 'react';
import LoadingSVG from '@assets/loading.svg';
import './index.pcss';

const Loading = ({ visible, text = 'loading...' }) => visible ? (
    <div className="loading-wrapper">
        <img src={LoadingSVG} alt="loading"/>
        {text}
    </div>
) : null;

export default Loading;
