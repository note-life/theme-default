import React from 'react';
import { DiscussionEmbed, CommentCount } from 'disqus-react';
import './index.pcss';

const Comment = (props) => {
    const disqusShortname = 'shi-yu-xia-mo-note';
    const disqusConfig = {
        url:  location.href,
        identifier: location.pathname,
        title: props.title
    };

    return (
        <div className="comment-wrapper">
            <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
        </div>
    );
};

export default Comment;
