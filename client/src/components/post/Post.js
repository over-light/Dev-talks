import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPost } from '../../actions/post.action'
import PostItem from '../posts/PostItem';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import AddCommentForm from './AddCommentForm';
import CommentItem from './CommentItem';

const Post = ({ getPost, post, loading, match }) => {

    useEffect(() => {
        getPost(match.params.id)
    }, [getPost, match.params.id])

    return (
        loading || post === null ? <Spinner /> :
            <>
                <Link to='/posts' className='btn btn-primary'>Back to Post</Link>
                <PostItem post={post} showActions={false} />
                <AddCommentForm post_id={post._id} />

                {post.comments.map(comment => <CommentItem key={comment._id} comment={comment} post_id={post._id} />)}
            </>
    );
};

Post.propTypes = {
    post: PropTypes.object,
    loading: PropTypes.bool.isRequired,
};
const mapStateToProps = state => ({
    post: state.post.post,
    loading: state.post.loading
})

export default connect(mapStateToProps, { getPost })(Post);