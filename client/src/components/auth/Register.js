import React, { useState } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAlert } from '../../actions/alert'
import { register } from '../../actions/auth'
import PropTypes from 'prop-types';
import { Form, Row, Col, FormGroup, Label } from 'reactstrap'

const Register = ({ setAlert, register, isAuthenticated, handleToggle }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })
    const { name, email, password, password2 } = formData
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })
    const handleSubmit = (e) => {
        e.preventDefault()
        if (password !== password2)
            setAlert('passwords do not match', 'danger')
        else
            register(name, email, password)
    }

    //? redirect if logged in
    if (isAuthenticated) {
        return <Redirect to='/dashboard/' />
    }

    return (

        <Form onSubmit={e => handleSubmit(e)}>
            <Row form>
                <Col>
                    <FormGroup>
                        <Label for="name">name</Label>
                        <input className=' form-control' type="text" name="name" value={name} onChange={e => handleChange(e)} placeholder="hey coder :)" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <input className='form-control' type="email" name="email" value={email} onChange={e => handleChange(e)} placeholder="I dont collect email" />
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="examplePassword" className="mr-sm-2">Password</Label>
                        <input className='form-control' type="password"
                            placeholder="Password"
                            name="password"

                            value={password}
                            onChange={e => handleChange(e)} />
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="examplePassword" className="mr-sm-2">Password</Label>
                        <input className='form-control' type="password"
                            placeholder="Confirm Password"
                            name="password2"

                            value={password2}
                            onChange={e => handleChange(e)} />
                    </FormGroup>

                    <div className='landing__footer mt-4'>
                        <button className='mt-2 btn btn-primary'>Signup</button>
                        <span className='center-x color-green font-weight-bold mt-3' onClick={() => handleToggle()}>already a member? log in</span>
                    </div>
                </Col>
            </Row>
        </Form>


    );
};
Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired
}

//? bring auth state(isAuthenticated key) , to redirect after success auth
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, register })(Register);
