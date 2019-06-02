import React from 'react';
import ReactDOM from 'react-dom';
import Progress from './progress';

class PageProgress {
    ele = document.createElement('div');

    createNode() {
        this.ele && document.body.appendChild(this.ele);
    }

    time = null

    ok = false

    handleClose() {
        this.open = false;
    }

    start = () => {
        this.time = Date.now();
        this.ok = false;
        this.createNode();

        setTimeout(() => {
            ReactDOM.render(<Progress value={40} />, this.ele);
        }, 0);

        setTimeout(() => {
            !this.ok && ReactDOM.render(<Progress value={90} />, this.ele);
        }, 200);

        ReactDOM.render(<Progress value={0} />, this.ele);
    }

    done = () => {
        setTimeout(() => {
            this.ok = true;
            ReactDOM.render(<Progress value={100} />, this.ele);
        }, 0);
    }

}

export default new PageProgress();
