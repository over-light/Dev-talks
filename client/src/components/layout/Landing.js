import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import Register from '../auth/Register'
import Login from '../auth/Login'

import './landing.css'

const Landing = ({ isAuthenticated }) => {
    const [isLogin, setIsLogIn] = useState(false);

    const toggleLogInSignUp = () => {
        setIsLogIn(!isLogin)
    }
    // if authed then can't access the login -signup section, untill logout
    if (isAuthenticated)
        return <Redirect to='/posts' />


    //! cls-trm: dark-overlay   
    return (
        <section className="landing">
            <div className="landing__container center">
                <h1 className="x-large text-center landing__header">Developer Connector</h1>
                <span className='center-x color-green font-weight-bold'><Link to='/profiles'>Skip this process</Link> </span>
                {isLogin === true ? <Login handleToggle={toggleLogInSignUp} /> : <Register handleToggle={toggleLogInSignUp} />}
            </div>
        </section>
    );
};

Landing.propTypes = {
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Landing);