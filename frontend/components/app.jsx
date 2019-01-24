import React from 'react';
import { Link } from 'react-router-dom';
import NavContainer from './nav/nav_container';
import SignUpFormContainer from './session_form/signup_form_container';
import LogInFormContainer from './session_form/login_form_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import Splash from '../components/landing_page/splash';
import Footer from './landing_page/footer';
import ChannelNav from './channel/channel_nav';
import Channel from './channel/channel';

const App = () => (
  <div>
    <div className="main-container">
      <ProtectedRoute path="/channels" component={ChannelNav}/>
      <ProtectedRoute path="/channels" component={Channel}/>
    </div>
    <AuthRoute path="/" component={NavContainer} />
    <AuthRoute exact path="/" component={Splash} />
    <AuthRoute exact path="/login" component={LogInFormContainer} />
    <AuthRoute exact path="/signup" component={SignUpFormContainer} />
    <AuthRoute path="/" component={Footer}/>
  </div>
);

export default App;