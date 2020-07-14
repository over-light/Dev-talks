import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import { login } from '../../actions/auth'

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const { email, password } = formData
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

    const handleSubmit = (e) => {
        e.preventDefault()
        login(email, password)
    }

    //? redirect if logged in
    if (isAuthenticated) {
        return <Redirect to='/dashboard/' />
    }

    return (
        <>
            <section className="container">
                <h1 className="large text-primary">Sign In</h1>
                <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>

                <form className="form" onSubmit={e => handleSubmit(e)}>
                    <div className="form-group">
                        <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => handleChange(e)} />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            minLength="6"
                            value={password}
                            onChange={e => handleChange(e)}
                        />
                    </div>

                    <input type="submit" className="btn btn-primary" value="Sign in" />
                </form>
                <p className="my-1">
                    Already have an account? <Link to='/register'>Sign up</Link>
                </p>
            </section>
        </>
    );
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

//? bring auth state(isAuthenticated key) , to redirect after success auth
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);