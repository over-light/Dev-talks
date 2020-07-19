import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import profile from './profile'
import post from './post.reducer'

export default combineReducers({
    alert, auth, profile, post

})