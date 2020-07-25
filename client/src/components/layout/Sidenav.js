import React from 'react';
import { Link } from 'react-router-dom';
import './sidenav.css'
import { connect } from 'react-redux';
import { logout } from '../../actions/auth'
const Sidenav = ({ show, logout }) => {
    let drawerClasses = 'side-drawer'
    if (show)
        drawerClasses = 'side-drawer side-drawer-open'

    return (
        <nav className={drawerClasses}>
            <ul>
                <li><Link to="/profiles">Developer</Link></li>
                <li><Link to="/posts">Post</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="">Github jobs</Link></li>
                <li><Link to="">About</Link></li>
                <li><Link to="/" onClick={logout}>Logout</Link></li>
            </ul>

        </nav>
    );
};


export default connect(null, { logout })(Sidenav);