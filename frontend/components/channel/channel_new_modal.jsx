import React from "react";
import { connect } from "react-redux";
import { createChannel } from '../../actions/channel_actions';
import { closeModal } from '../../actions/modal_actions';
import Toggle from 'react-toggle';

class ChannelNewModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {title: '', description: '', private: false };
    this.handleSubmit = this.handleSubmit.bind(this);
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

  render() {
    return (
      <div className="modal-background">
        <div onClick={() => this.props.closeModal()} className="cancel-modal">
          <p></p>
          <p>esc</p>
        </div>
        <div className="modal-child" onClick={e => e.stopPropagation()}>
          <div className="new-channel-container">  
              <div className="new-channel-form">
                <div className="form-title">Create a channel</div><br/>
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


const setStateToProps = ({ session, entities: { users} }) => {
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