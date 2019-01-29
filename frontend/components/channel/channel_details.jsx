import React from 'react';
import { connect } from 'react-redux';

class ChannelDetails extends React.Component {
  render() {
    return (
      <div className="channel-detail-container">
        <div>CHANNEL DETAILS</div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return ({

  })
}

const mapDispatchToProps = dispatch => {
  return ({
    
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelDetails);