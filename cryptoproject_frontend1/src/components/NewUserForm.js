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
      password: ev.target.elements['password'].value
    }

    this.props.createNewUser(user)
  }


  render(){
    return <div className="user-form">
            <h2 className="title subtitle">Create account at MyCrypto</h2>
            <form className="NewUserForm" onSubmit={this.handleSubmit}>
              <div className="two fields">
                <div>
                  <label className="login">Username&nbsp;&nbsp;
                    <input type="text" name="username" placeholder="username"/>
                  </label>
                </div>
                <div>
                  <label className="login">Password&nbsp;&nbsp;
                    <input type="password" name="password" placeholder="password"/>
                  </label>
                </div>
              </div>
              <br/>
              <input className="button" type="submit" value="Create Account"/>
            </form>
          </div>
  }
}
