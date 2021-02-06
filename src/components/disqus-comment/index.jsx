import React, { useEffect } from 'react';
import './index.pcss';

function insertDisqusScript() {
  const script = document.createElement('script');

  script.src = 'https://note-hxtao.disqus.com/embed.js';
  script.setAttribute('data-timestamp', +new Date());
  document.body.appendChild(script);
}

const forbbidenPath = ['/'];

const DisqusComment = () => {
  useEffect(() => {
    !forbbidenPath.includes(location.pathname) && insertDisqusScript();
  }, []);

  return (
    <div id="disqus_thread" className="disqus" />
  );
};

export default DisqusComment;
