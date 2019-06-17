import React, { Component } from 'react'

export default class Login extends Component {

  constructor(props){
    super(props)
    this.state = {

    }

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
      <div className="user-form">
        <h2 className="title subtitle">Login to Crypto Mundo</h2>
        <form className="login" onSubmit={this.handleSubmit}>
          <div>
            <div>
              <label className="login">Username&nbsp;&nbsp;
                <input className="input" type="text" name="username" placeholder="username"/>
              </label>
            </div>
            <br/>
            <div>
              <label className="login">Password&nbsp;&nbsp;
                <input className="input" type="password" name="password" placeholder="password"/>
              </label>
            </div>
          </div>
          <br/>
          <input className="login-button" type="submit" value="Login"/>
        </form>
      </div>
    )
  }
}
