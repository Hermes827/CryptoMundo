import React, { Component } from 'react'

export default class Login extends Component {

  constructor(props){
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(ev){
    ev.preventDefault()
    const user = {
      username: ev.target.elements['username'].value,
      password: ev.target.elements['password'].value
    }
    this.props.attemptLogin(user)
  }

  render(){
    return (
      <div className="login-form">
        <h2 className="login-title">Login to Crypto Mundo</h2>
        <form onSubmit={this.handleSubmit}>
            <div>
              <label>Username&nbsp;&nbsp;
                <input className="input" type="text" name="username" placeholder="username"/>
              </label>
            </div>
            <br/>
            <div>
              <label>Password&nbsp;&nbsp;
                <input className="input" type="password" name="password" placeholder="password"/>
              </label>
            </div>
          <br/>
          <button className="login-button" type="submit" value="Login">login</button>
        </form>
      </div>
    )
  }
}
