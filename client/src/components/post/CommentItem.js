import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/post.action'
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const CommentItem = ({ post_id, comment: { date, _id, text, name, avatar, user }, auth, deleteComment }) => {
    const handleDelete = () => {

    }
    return (
        <>
            <div className="comment-item bg-transparent p-3 my-1 d-flex border-bottom">
                <div className='comment-item__left-div mr-3'>
                    <Link to={`/profile/${user}`}>
                        <img className="post__image" src={avatar} alt="avatar" />
                        <h6 className='mt-2 text-center'>{name}</h6>
                    </Link>
                </div>
                <div className='comment-item__right-div'>
                    <p className="my-1">{text}</p>
                    <p className="post-date">Posted on{' '}<Moment format='DD/MM/YYYY'> {date}</Moment></p>
                    {!auth.loading && auth.user._id === user &&
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={(e) => deleteComment(post_id, _id)}>
                            <i className="fa fa-trash"></i>
                        </button>}
                </div>
            </div>
        </>
    );
};

CommentItem.propTypes = {
    auth: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
    post_id: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { deleteComment })(CommentItem);