import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post.action'
import { setAlert } from '../../actions/alert';
import './addPostForm.css'

//TODO restrict the user has not created his/her profile's yet 
const AddPostForm = ({ addPost, isAuthenticated }) => {
    const [text, setText] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isAuthenticated) {
            addPost({ text })
            setText('')
        }
        else
            setAlert('please log in to add post', 'danger')
    }
    return (
        <div className="add-post">
            <form className="my-1 add-post__form">
                <textarea name="text" rows="5" placeholder="Create a post...." required value={text} onChange={e => setText(e.target.value)}></textarea>
                <button type="submit" className="btn my-1 add-post__button" onClick={(e) => handleSubmit(e)}>
                    <i className="fa fa-paper-plane fa-2x"></i>
                </button>
            </form>
        </div>

    );
};

AddPostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
    {
        isAuthenticated: state.auth.isAuthenticated
    }
)

export default connect(mapStateToProps, { addPost })(AddPostForm);