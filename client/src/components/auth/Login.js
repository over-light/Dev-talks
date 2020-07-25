import React, { useState } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Form, Row, Col, FormGroup, Label } from 'reactstrap'

import { login } from '../../actions/auth'

const Login = ({ login, isAuthenticated, handleToggle }) => {
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
        <Form onSubmit={(e) => handleSubmit(e)}>
            <Row form>
                <Col>
                    <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <input className='form-control' placeholder="Email Address" name="email" value={email} onChange={e => handleChange(e)} />
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="examplePassword" className="mr-sm-2">Password</Label>
                        <input className='form-control' type="password"
                            placeholder="Password"
                            name="password"
                            minLength="6"
                            value={password}
                            onChange={e => handleChange(e)} />
                    </FormGroup>
                    <div className='landing__footer'>
                        <button className='mt-2 btn'>Log in</button>
                        <span className='center-x color-green font-weight-bold mt-3' onClick={() => handleToggle()}>not a member? Sign up</span>
                    </div>
                </Col>
            </Row>
        </Form>

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
