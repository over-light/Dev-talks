import React, { useEffect } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import './App.css'
import './main.css'
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Alert from './components/layout/Alert';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routes/PrivateRoute';
import CreateProfile from './components/profile-form/CreateProfile';
import EditProfile from './components/profile-form/EditProfile';
import AddExperience from './components/profile-form/AddExperience';
import AddEducation from './components/profile-form/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import Sidenav from './components/layout/Sidenav';
import Backdrop from './components/layout/Backdrop';
import { useState } from 'react';


const WithContainer = () => {

  const [siteDrawerOpen, setSideDrawerOpen] = useState(false)

  const drawerToggleHandler = () => {
    setSideDrawerOpen(!siteDrawerOpen)
  }
  const backDropHandler = () => {
    setSideDrawerOpen(false)
  }
  let backdrop;
  if (siteDrawerOpen) {
    backdrop = <Backdrop backDropHandler={backDropHandler} />
  }
  return (
    <>
      <Navbar drawerToggleHandler={drawerToggleHandler} />

      <Sidenav show={siteDrawerOpen} />

      {backdrop}
      <div className="container">
        <div className="row">
          <div className="col-1"></div>
          <div className="col-md-8 col-sm-12 container__middle-div container">
            <Alert />
            <Route exact path='/profiles' component={Profiles} />
            <Route exact path='/profile/:id' component={Profile} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <PrivateRoute exact path='/createprofile' component={CreateProfile} />
            <PrivateRoute exact path='/edit-profile' component={EditProfile} />
            <PrivateRoute exact path='/add-experience' component={AddExperience} />
            <PrivateRoute exact path='/add-education' component={AddEducation} />
            <PrivateRoute exact path='/posts' component={Posts} />
            <PrivateRoute exact path='/posts/:id' component={Post} />
          </div>
          <div className="col-md-3 col-sm-12 mt-2">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit veritatis aliquam, consectetur assumenda fugiat dolores saepe hic ducimus voluptatem alias molestiae necessitatibus ratione corrupti mollitia reprehenderit ad tempora animi excepturi provident magni beatae? Sapiente perspiciatis placeat maiores mollitia fugiat maxime qui nemo atque nobis quas, aliquid ab doloribus eos ratione, exercitationem quae nihil animi sit voluptates! Quasi, natus quibusdam illum distinctio hic saepe qui veniam expedita ullam dolore ratione quod magni debitis, itaque cumque nihil ad, tenetur velit? Dolores officiis, hic, porro vitae at non quaerat perspiciatis fuga delectus nesciunt natus inventore magni eligendi tempore illo laboriosam rerum repudiandae unde.
          </div>
        </div>
      </div>

    </>)
}


//? set auth token if there is any first
//TODO put this in useEffect() 
if (localStorage.token)
  setAuthToken(localStorage.token)

const App = () => {

  useEffect(() => {
    //! we can't call loadUser() like this(in that case , pass iot through connect) we have to dispatch the action ...see notes.md
    store.dispatch(loadUser())
  }, [])



  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route component={WithContainer} /> {/* No match route */}
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
