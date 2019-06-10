import React, { Component } from 'react'

export default class EditUserForm extends Component {

  constructor(props){
    super(props)
    this.state = {
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(ev){
    ev.preventDefault();
    let user = {
      id: this.props.current_user.id,
      username: ev.target.elements['username'].value
    };
    if(ev.target.elements['password'].value !== ""){
      user.password = ev.target.elements['password'].value
    }

    this.props.updateUser(user)
  }


  render(){
    return <div className="user-form">
            <h2 className="title subtitle">Update Your Account</h2>
            <form className="ui center form user-info-form" onSubmit={this.handleSubmit}>
                <div className="field">
                  <label>Username
                    <input type="text" name="username" defaultValue={this.props.current_user.username} placeholder="username"/>
                  </label>
                </div>
                <div className="field">
                  <label>New Password
                    <input type="password" name="password" placeholder="password"/>
                  </label>
                </div>
              <input className="ui submit button" type="submit" value="Update Account"/>
            </form>
            <button onClick={() => this.props.deleteUser(this.props.current_user.id)}
                    className="negative ui button">Delete Account</button>
          </div>
  }
}
