import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { getCurrentProfile, deleteAccount } from '../../actions/profille'
import { Link } from 'react-router-dom'
import Spinner from '../layout/Spinner.js'
import DashboardLinks from './DashboardLinks';
import Experiences from '../profile-form/Experiences';
import Educations from '../profile-form/Educations';

const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading }, deleteAccount }) => {

    useEffect(() => {
        getCurrentProfile();
    }, [])


    return (
        loading
            ? <Spinner />
            : <>
                <h1 className="large text-primary">
                    Dashboard
                </h1>
                <p className="lead"><i className="fas fa-user"></i> Welcome {user && user.name}</p>
                {profile !== null ?
                    <>
                        <DashboardLinks />
                        {profile.data.experience.length > 0 ? <Experiences experience={profile.data.experience} /> : <p>Add your experience man :(</p>}
                        {profile.data.education.length > 0 ? <Educations education={profile.data.education} /> : <p>College drop out ? or Add your education now :( </p>}
                        <div className="my-2">
                            <button className="btn btn-danger" onClick={() => deleteAccount()}>
                                <i className="fas fa-user-minus"> Delete my account</i>
                            </button>
                        </div>
                    </>
                    :
                    <>
                        <p>You are a no profile guy 😢 create one</p>
                        <Link to='/createProfile' className="btn btn-primary my-1">
                            Create Profile
                        </Link>
                    </>
                }

            </>
    )
}
Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired

};
const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);