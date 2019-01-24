import React from 'react';

const Channel = (props) => {
  return (
    <div className="channel-container">
      
      <header className="channel-header">
        <h1>#CHANNEL TITLE</h1>
      </header>

      <div className="chatbox-container">
        <div className="chatbox">
          MESSAGES WILL GO HERE
        </div>

        <div className="form">
          MESSAGE SUBMISSION FORM WILL GO HERE
        </div>
      </div>

    </div>
  )
}

export default Channel;