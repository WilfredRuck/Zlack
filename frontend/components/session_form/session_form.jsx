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
      <div>
        <form onSubmit={this.handleSubmit}>
          <br/>
          {this.props.formType}!
          {this.renderErrors()}
          <div>
            <br/>
            <label>Username:<br/>
              <input type="text"
                value={this.state.username}
                onChange={this.update('username')}
              />
            </label>
            <br/>
            <label>Password:<br/>
              <input type="password"
                value={this.state.password}
                onChange={this.update('password')}
              />
            </label>
            <br/>
            <input type="submit" value={this.props.formType} />
          </div> <br/>
        </form>
        
          <button onClick={this.demoSubmit}>Log in as Demo User</button>

      </div>
    );
  }
}

export default SessionForm;