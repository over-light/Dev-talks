import React from 'react';

const DrawerToggleButton = ({ drawerToggleHandler }) => {
    const classes = {
        'width': '35px',
        'height': '35px',

        'marginRight': '15px'
    }
    return (
        <div>
            <div onClick={() => drawerToggleHandler()} style={classes}><i class="fa fa-user" aria-hidden="true"></i></div>
        </div >
    );
};

export default DrawerToggleButton;