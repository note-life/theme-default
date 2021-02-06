if ('serviceWorker' in navigator) {
    window.onload = function() {
        navigator.serviceWorker.register('/sw.js');
    }
}

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { webpCheck } from '@helper/utils';
import HomePage from '@pages/home';
import NotePage from '@pages/note';
import NotesPage from '@pages/notes';
import ArchivePage from '@pages/archive';
import FriendLinksPage from '@pages/friend-links';
import AuthorPage from '@pages/author';
import AboutPage from '@pages/about';
import NotFound from '@pages/404';
import DisqusComment from '@components/disqus-comment';

import './app.pcss';

const App = () => (
    <>
        <Router>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/notes/:id" component={NotePage} />
                <Route path="/notes" component={NotesPage} />
                <Route path="/links" component={FriendLinksPage} />
                <Route path="/archive" component={ArchivePage} />
                <Route path="/author/:id" component={AuthorPage} />
                <Route path="/about" component={AboutPage} />
                <Route component={NotFound} />
            </Switch>
        </Router>
        <DisqusComment />
    </>
);

async function render() {
    await webpCheck();

    ReactDOM.render(<App />, document.getElementById('app'));

    if (module.hot) {
        module.hot.accept();
    }
}

render();
