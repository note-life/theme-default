import React, { useEffect } from 'react';
import './index.pcss';

function insertDisqusScript() {
    const script = document.createElement('script');

    script.id = 'disqus';
    script.src = 'https://note-hxtao.disqus.com/embed.js';
    script.setAttribute('data-timestamp', +new Date());
    document.body.appendChild(script);
}

function removeDisqusScript() {
    const script = document.getElementById('disqus');

    if (script && document.body.contains(script)) {
        document.body.removeChild(script);
    }
}

function resetDisqusComments() {
    const { DISQUS } = window;

    if (DISQUS && typeof DISQUS.reset === 'function') {
        DISQUS.reset({ reload: true });
    }
}

const DisqusComment = ({ id }) => {
    useEffect(() => {
        resetDisqusComments();
    }, [id]);

    useEffect(() => {
        insertDisqusScript();

        return () => {
            removeDisqusScript();
        };
    }, []);

    return (
        <div id="disqus_thread" className="disqus-comment" />
    );
};

export default DisqusComment;
