import React from 'react';
import { Link } from 'react-router-dom'

const Splash = () => {
  return (
    <div className="splash-container">
      <h1>Imagine what you’ll<br/>accomplish together</h1>
      <div className="splash-main-content">
        <div className="splash-image-above"></div>
        <div className="splash-image"></div>
        <p>Molly Moon creates a recipe for success with Slack</p>
        <div className="splash-content">
          <p>
            Slack is a collaboration hub for work, no matter what work you do.
            It’s a place where conversations happen, decisions are made, and information is always at your fingertips.
            With Slack, your team is better connected.
          </p>
          <div className="splash-signup-section">
            <form>
              <input type="text" placeholder="Email address" className="splash-input"/>
            </form>
            <Link to="/signup"><button>Get Started</button></Link>
          </div>
          <p className="login-link-section">Already using Slack? <Link to="/login">Sign in</Link>.</p>
          <div className="splash-image-below"></div>
        </div>
      </div>
    </div>
  )
}

export default Splash;