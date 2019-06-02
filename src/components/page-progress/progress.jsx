import React from 'react';
import './progress.pcss';

const Progress = ({ value }) => {

    if (value >= 100) return null;

    return (
        <div className="progress-wrapper">
            <div className="progress" style={{ transform: `translate3d(-${100 - value}%, 0, 0)` }}>
                <div className="peg"></div>
            </div>
            <div className="spinner"></div>
        </div>
    );
}

export default Progress;
