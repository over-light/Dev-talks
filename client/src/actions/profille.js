import axios from 'axios'
import { ENDPOINT } from '../ENDPOINT'
import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, CLEAR_PROFILE, LOGOUT, GET_PROFILES, GET_REPOS } from './types';
import { setAlert } from './alert';

export const getCurrentProfile = () => async (dispatch) => {
    try {
        const data = await axios.get(`${ENDPOINT}/api/profile/me`);
        dispatch({
            type: GET_PROFILE,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.data.msg,
                status: error.response.status
            }
        })
    }
}
// get all profiles
export const getAllProfiles = () => async (dispatch) => {
    dispatch({ type: CLEAR_PROFILE })
    try {
        const data = await axios.get(`${ENDPOINT}/api/profile/`);
        dispatch({
            type: GET_PROFILES,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.data.msg,
                status: error.response.status
            }
        })
    }
}

// get profile by user id
export const getProfileById = userId => async (dispatch) => {

    try {
        const data = await axios.get(`${ENDPOINT}/api/profile/user/${userId}`);
        dispatch({
            type: GET_PROFILE,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.data.msg,
                status: error.response.status
            }
        })
    }
}

// get github repos
export const getGithubRepos = username => async (dispatch) => {
    try {
        const res = await axios.get(`${ENDPOINT}/api/profile/github/${username}`);
        dispatch({
            type: GET_REPOS,
            payload: res.data
        })

    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.data.msg,
                status: error.response.status
            }
        })
    }
}

//? create or update profile
export const createOrUpdateProfile = (formData, history, isEdit = false) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const data = await axios.post(`${ENDPOINT}/api/profile/`, formData, config);
        dispatch({
            type: GET_PROFILE,
            payload: data
        })
        dispatch(setAlert(isEdit ? 'Profile updated' : 'Profile created', 'success'))
        if (!isEdit)
            history.push('/dashboard')


    } catch (error) {
        const errors = error.response.data.errors

        if (errors)
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))

        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.data.msg,
                status: error.response.status
            }
        })
    }
}

//? add experience
export const addExperience = (formData, history) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const data = await axios.put(`${ENDPOINT}/api/profile/experience`, formData, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: data
        })
        dispatch(setAlert('experience added', 'success'))
        history.push('/dashboard')


    } catch (error) {
        const errors = error.response.data.errors
        if (errors)
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))

        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.data.msg,
                status: error.response.status
            }
        })
    }
}

//? add education
export const addEducation = (formData, history) => async (dispatch) => {

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const data = await axios.put(`${ENDPOINT}/api/profile/education`, formData, config);
        console.log(data);
        dispatch({
            type: UPDATE_PROFILE,
            payload: data
        })
        dispatch(setAlert('Education added', 'success'))

        history.push('/dashboard')


    } catch (error) {
        const errors = error.response.data.errors

        if (errors)
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))

        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.data.msg,
                status: error.response.status
            }
        })
    }
}

//! delete education
export const deleteEducation = id => async (dispatch) => {
    try {
        const data = await axios.delete(`${ENDPOINT}/api/profile/education/${id}`)
        console.log(data);
        dispatch({
            type: UPDATE_PROFILE,
            payload: data
        })
        dispatch(setAlert('education deleted successfully', 'success'))


    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })

    }

}

//! delete experience
export const deleteExperience = id => async (dispatch) => {
    try {
        const data = await axios.delete(`${ENDPOINT}/api/profile/experience/${id}`)

        dispatch({
            type: UPDATE_PROFILE,
            payload: data
        })
        dispatch(setAlert('experince deleted successfully', 'success'))

    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

//! delete account ( get the id from the token)
export const deleteAccount = () => async (dispatch) => {
    if (window.confirm("Are you sure , you want to delete your account?")) {
        try {
            const data = await axios.delete(`${ENDPOINT}/api/profile`)
            dispatch({
                type: CLEAR_PROFILE
            })
            dispatch({
                type: LOGOUT
            })

            dispatch(setAlert('your profile permanently deleted'))


        } catch (error) {
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: error.response.statusText, status: error.response.status }
            })
        }
    }
}