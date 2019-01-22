import React from 'react';
import { Link } from 'react-router-dom';

const Greeting = ({ currentUser, logout }) => {
  const sessionLinks = () => (
    <nav>
      <Link to="/login" className='nav-login'>Sign in</Link>
      <Link to="/signup" className='nav-signup'>Get Started</Link>
    </nav>
  );
  const personalGreeting = () => (
    <nav>
      <p>Hi, {currentUser.username}!</p>
      <button onClick={logout}>Log Out</button>
    </nav>
  );

  return currentUser ? personalGreeting() : sessionLinks();
};


export default Greeting;
