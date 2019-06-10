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
        <h2 className="title subtitle">Log in to MyCrypto</h2>
        <form className="ui center form user-info-form" onSubmit={this.handleSubmit}>
          <div className="two fields">
            <div className="field">
              <label className="login">Username
                <input type="text" name="username" placeholder="username"/>
              </label>
            </div>
            <div className="field">
              <label className="login">Password
                <input type="password" name="password" placeholder="password"/>
              </label>
            </div>
          </div>
          <input className="ui primary submit button" type="submit" value="Log In"/>
        </form>
      </div>
    )
  }
}
