import React from "react";
import { connect } from "react-redux";
import { createChannel } from '../../actions/channel_actions';
import { closeModal } from '../../actions/modal_actions';
import Toggle from 'react-toggle';

class ChannelNewModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {title: '', description: '', is_private: false };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value,
      creator_id: this.props.currentUser.id
    });
  }

  handleSubmit(e) {
    if (e.target.disabled) {
      return;
    }
    this.props.closeModal();
    e.preventDefault();
    const channel = Object.assign({}, this.state);
    this.props.createChannel(channel);
  }

  changeStatus() {
    this.setState({
      is_private: !(this.state.is_private)
    })
  }

  render() {
    let statusMessage = <span>Public - Anyone in your workspace can view and join this channel.</span>
    let status = "Public";
    let channeltype = <div className="form-title">Create a channel</div>
    if (this.state.is_private) {
      statusMessage = <span>Private - This channel can only be joined or viewed by invite</span>;
      channeltype = <div className="form-title">Create a private channel</div>;
      status = "Private";
    }
    return (
      <div className="modal-background">
        <div onClick={() => this.props.closeModal()} className="cancel-modal">
          <p></p>
          <p>esc</p>
        </div>
        <div className="modal-child" onClick={e => e.stopPropagation()}>
          <div className="new-channel-container">  
              <div className="new-channel-form">
                {channeltype}<br/>
                <div className="form-description">Channels are where your members communicate. They’re best when organized around a topic — #leads, for example.</div><br/>
                <form onSubmit={this.handleSubmit}>

                    <button type="button" className={`private-button-${this.state.is_private}`} onClick={() => this.changeStatus()}>{status}</button>
                    {statusMessage}

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
                      value="Create Channel"
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


const setStateToProps = ({ session, entities: { users } }) => {
  return ({
    currentUser: users[session.id],
  })
}

const setDispatchToProps = dispatch => {
  return ({
    createChannel: channel => dispatch(createChannel(channel)),
    closeModal: () => dispatch(closeModal())
  })
}

export default connect(setStateToProps, setDispatchToProps)(ChannelNewModal);