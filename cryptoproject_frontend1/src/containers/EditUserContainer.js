import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import EditUserForm from '../components/EditUserForm'

export default class EditUserContainer extends Component {

  constructor(props){
    super(props)
    this.state = {
      isLoading: true,
      isLoggedIn: false
    }

    this.checkLoggedIn = this.checkLoggedIn.bind(this)
    this.setLoggedIn = this.setLoggedIn.bind(this)
  }

  checkLoggedIn(){
    if(!localStorage.token){
      this.setState({isLoading: false})
    }
    fetch("http://localhost:3000/api/v1/profile", {
      method: "GET",
      headers: {
        'Authorization': "Bearer " + localStorage.token
      }
    })
    .then(res => res.json())
    .then(this.setLoggedIn)

  }

  setLoggedIn(data){
    if(data.message){
      return
    } else {
      this.setState({
        isLoading: false,
        isLoggedIn: true
      })
    }
  }

  componentDidMount(){
    this.checkLoggedIn()
  }

  render(){
    if(this.state.isLoading){
      return <div>Loading...</div>
    } else {
      if(this.state.isLoggedIn){
        return <EditUserForm current_user={this.props.current_user}
                             updateUser={this.props.updateUser}
                             deleteUser={this.props.deleteUser}
                             setEdit={this.props.setEdit}
                             />;
      } else {
        return <Redirect to="/login" /> ;
      }
    }
  }
}
