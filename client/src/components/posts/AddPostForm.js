import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post.action'
import { setAlert } from '../../actions/alert';


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
        <div className="post-form">
            <div className="bg-primary p">
                <h3>Say Something...</h3>
            </div>
            <form className="form my-1">
                <textarea name="text" cols="30" rows="5" placeholder="Create a post" required value={text} onChange={e => setText(e.target.value)}></textarea>
                <input type="submit" className="btn btn-dark my-1" value="Submit" onClick={(e) => handleSubmit(e)} />
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