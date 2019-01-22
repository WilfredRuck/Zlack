import React from 'react';
import { Link } from 'react-router-dom';
import GreetingContainer from './greeting/greeting_container';
import SignUpFormContainer from './session_form/signup_form_container';
import LogInFormContainer from './session_form/login_form_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

const App = () => (
  <div>
    <header>
      <div>
        <Link to="/" className="logo">
          <h1>6lack</h1>
        </Link>
        <GreetingContainer />
      </div>
    </header>
    <div className="session-form-container">
      <div className='session-form'>
        <AuthRoute exact path="/login" component={LogInFormContainer} />
        <AuthRoute exact path="/signup" component={SignUpFormContainer} />
      </div>
    </div>
  </div>
);

export default App;