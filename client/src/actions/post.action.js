import axios from 'axios'
import { ENDPOINT } from '../ENDPOINT'
import { GET_POSTS, POST_ERROR, UPDATE_LIKES, DELETE_POST, ADD_POST, GET_POST, ADD_COMMENT, DELETE_COMMENT } from '../actions/types'
import { setAlert } from './alert';

// Get posts
export const getPosts = () => async (dispatch) => {
    try {
        const res = await axios.get(`${ENDPOINT}/api/posts/all`);
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })

    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

// get post
export const getPost = id => async (dispatch) => {
    try {
        const res = await axios.get(`${ENDPOINT}/api/posts/${id}`);
        dispatch({
            type: GET_POST,
            payload: res.data
        })

    } catch (error) {
        console.log(error);
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

//? add likes
export const addLikes = id => async (dispatch) => {
    try {
        console.log(id);
        const res = await axios.put(`${ENDPOINT}/api/posts/like/${id}`)
        dispatch(
            {
                type: UPDATE_LIKES,
                payload: { id, likes: res.data }
            }
        )
    } catch (error) {
        console.log(error);
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

//! remove likes
export const removeLikes = id => async (dispatch) => {
    try {
        const res = await axios.put(`${ENDPOINT}/api/posts/unlike/${id}`)
        dispatch(
            {
                type: UPDATE_LIKES,
                payload: { id, likes: res.data }
            }
        )
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

//! delete post
export const deletePost = id => async (dispatch) => {
    try {
        await axios.delete(`${ENDPOINT}/api/posts/${id}`)
        dispatch({
            type: DELETE_POST,
            payload: id
        })
        dispatch(setAlert('Post removed', 'success'))

    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

// add  post
export const addPost = (formData) => async (dispatch) => {

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post(`${ENDPOINT}/api/posts/`, formData, config);

        dispatch({
            type: ADD_POST,
            payload: res.data
        })
        dispatch(setAlert('new post added', 'success'))
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

// add comment
export const addComment = (formData, post_id) => async (dispatch) => {

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        console.log(post_id);
        const res = await axios.post(`${ENDPOINT}/api/posts/comments/${post_id}`, formData, config);

        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        })
        dispatch(setAlert('new comment added', 'success'))
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

//! delete comment
export const deleteComment = (post_id, comment_id) => async (dispatch) => {

    try {
        await axios.delete(`${ENDPOINT}/api/posts/comments/${post_id}/${comment_id}`);

        dispatch({
            type: DELETE_COMMENT,
            payload: comment_id
        })
        dispatch(setAlert('comment deleted', 'success'))
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
} 