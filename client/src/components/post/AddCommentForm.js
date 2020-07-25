import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post.action'
import { setAlert } from '../../actions/alert';


//TODO restrict the user has not created his/her profile's yet 
const AddCommentForm = ({ addComment, isAuthenticated, post_id }) => {
    const [text, setText] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isAuthenticated) {
            addComment({ text }, post_id)
            setText('')
        }
        else
            setAlert('please log in to add comment', 'danger')
    }
    return (
        <div className="post-form border-bottom">
            <div className="">
                <h5 className='text-center my-2'>comment section</h5>
            </div>
            <form className="form my-1">
                <textarea className='border-0' name="text" cols="30" rows="5" placeholder="leave a comment..." required value={text} onChange={e => setText(e.target.value)}></textarea>
                <input type="submit" className="btn btn-dark m-1 " value="Submit" onClick={(e) => handleSubmit(e)} />
            </form>
        </div>

    );
};

AddCommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
    {
        isAuthenticated: state.auth.isAuthenticated
    }
)

export default connect(mapStateToProps, { addComment })(AddCommentForm);