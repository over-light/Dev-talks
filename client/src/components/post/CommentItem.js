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
            <div className="post bg-white p-1 my-1">
                <div>
                    <Link to={`/profile/${user}`}>
                        <img className="round-img" src={avatar} alt="avatar" />
                        <h4>{name}</h4>
                    </Link>
                </div>
                <div>
                    <p className="my-1">{text}</p>
                    <p className="post-date">Posted on{' '}<Moment format='DD/MM/YYYY'> {date}</Moment></p>
                    {!auth.loading && auth.user._id === user &&
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={(e) => deleteComment(post_id, _id)}>
                            <i className="fas fa-times"></i>
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