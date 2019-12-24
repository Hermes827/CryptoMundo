import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'

class EditUserForm extends Component {

constructor(props){
  super(props)
  this.state = {
  }
  this.returnToCenterConsole = this.returnToCenterConsole.bind(this)
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
  if(ev.target.elements['email'].value !== ""){
    user.email = ev.target.elements['email'].value
  }
  console.log(user)
  this.props.updateUser(user)
}

returnToCenterConsole(){
    this.props.history.push('/center_console')
    console.log("hello")
}



  render(){
    return <div className="updateUser-form">
            <h2 className="title subtitle">Update Account</h2>
            <form className="edit" onSubmit={this.handleSubmit}>
                <div className="field">
                  <label>New Username&nbsp;&nbsp;
                    <input className="input" type="text" name="username" defaultValue={this.props.current_user.username} placeholder="username"/>
                  </label>
                </div>
                <br/>
                <div className="field">
                  <label>New Password&nbsp;&nbsp;
                    <input className="input" type="text" name="password" placeholder="password"/>
                  </label>
                </div>
                <br/>
                <div className="field">
                  <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;New Email&nbsp;&nbsp;
                    <input className="input" type="text" name="email" placeholder="email"/>
                  </label>
                </div>
                <br/>
              <button className="updateBtn" type="submit" value="Update Account">Update Account</button>
            </form>

            <button onClick={() => this.props.deleteUser(this.props.current_user.id)}
                    className="updateBtn">Delete Account</button>
                  <br/>
                  <button onClick={this.returnToCenterConsole} className="editBtn">Cancel</button>
          </div>
  }
}

export default withRouter(EditUserForm)
