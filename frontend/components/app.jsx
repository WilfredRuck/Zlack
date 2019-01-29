import React from 'react';
import { Link } from 'react-router-dom';
import NavContainer from './nav/nav_container';
import SignUpFormContainer from './session_form/signup_form_container';
import LogInFormContainer from './session_form/login_form_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import Splash from '../components/landing_page/splash';
import Footer from './landing_page/footer';
import ChannelNav from './channel/channel_nav';
import ChannelContainer from './channel/channel_container';
import ChannelNewModal from './channel/channel_new_modal';
import Modal from './ui/modal';

const App = () => (
  <div>
    <ProtectedRoute path="/channels" component={Modal}/>
    <div className="main-container">
      <ProtectedRoute path="/channels/new" component={ChannelNewModal}/>
      <ProtectedRoute path="/channels/:channelId" component={ChannelNav}/>
      <ProtectedRoute path="/channels/:channelId" component={ChannelContainer}/>
    </div>
    <AuthRoute exact path="/" component={NavContainer} />
    <AuthRoute exact path="/login" component={NavContainer} />
    <AuthRoute exact path="/signup" component={NavContainer} />
    <AuthRoute exact path="/" component={Splash} />
    <AuthRoute exact path="/login" component={LogInFormContainer} />
    <AuthRoute exact path="/signup" component={SignUpFormContainer} />
    <AuthRoute exact path="/" component={Footer}/>
    <AuthRoute exact path="/login" component={Footer}/>
    <AuthRoute exact path="/signup" component={Footer}/>
  </div>
);

export default App;