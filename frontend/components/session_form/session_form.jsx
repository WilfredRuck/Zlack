import React from 'react'

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: '', errors: []}
    this.handleSubmit = this.handleSubmit.bind(this);
    this.demoSubmit = this.demoSubmit.bind(this);
  }

  componentWillUnmount() {
    this.props.clearSessionErrors();
  }

  demoSubmit(e) {
    e.preventDefault();
    e.persist();
    this.setState({
      email:'demouser@gmail.com', password:'demouser'
    }, () => this.handleSubmit(e))
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user)
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
    let demo = ""
    if (this.props.formType == 'Sign in') {
      demo = <button className="session-submit demo-user-button" onClick={this.demoSubmit}>Use Demo User</button>;
    }
    return (
        <div className="session-form-container">
          <div className="session-form">
        <div className="session-form-bottle">
            <form onSubmit={this.handleSubmit}>
              <br/>
              <h1>{this.props.formType} to 6lack</h1>
              {this.renderErrors()}
              <div>
                <br/>
                <label><p>Enter your <b>email address</b> and <b>password</b>.</p><br/>
                  <input 
                    className="session-input" 
                    type="text"
                    placeholder="you@example.com"
                    value={this.state.email}
                    onChange={this.update('email')}
                  />
                </label>
                <br/>
                <label>
                  <input 
                    className="session-input" 
                    type="password"
                    placeholder="password"
                    value={this.state.password}
                    onChange={this.update('password')}
                  />
                </label>
                <br/>
                <input className="session-submit" type="submit" value={this.props.formType} />
              </div> <br/>
              
            {demo}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SessionForm;