import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { getCurrentProfile, deleteAccount } from '../../actions/profile.action'
import { Link } from 'react-router-dom'
import Spinner from '../layout/Spinner.js'
import DashboardLinks from './DashboardLinks';
import Experiences from '../profile-form/Experiences';
import Educations from '../profile-form/Educations';
import './dashboard.css'


const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading }, deleteAccount }) => {

    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile])


    return (
        loading
            ? <Spinner />
            : <div className='dashboard'>
                <h1 className="large">
                    Dashboard
                </h1>
                <p className="lead"><i className="fas fa-user"></i> Welcome {user && user.name}</p>
                {profile !== null ?
                    <>
                        <DashboardLinks />
                        {profile.experience.length > 0 ? <Experiences experience={profile.experience} /> : <p className='my-2'>Add your experience man :(</p>}
                        {profile.education.length > 0 ? <Educations education={profile.education} /> : <p className='my-2'>College drop out ? or Add your education now :( </p>}
                        <div className="my-2">
                            <button className="btn btn-danger" onClick={() => deleteAccount()}>
                                <i className="fas fa-user-minus"> Delete my account</i>
                            </button>
                        </div>
                    </>
                    :
                    <div>
                        <p className='my-2'>You are a no profile guy :( create one</p>
                        <Link to='/createProfile' className="btn btn-primary my-1">
                            Create Profile
                        </Link>
                    </div>
                }

            </div>
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