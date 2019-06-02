import React from 'react';
import './index.pcss';

class Pagination extends React.Component {
    state = {
        pageNo: this.props.pageNo,
        pageSize: this.props.pageSize,
        total: this.props.total
    }

    static getDerivedStateFromProps({ total, pageNo, pageSize }, state) {
        const newState = {};

        if (total !== state.total) {
            newState.total = total;
        }

        if (pageNo !== state.pageNo) {
            newState.pageNo = pageNo;
        }

        if (pageSize !== state.pageSize) {
            newState.pageSize = pageSize;
        }

        return newState;
    }

    handlePage = (pageNo) => {
        const { pageSize } = this.state;

        if (this.props.onChange) {
            this.props.onChange(pageNo, pageSize);
        } else {
            this.setState({ pageNo });
        }
    }

    handlePre = () => {
        const { pageSize, pageNo } = this.state;

        if (pageNo === 1) return;

        if (this.props.onChange) {
            this.props.onChange(pageNo - 1, pageSize);
        } else {
            this.setState({ pageNo: pageNo - 1 });
        }
    }

    handleNext = () => {
        const { pageSize, pageNo, total } = this.state;

        if (pageNo === Math.ceil(total / pageSize)) return;

        if (this.props.onChange) {
            this.props.onChange(pageNo + 1, pageSize);
        } else {
            this.setState({ pageNo: pageNo + 1 });
        }
    }

    render() {
        const { pageNo, pageSize, total } = this.state;
        const allPageNo = Array(Math.ceil(total / pageSize)).fill(null);

        if (total === 0) return (
            <div className="pagination">
                <div className="total">共 {total} 条记录</div>
            </div>
        );

        return (
            <div className="pagination">
                {/* <div className="total">共 {total} 条记录</div> */}
                {pageNo !== 1 && <div className="prev" onClick={this.handlePre}>Prev</div>}
                {allPageNo.map((v, i) => {
                    const len = allPageNo.length;
                    const base = (<div key={i} onClick={this.handlePage.bind(null, i + 1)} className={`item ${(i === pageNo - 1) ? 'actived' : ''}`}>{i + 1}</div>);
                    const point = (<div className="item" style={{ pointerEvents: 'none' }}>...</div>);

                    let maxNumIn = 5;

                    if (pageNo === 4) {
                        maxNumIn = 6;
                    }

                    if ((i === 1 && pageNo > 5) || (i === len - 2 && pageNo < len - 3)) return point;

                    if (pageNo >= 5 && len > 10) {
                        if (i < pageNo - 3 && i !== 0) return null;

                        if (i < pageNo + 2) return base;
                    }

                    if (i < maxNumIn || i + 1 === len) return base;

                    return null;
                })}
                {pageNo * pageSize < total && <div className="next" onClick={this.handleNext}>Next</div>}
            </div>
        );
    }
}

Pagination.defaultProps = {
    pageNo: 1,
    pageSize: 10,
    total: 0
};

export default Pagination;
