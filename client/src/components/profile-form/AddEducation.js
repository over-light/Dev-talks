import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profille'
import { Link, withRouter } from 'react-router-dom';

const AddEducation = ({ addEducation, history }) => {
    const [formData, setFormData] = useState({
        school: '', degree: '', fieldofstudy: '', from: '', to: '', current: false, description: ''
    })
    const [disableToDate, setDisableToDate] = useState(false)

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })
    const { school, degree, fieldofstudy, from, to, current, description } = formData
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        addEducation(formData, history)
    }
    return (
        <>
            <section className="container">
                <h1 className="large text-primary">
                    Add Your Education
                 </h1>
                <p className="lead">
                    <i className="fas fa-code-branch"></i>  Add any school, bootcamp, etc that
        you have attended
                </p>
                <small>* = required field</small>
                <form className="form">
                    <div className="form-group">
                        <input type="text" placeholder="* Degree or Certificate" name="degree" value={degree} onChange={(e) => handleChange(e)} required />
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="* School or Bootcamp" name="school" value={school} onChange={(e) => handleChange(e)} required />
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Field Of Study" name="fieldofstudy" value={fieldofstudy} onChange={(e) => handleChange(e)} />
                    </div>
                    <div className="form-group">
                        <h4>From Date</h4>
                        <input type="date" name="from" value={from} onChange={(e) => handleChange(e)} />
                    </div>
                    <div className="form-group">
                        <p><input type="checkbox" name="current" value={current} onChange={() => {
                            setFormData({ ...formData, current: !current })
                            setDisableToDate(!disableToDate)
                        }} />Current School or Bootcamp</p>
                    </div>
                    <div className="form-group">
                        <h4>To Date</h4>
                        <input type="date" name="to" value={to} disabled={disableToDate} onChange={(e) => handleChange(e)} />
                    </div>
                    <div className="form-group">
                        <textarea
                            name="description"
                            cols="30"
                            rows="5"
                            placeholder="Program Description"
                            value={description} onChange={(e) => handleChange(e)}
                        ></textarea>
                    </div>
                    <input type="submit" className="btn btn-primary my-1" onClick={(e) => handleSubmit(e)} />
                    <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
                </form>
            </section>
        </>
    );
};

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(withRouter(AddEducation));