import React from 'react';
import { Link } from 'react-router-dom'

const Splash = () => {
  return (
    <div className="splash-container">
      <h1>Imagine what you’ll<br/>accomplish together</h1>
      <div className="splash-main-content">
        <div className="splash-image"></div>
        <div>
          <p>
            Slack is a collaboration hub for work, no matter what work you do.
            It’s a place where conversations happen, decisions are made, and information is always at your fingertips.
            With Slack, your team is better connected.
          </p>
          <Link to="/signup"><button>Get Started</button></Link>
        </div>
      </div>
    </div>
  )
}

export default Splash;