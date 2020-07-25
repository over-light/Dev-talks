import axios from 'axios'
import { REGISTER_SUCCESS, REGISTER_FAIL, AUTH_ERROR, USER_LOADED, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_PROFILE } from './types'
import { setAlert } from './alert'
import { ENDPOINT } from '../ENDPOINT'
import setAuthToken from '../utils/setAuthToken'

// ? register user: post an axios request and if everything goes OK ;dispatch REGISTER_SUCCESS else for every error dispatch SET_ALERT and then dispatch REGISTER_FAILED
export const register = (name, email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ name, email, password })

    try {
        const res = await axios.post(`${ENDPOINT}/api/users`, body, config)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data // token
        })
        dispatch(loadUser())
    } catch (error) {
        const errors = error.response.data.errors

        if (errors)
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        dispatch({
            type: REGISTER_FAIL
        })
    }
}

export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }
    try {
        const res = await axios.get(`${ENDPOINT}/api/auth/`)
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (error) {
        console.log(error.response.data.errors);
        dispatch({
            type: AUTH_ERROR
        })

    }
}

//? login user
export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ email, password })
    try {
        const res = await axios.post(`${ENDPOINT}/api/auth/`, body, config)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data // token
        })
        dispatch(loadUser())
    } catch (error) {
        const errors = error.response.data.errors

        if (errors)
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        dispatch({
            type: LOGIN_FAIL
        })
    }
}

//! LOGOUT --clear token and profile

export const logout = () => dispatch => {
    dispatch({
        type: CLEAR_PROFILE
    })
    dispatch({
        type: LOGOUT
    })

}