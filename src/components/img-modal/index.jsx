import React from 'react';
import ReactDOM from 'react-dom';
import { generateImgPath } from '@helper/utils';
import './index.pcss';

class ImgModal extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // document.body.appendChild(this.el);
    }

    handleClick = (e) => {
        if (e.target.tagName === 'IMG' || e.target.className === 'origin') return;

        this.props.onClose();
    }

    init() {
        this.el = document.createElement('div');
        this.el.className = 'img-modal-wrapper';
        document.body.style = 'overflow: hidden;';
        document.body.appendChild(this.el);
        this.el.addEventListener('click', this.handleClick, false);
    }

    clear() {
        if (this.el) {
            document.body.style = 'overflow: auto;';
            document.body.removeChild(this.el);
            this.el.removeEventListener('click', this.handleClick, false);
            this.el = null;
        }
    }

    openNewTab = async () => {
        const { origin, common } = generateImgPath(this.props.url);

        window.open(origin || common);
    }

    componentWillUnmount() {
        this.clear();
    }

    render() {
        if (this.props.visible) {
            this.init();
            return ReactDOM.createPortal(
                <>
                    <div className="img">{this.props.children}</div>
                    <div className="menus">
                        <div className="close" onClick={this.props.onClose}>关闭</div>
                        <div className="origin" onClick={this.openNewTab}>大图</div>
                    </div>
                </>,
                this.el
            );
        }

        this.clear();

        return null;
    }
}

export default ImgModal;
