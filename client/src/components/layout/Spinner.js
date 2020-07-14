import React from 'react';
import spinner from '../../img/spinner.gif'
const Spinner = () => {
    return (
        <>
            <img src={spinner} alt="loader.js" style={{ width: '200px', margin: 'auto', display: 'block' }}
            />
        </>
    );
};

export default Spinner;