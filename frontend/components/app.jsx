import React from 'react';
import NavContainer from './nav/nav_container';
import SignUpFormContainer from './session_form/signup_form_container';
import LogInFormContainer from './session_form/login_form_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import Splash from '../components/landing_page/splash';
import Footer from './landing_page/footer';
import ChannelContainer from './channel/channel_container';
import Modal from './ui/modal';

const App = () => (
  <div>
    <ProtectedRoute path="/channels/:channelId" component={Modal}/>
    <ProtectedRoute path="/channels/:channelId" component={ChannelContainer}/>
    <AuthRoute exact path="/" component={NavContainer}/>
    <AuthRoute exact path="/login" component={NavContainer}/>
    <AuthRoute exact path="/signup" component={NavContainer}/>
    <AuthRoute exact path="/" component={Splash}/>
    <AuthRoute exact path="/login" component={LogInFormContainer}/>
    <AuthRoute exact path="/signup" component={SignUpFormContainer}/>
    <AuthRoute exact path="/" component={Footer}/>
    <AuthRoute exact path="/login" component={Footer}/>
    <AuthRoute exact path="/signup" component={Footer}/>
  </div>
);

export default App;