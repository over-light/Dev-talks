import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { getAllProfiles } from '../../actions/profile.action'
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import './profiles.css'

const Profiles = ({ profile: { profiles, loading }, getAllProfiles }) => {

    useEffect(() => {
        getAllProfiles()
    }, [getAllProfiles])

    return (
        <>
            {
                loading ? <Spinner /> :
                    <div className='profiles__section'>
                        <h1 className="profiles__header">Developers</h1>
                        <p className="profiles__lead"><i className="fab fa-connectdevelop"></i>{' '}Browse and connect with developers</p>
                        < div className="profiles">
                            {profiles.length > 0 && (
                                profiles.map(profile => (
                                    <ProfileItem key={profile._id} profile={profile} />
                                ))
                            )
                            }
                        </div>
                    </div>
            }
        </>
    )

};

Profiles.propTypes = {
    profile: PropTypes.object.isRequired,
    getAllProfiles: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
    profile: state.profile
})


export default connect(mapStateToProps, { getAllProfiles })(Profiles);