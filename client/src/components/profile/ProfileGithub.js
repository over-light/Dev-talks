import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGithubRepos } from '../../actions/profile.action';
import Spinner from '../layout/Spinner';
const ProfileGithub = ({ username, getGithubRepos, repos }) => {

    useEffect(() => {
        getGithubRepos(username);
    }, [getGithubRepos, username])

    return (
        <div className='profile-github mt-2'>
            <h2 className="my-3 border-top px-3">Github Repos</h2>
            {repos === null ? <Spinner /> : (
                repos.map(repo => (
                    <div key={repo.id} className="profile__github-repo bg-transparent p-2 m-1">
                        <div>
                            <h4><a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a></h4>
                            {repo.description && <p>{repo.description}</p>}
                        </div>
                        <div>
                            <ul>
                                <li className="">Stars: {repo.stargazers_count}</li>
                                <li className="">Watchers: {repo.watchers_count}</li>
                            </ul>
                        </div>
                    </div>
                ))
            )}

            <div>

            </div>

        </div>

    );
};

ProfileGithub.propTypes = {
    repos: PropTypes.array,
};

const mapStateToProps = state => ({
    repos: state.profile.repos
})
export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);