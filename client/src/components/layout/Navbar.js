import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { logout } from '../../actions/auth'
import PropTypes from 'prop-types'


const Navbar = ({ logout, auth: { isAuthenticated, loading } }) => {

    const authLinks = (
        <ul>
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
    )

    const guestLinks = (
        <ul>
            <li> <Link to='#!'>Developers</Link></li>
            <li><Link to='/register'>Register</Link></li>
            <li><Link to='/login' >Login</Link></li>
        </ul>

    )

    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to='/'>
                    <i className="fas fa-code"></i> DevConnector
                </Link>
            </h1>
            {
                !loading ?
                    <>  {isAuthenticated ? authLinks : guestLinks}</>
                    : null
            }

        </nav>
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