import React, { Component } from 'react'

export default class NewUserForm extends Component {

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
      password: ev.target.elements['password'].value,
      email: ev.target.elements['email'].value
    }

    this.props.createNewUser(user)
  }


  render(){
    return (
            <div className="signup-form">
            <h2 className="signup-title">Create a new account at Crypto Mundo!</h2>
            <form onSubmit={this.handleSubmit}>
              <div>
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
                <div>
                  <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Email&nbsp;&nbsp;
                    <input className="input" type="text" name="email" placeholder="email"/>
                  </label>
                </div>
              </div>
              <br/>
              <input className="submit-button" type="submit" value="Create Account"/>
            </form>
          </div>
        )
  }
}
