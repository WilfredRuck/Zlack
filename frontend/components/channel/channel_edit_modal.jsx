import React from "react";
import { connect } from "react-redux";
import { updateChannel } from '../../actions/channel_actions';
import { closeModal } from '../../actions/modal_actions';
import Toggle from 'react-toggle';
import { withRouter } from 'react-router-dom';

class ChannelEditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {title: this.props.channel.title, description: this.props.channel.description, is_private: false };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value,
      id: this.props.channel.id
    });
  }

  handleSubmit(e) {
    if (e.target.disabled) {
      return;
    }
    this.props.closeModal();
    e.preventDefault();
    const channel = Object.assign({}, this.state);
    this.props.updateChannel(channel);
  }

  render() {
    debugger
    return (
      <div className="modal-background">
        <div onClick={() => this.props.closeModal()} className="cancel-modal">
          <p></p>
          <p>esc</p>
        </div>
        <div className="modal-child" onClick={e => e.stopPropagation()}>
          <div className="new-channel-container">  
              <div className="new-channel-form">
                <div className="form-title">Edit channel</div><br/>
                <div className="form-description">Channels are where your members communicate. They’re best when organized around a topic — #leads, for example.</div><br/>
                <form onSubmit={this.handleSubmit}>

                  <label className="toggle-group">
                    <Toggle
                      defaultChecked={true}
                      disabled={true}
                      className='custom-classname'
                    />
                    <span>Public - Anyone in your workspace can view and join this channel.</span>
                  </label>

                  <label>Name <br/>
                    <input 
                      type="text" 
                      placeholder="# e.g. leads"
                      value={this.state.title}
                      onChange={this.update('title')}
                    />
                  </label>
                  <p>Names must be lowercase, without spaces or periods, and shorter than 22 characters.</p>

                  <label>Purpose <p className="dim">(optional)</p>
                    <input 
                      type="text"
                      value={this.state.description}
                      onChange={this.update('description')}
                    />
                  </label>
                    <p> What's this channel about?</p><br/>

                  <div className="form-buttons">
                    <input 
                      type="button" 
                      value="Cancel"
                      onClick={() => this.props.closeModal()}
                    />
                    <input 
                      type="submit"
                      disabled={!this.state.title}
                      value="Update Channel"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
      </div>
    )
  }
}


const setStateToProps = ({ session, entities: { users, channels } }, ownProps) => {
  let channelId = ownProps.match.params.channelId;
  // debugger
  let channel = channels[7] || {title: "", description: ""};
  return ({
    currentUser: users[session.id],
    channel: channel,
  })
}

const setDispatchToProps = dispatch => {
  return ({
    updateChannel: channel => dispatch(updateChannel(channel)),
    closeModal: () => dispatch(closeModal())
  })
}

export default withRouter(connect(setStateToProps, setDispatchToProps)(ChannelEditModal));