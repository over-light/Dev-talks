import React from 'react';
import './backdrop.css'
const Backdrop = ({ backDropHandler }) => {
    return (
        <div className='backdrop' onClick={backDropHandler}>
        </div>
    );
};

export default Backdrop;