import React from "react";
import { connect } from "react-redux";
import { createChannel } from '../../actions/channel_actions';
import { closeModal } from '../../actions/modal_actions';

class NewDirectMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {title: this.props.currentUser.username, description: '', is_direct: true, creator_id: this.props.currentUser.id };
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
        <div className="dm-modal-child" onClick={e => e.stopPropagation()}>
          <div className="new-dm-container">  
              <div className="new-dm-form-group">
                <div className="form-title">Direct Messages</div><br/>
                <form className="new-dm-form" onSubmit={this.handleSubmit}>

                  <input 
                    type="search" 
                    placeholder="Find or start a conversation"
                  />

                  <input 
                    type="submit"
                    value="Go"
                  />

                </form>
                <ul>
                  <li>
                    <img src={this.props.currentUser.avatar} alt="user's avatar" height="36px" width="36px"/>
                    <p>{this.props.currentUser.username}</p>
                  </li>
                  <li>
                    <img src={this.props.currentUser.avatar} alt="user's avatar" height="36px" width="36px"/>
                    <p>{this.props.currentUser.username}</p>
                  </li>
                  <li>
                    <img src={this.props.currentUser.avatar} alt="user's avatar" height="36px" width="36px"/>
                    <p>{this.props.currentUser.username}</p>
                  </li>
                  <li>
                    <img src={this.props.currentUser.avatar} alt="user's avatar" height="36px" width="36px"/>
                    <p>{this.props.currentUser.username}</p>
                  </li>
                  <li>
                    <img src={this.props.currentUser.avatar} alt="user's avatar" height="36px" width="36px"/>
                    <p>{this.props.currentUser.username}</p>
                  </li>
                  <li>
                    <img src={this.props.currentUser.avatar} alt="user's avatar" height="36px" width="36px"/>
                    <p>{this.props.currentUser.username}</p>
                  </li>
                  <li>
                    <img src={this.props.currentUser.avatar} alt="user's avatar" height="36px" width="36px"/>
                    <p>{this.props.currentUser.username}</p>
                  </li>
                  <li>
                    <img src={this.props.currentUser.avatar} alt="user's avatar" height="36px" width="36px"/>
                    <p>{this.props.currentUser.username}</p>
                  </li>
                  <li>
                    <img src={this.props.currentUser.avatar} alt="user's avatar" height="36px" width="36px"/>
                    <p>{this.props.currentUser.username}</p>
                  </li>
                  <li>
                    <img src={this.props.currentUser.avatar} alt="user's avatar" height="36px" width="36px"/>
                    <p>{this.props.currentUser.username}</p>
                  </li>
                  <li>
                    <img src={this.props.currentUser.avatar} alt="user's avatar" height="36px" width="36px"/>
                    <p>{this.props.currentUser.username}</p>
                  </li>
                  <li>
                    <img src={this.props.currentUser.avatar} alt="user's avatar" height="36px" width="36px"/>
                    <p>{this.props.currentUser.username}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
      </div>
    )
  }
}


const setStateToProps = state => {
  return ({
    currentUser: state.entities.users[state.session.id],
    users: state.entities.users,
  })
}

const setDispatchToProps = dispatch => {
  return ({
    createChannel: channel => dispatch(createChannel(channel)),
    closeModal: () => dispatch(closeModal())
  })
}

export default connect(setStateToProps, setDispatchToProps)(NewDirectMessage);