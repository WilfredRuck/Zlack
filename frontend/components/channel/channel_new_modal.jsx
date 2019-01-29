import React from "react";
import { connect } from "react-redux";
import { createChannel } from '../../actions/channel_actions';
import { closeModal } from '../../actions/modal_actions';

class ChannelNewModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {title: '', description: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value,
      creator_id: this.props.currentUser.id
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const channel = Object.assign({}, this.state);
    this.props.createChannel(channel);
  }

  render() {
    return (
      <div className="new-channel-container">  
        <div>
          <div onClick={() => this.props.closeModal()} className="cancel-modal">X</div>
          <div>Create a Channel</div><br/>
          <div>Channels are where your members communicate. They’re best when organized around a topic — #leads, for example.</div><br/>
          <form onSubmit={this.handleSubmit}>
          <label>Name <br/>
            <input 
              type="text" 
              placeholder="e.g. leads"
              value={this.state.title}
              onChange={this.update('title')}
            />
            <br/>
          </label>

          <label>Purpose(optional) <br/>
            <input 
              type="text"
              value={this.state.description}
              onChange={this.update('description')}
            />
            <br/>
          </label>
          
            <input 
              type="submit" 
              value="Create Channel"
            />
          </form>
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