import React from 'react';
import spinner from '../../img/spinner.gif'
import { Spinner as Spin } from 'reactstrap'
const Spinner = () => {
    return (
        <>
            {/* <img src={spinner} alt="loader.js" style={{ width: '200px', margin: 'auto', display: 'block' }}
            /> */}

            <Spin type="grow" color="success" />
            <Spin type="grow" color="success" />
            <Spin type="grow" color="success" />
            <Spin type="grow" color="success" />

        </>
    );
};

export default Spinner;