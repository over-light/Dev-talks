import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profile.action'
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileGithub from './ProfileGithub';
import './profile.css'

const Profile = ({ getProfileById, profile: { profile, loading }, auth, match }) => {
    useEffect(() => {
        console.log(match.params.id);
        getProfileById(match.params.id)
    }, [getProfileById, match.params.id])

    return (
        <>
            {

                profile === null || loading ? <Spinner /> :
                    <div className='profile__outer'>
                        <div className="profile__buttons">
                            <Link to='/profiles' className='btn' >Back to profiles</Link>
                            {auth.isAuthenticated && auth.loading === false && (auth.user._id === profile.user._id)
                                && (
                                    <Link to='/edit-profile' className='btn'>
                                        Edit Profile
                                    </Link>
                                )}
                        </div>
                        <div className="my-1">
                            <ProfileTop profile={profile} />
                            <ProfileAbout profile={profile} />
                            {profile.githubusername && <ProfileGithub username={profile.githubusername} />}
                        </div>
                    </div>
            }
        </>
    );
};

Profile.propTypes = {
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getProfileById: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth

})
export default connect(mapStateToProps, { getProfileById })(Profile);