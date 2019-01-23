import React from 'react'

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: ''}
    this.handleSubmit = this.handleSubmit.bind(this);
    this.demoSubmit = this.demoSubmit.bind(this);
  }

  demoSubmit(e) {
    e.preventDefault();
    e.persist();
    this.setState({
      username:'DemoUser', password:'demouser'
    }, () => this.handleSubmit(e))
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    debugger
    const user = Object.assign({}, this.state);
    this.props.processForm(user);
  }

  renderErrors() {
    return(
      <ul>
        {this.props.errors.map((error, idx) => {
          return ( <li className="errors" key={idx}> {error} </li> )
        })}
      </ul>
    );
  }
  
  render() {
    return (
      <div className="session-form-container">
        <div className="session-form">
          <form onSubmit={this.handleSubmit}>
            <br/>
            <h1>{this.props.formType}</h1>
            {this.renderErrors()}
            <div>
              <br/>
              <label><p>Username</p><br/>
                <input className="session-input" type="text"
                  value={this.state.username}
                  onChange={this.update('username')}
                />
              </label>
              <br/>
              <label><p>Password</p><br/>
                <input className="session-input" type="password"
                  value={this.state.password}
                  onChange={this.update('password')}
                />
              </label>
              <br/>
              <input className="session-submit" type="submit" value={this.props.formType} />
            </div> <br/>
          <button className="session-submit demo-user-button" onClick={this.demoSubmit}>Use Demo User</button>
          </form>
        
        </div>
      </div>
    );
  }
}

export default SessionForm;