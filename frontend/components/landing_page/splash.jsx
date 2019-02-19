import React from 'react';
import { Link } from 'react-router-dom'

const Splash = () => {
  return (
    <div className="splash-container">
      <h1>Imagine what you’ll accomplish together</h1>
      <div className="splash-main-content">
        <div className="splash-image-above"></div>
        <div height="100%">
          <img src="https://i.ibb.co/WK9xX4B/Slack-Customer.jpg" height="502px"
            width="502px"></img>
          <p>Molly Moon creates a recipe for success with 6lack</p>
        </div>
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
          <p className="login-link-section">Already using 6lack? <Link to="/login">Sign in</Link>.</p>
          <div className="splash-image-below"></div>
        </div>
      </div>
    </div>
  )
}

export default Splash;