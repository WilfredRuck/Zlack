import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ currentUser, logout }) => {
  return (
      <header className="splash-nav">
        <div>
          <Link to="/" className="logo">
              <img src="https://i.ibb.co/JpnqNm7/6lack.png" width="125em" height="50em" alt="6lack logo"/>
          </Link>
          <nav>
            <Link to="/login" className='nav-login'>Sign in</Link>
            <Link to="/signup" className='nav-signup'>Get Started</Link>
          </nav>
        </div>
      </header>
    );
};


export default Nav;
