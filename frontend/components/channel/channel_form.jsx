import React from 'react'

class ChannelForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      body: '', 
      channel_id: this.props.channelId,
      author_id: this.props.currentUser.id,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value,
      channel_id: this.props.channelId,
      author_id: this.props.currentUser.id
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createSubscription(this.props.channelId);
    App.cable.subscriptions.subscriptions[0].speak({ message: this.state });
    this.setState({ body: "" });
  }

  render() {
    return (
      <div className="chatbox-form">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Message"
            value={this.state.body}
            onChange={this.update('body')}
          />
        </form>
      </div>
    )
  }
  
}

export default ChannelForm;