import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post.action'
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import AddPostForm from './AddPostForm';
const Posts = ({ getPosts, post: { posts, loading } }) => {

    useEffect(() => {
        getPosts()
    }, [getPosts])

    return (
        loading ? <Spinner /> :
            <>
                {/* <p className="lead">
                    <i className="fas fa-user"></i>{' '}Welcome to community
                </p> */}
                <AddPostForm />

                {loading === false && posts.map(post => <PostItem key={post._id} post={post} />)}

            </>


    );
};

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    post: state.post
}
)
export default connect(mapStateToProps, { getPosts })(Posts);