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
    return <div className="user-form">
            <h2 className="title subtitle">Create a new account at Crypto Mundo!</h2>
            <form className="NewUserForm" onSubmit={this.handleSubmit}>
              <div className="two fields">
                <div>
                  <label className="login">Username&nbsp;&nbsp;
                    <input className="input" type="text" name="username" placeholder="username"/>
                  </label>
                </div>
                <br/>
                <div>
                  <label className="login">&nbsp;&nbsp;Password&nbsp;&nbsp;
                    <input className="input" type="text" name="password" placeholder="password"/>
                  </label>
                </div>
                <br/>
                <div>
                  <label className="login">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Email&nbsp;&nbsp;
                    <input className="input" type="text" name="email" placeholder="email"/>
                  </label>
                </div>
              </div>
              <br/>
              <input className="submit-button" type="submit" value="Create Account"/>
            </form>
          </div>
  }
}
