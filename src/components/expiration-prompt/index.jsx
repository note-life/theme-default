import React from 'react';
import { dateDesc } from '@helper/utils';
import './index.pcss';

const ExpirationPrompt = ({ updateTime, tags, archive }) => {
    const dur = Date.now() - (new Date(updateTime)).getTime();

    if (dur <  1000 * 60 * 60 * 24 * 365 * 0.5 || !updateTime || ['生活', 'life', '随笔', '情感', '其它'].includes(archive)) return null;

    return  (
        <div className="expiration-prompt">
            提醒：本文最后更新于 {dateDesc(updateTime)}，文中所描述的观点或结论可能有偏差，请谨慎采纳 🐛🐾
        </div>
    );
};

export default ExpirationPrompt;
