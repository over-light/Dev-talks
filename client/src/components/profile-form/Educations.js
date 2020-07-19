import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteEducation } from '../../actions/profile.action'

const Educations = ({ education, deleteEducation }) => {

    const educations = education.map(
        edu => (
            <tr key={edu._id}>
                <td>{edu.school}</td>
                <td className='hide-sm'>{edu.degree}</td>
                <td><Moment format='DD/MM/YYYY'>{edu.from}</Moment> - {edu.to === null ? ('Now') : <Moment format='DD/MM/YYYY'>{edu.to}</Moment>}
                </td>
                <td><button className="btn btn-danger" onClick={() => deleteEducation(edu._id)}>Delete</button></td>
            </tr>
        )
    )

    return (
        <>
            <h2 className="my-2">educations Credentials</h2>

            <table className="table">
                <thead>
                    <tr>
                        <th>Institute</th>
                        <th className="hide-sm">Degree</th>
                        <th className="hide-sm">Years</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{educations}</tbody>
            </table>

        </>
    );
};

Educations.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired,

};

export default connect(null, { deleteEducation })(Educations);