import React from 'react';
import './App.css';
import Login from './components/login';
import Dashboard from './components/Dashboard'
import NewUserForm from './components/NewUserForm'
import { Route } from 'react-router-dom';
import {withRouter} from 'react-router';
import CenterConsole from './containers/centerConsole'
import EditUserContainer from './containers/EditUserContainer'
import UserCryptosContainer from './containers/UserCryptosContainer'
import NewsContainer from './containers/newsContainer'
import {USER_URL} from './constants'
import {LOGIN_URL} from './constants'

class App extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      current_user: {},
      error: ""
    }

    this.createNewUser = this.createNewUser.bind(this)
    this.attemptLogin = this.attemptLogin.bind(this)
    this.setActiveUser = this.setActiveUser.bind(this)
    this.logout = this.logout.bind(this)
    this.updateUser = this.updateUser.bind(this)
    this.deleteUser = this.deleteUser.bind(this)
    // this.renewState();
  }

  // user stuff

//   renewState(){
//   if(!localStorage.token){return}
//   fetch("http://localhost:3000/api/v1/profile", {
//     method: "GET",
//     headers: {
//       'Authorization': "Bearer " + localStorage.token
//     }
//   })
//   .then(res => res.json())
//   .then(data => this.setActiveUser(data, "soft"))
// }

  setActiveUser(data, mode="hard"){
    // if(data.message && mode === "soft"){
    //   return
    // } else if(data.message){
    //   this.setState({error: data.message})
    // } else {
      this.setState({
        current_user: data.user,
        error: ""
      })
      if(data.jwt){localStorage.token = data.jwt}
    }


  createNewUser(user){
    fetch(USER_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({user})
    })
    .then(res => res.json())
    .then(data => {
      this.setActiveUser(data)
      this.props.history.push('/center_console')
      console.log(data.jwt)
    })
  }


  updateUser(user){
    fetch(USER_URL + `/${user.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + localStorage.token,
        'Accept': 'application/json'
      },
      body: JSON.stringify({user})
    })
    .then(res => res.json())
    .then(data => {
      this.setActiveUser(data)
      this.props.history.push('/center_console')
    })
  }

  deleteUser(user){
    fetch(USER_URL + `/${user.id}`, {
      method: "DELETE",
      headers: {
        'Authorization': "Bearer " + localStorage.token
      }
    })
    .then(() => this.logout())
  }

  // login

  attemptLogin(user){
    fetch(LOGIN_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({user})
    })
    .then(res => res.json())
    .then(data => {
      this.setActiveUser(data)
      if(!data.message){
        this.props.history.push('/center_console')
      }
    })
  }

  logout(){
    this.setState({
      current_user: {},
      currentCrypto: {}
    })
    delete localStorage.token
    this.props.history.push('/login')
  }

/////////////////////////////////////////////////////////////////////////////////

  render(){

    return (
      <div className="App">
        <Route path='/' render={() => <Dashboard
                                      current_user={this.state.current_user}
                                      logout={this.logout}
                                      displayUserCryptos={this.displayUserCryptos}
                                      getNews={this.getNews}
                                      setEdit={this.setEdit}
                                      />}/>

          <Route exact path="/news" render={() => <NewsContainer/>}/>

          <Route exact path="/login" render={() => <Login attemptLogin={this.attemptLogin}/>}/>

          <Route exact path="/user_signup" render={() => <NewUserForm createNewUser={this.createNewUser}/>}/>

          <Route path='/my_crypto' render={() => <UserCryptosContainer/>}/>

          <Route exact path="/center_console" render={() => <CenterConsole/>}/>

          <Route exact path="/update_profile" render={() => <EditUserContainer
                                                            current_user={this.state.current_user}
                                                            updateUser={this.updateUser}
                                                            deleteUser={this.deleteUser}
                                                            setEdit={this.setEdit}
                                                            />}/>

      </div>
    );
  }
}

export default withRouter(App);
