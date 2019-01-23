import React from 'react';
import { Link } from 'react-router-dom';
import GreetingContainer from './greeting/greeting_container';
import SignUpFormContainer from './session_form/signup_form_container';
import LogInFormContainer from './session_form/login_form_container';
import { AuthRoute } from '../util/route_util';
import Splash from '../components/landing_page/splash';

const App = () => (
  <div>
    <header>
      <div>
        <Link to="/" className="logo">
          <img src="https://i.ibb.co/JpnqNm7/6lack.png" width="20%" height="20%" alt="6lack logo"/>
        </Link>
        <GreetingContainer />
      </div>
    </header>
    <div>
      <AuthRoute exact path="/" component={Splash} />
    </div>
    <AuthRoute exact path="/login" component={LogInFormContainer} />
    <AuthRoute exact path="/signup" component={SignUpFormContainer} />
  </div>
);

export default App;