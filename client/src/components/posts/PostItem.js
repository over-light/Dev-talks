import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { addLikes, removeLikes, deletePost } from '../../actions/post.action'
import './postItem.css'

const PostItem = ({ post: { _id, user, name, avatar, text, likes, comments, date }, auth, addLikes, removeLikes, deletePost, showActions }) => {
    return (
        <>
            <div className="post">
                <div className='post__section'>
                    <div className='post__left-section'>
                        <Link to={`/profile/${user}`}>
                            <img
                                className="post__image"
                                src={avatar}
                                alt="avatar"
                            />
                            <h4 className='post__name'>{name}</h4>
                        </Link>
                    </div>
                    <div className='post__right-section'>
                        <p className="my-1 post__text">
                            {text}
                        </p>
                        <p className="post__date">
                            posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
                        </p>
                    </div>
                </div>

                {showActions &&
                    <div className='post__actions'>
                        <button type="button" className="btn btn-light" onClick={() => addLikes(_id)}  >
                            <i className="fas fa-thumbs-up"></i>{' '}
                            {likes.length > 0 && <span>{likes.length}</span>}
                        </button>
                        <button type="button" className="btn btn-light" onClick={() => removeLikes(_id)}>
                            <i className="fas fa-thumbs-down"></i>
                        </button>
                        <Link to={`/posts/${_id}`} className="btn btn-primary-outline">
                            Discussion <span>{comments.length}</span>
                        </Link>
                        {
                            auth.loading === false && auth.user._id === user &&
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => deletePost(_id)}
                            >
                                <i className="fa fa-trash"></i>
                            </button>}
                    </div>}
            </div>
        </>
    );
};

PostItem.defaultProps = {
    showActions: true
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addLikes: PropTypes.func.isRequired,
    removeLikes: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth
})


export default connect(mapStateToProps, { addLikes, removeLikes, deletePost })(PostItem);