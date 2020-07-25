import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { logout } from '../../actions/auth'
import PropTypes from 'prop-types'
import './navbar.css'
import DrawerToggleButton from './DrawerToggleButton';

const Navbar = ({ logout, auth: { isAuthenticated, loading }, drawerToggleHandler }) => {

    const authLinks = (
        <div className='toolbar__nav-items' >
            <ul>
                <li>
                    <Link to='/profiles'>
                        <span>Developers</span>
                    </Link>
                </li>
                <li>
                    <Link to='/posts'>
                        <span>Posts</span>
                    </Link>
                </li>
                <li>
                    <Link to='/dashboard'>
                        <i className="fas fa-user"></i>{' '}
                        <span className="hide-sm">Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link to='/' onClick={logout}>
                        <i className="fas fa-sign-out-alt"></i>{' '}
                        <span className="hide-sm">Logout</span>
                    </Link>
                </li>
            </ul>
        </div>
    )

    const guestLinks = (
        <div className='toolbar__nav-items' >
            <ul>
                <li>
                    <Link to='/profiles'>
                        <span>Developers</span>
                    </Link>
                </li>
                <li><Link to='/'>Register/Login</Link></li>
            </ul>
        </div>

    )

    return (
        <header className="toolbar">
            <nav className="toolbar__navigation">
                <div className='toolbar__toggle-button'>
                    <DrawerToggleButton drawerToggleHandler={drawerToggleHandler} />
                </div>
                <div className='toolbar__logo'>
                    <Link to='/'>
                        <i className="fas fa-code"></i>{' '}Dev-talks
                    </Link>
                </div>
                <div className='dummy-div' />
                {
                    !loading ?
                        <>  {isAuthenticated ? authLinks : guestLinks}</>
                        : null
                }

            </nav>
        </header>
    );
};

//TODO create a loading spinner when loading

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => (
    {
        auth: state.auth
    }
)

export default connect(mapStateToProps, { logout })(Navbar);