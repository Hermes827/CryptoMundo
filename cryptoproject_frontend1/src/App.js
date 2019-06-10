import React from 'react';
import Login from './components/login';
import Banner from './components/Banner'
import NewUserForm from './components/NewUserForm'
import { Route } from 'react-router-dom';
import {withRouter} from 'react-router';
import Dashboard from './containers/Dashboard'
import EditUserContainer from './containers/EditUserContainer'
import './App.css';
import UserCryptos from './containers/UserCryptos'
import UserCryptoDetailedView from './components/UserCryptoDetailedView'

const USER_URL = "http://localhost:3000/api/v1/users"
const LOGIN_URL = "http://localhost:3000/api/v1/login"

class App extends React.Component{

  constructor(props){
    super(props)

    this.state = {
      current_user: {},
      error: "",
      feedback: "",
      userCryptos: [],
      hasClickedMyCryptos: false,
      currentCrypto: {},
      lookingAtSingleCrypto: false
    }

    this.createNewUser = this.createNewUser.bind(this)
    this.attemptLogin = this.attemptLogin.bind(this)
    this.setActiveUser = this.setActiveUser.bind(this)
    this.logout = this.logout.bind(this)
    this.updateUser = this.updateUser.bind(this)
    this.deleteUser = this.deleteUser.bind(this)
    this.toggleMyCryptos = this.toggleMyCryptos.bind(this)
    this.setError = this.setError.bind(this)
    this.setFeedback = this.setFeedback.bind(this)


    this.renewState();
  }

  setFeedback(str){
    this.setState({
      feedback: str
    })
    setTimeout(() => this.setState({feedback: ""}), 1500)
  }

  setError(str){
    this.setState({
      error: str
    })
    setTimeout(() => this.setState({error: ""}), 1500)
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
      this.props.history.push('/dashboard')
    })
  }

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
        this.props.history.push('/dashboard')
      }
    })
  }

  setActiveUser(data, mode="hard"){
    if(data.message && mode === "soft"){
      return
    } else if(data.message){
      this.setState({error: data.message})
    } else {
      this.setState({
        current_user: data.user,
        error: ""
      })
      if(data.jwt){localStorage.token = data.jwt}
    }
  }

  logout(){
    this.setState({
      current_user: {},
      hasClickedMyCryptos: false,
      currentCrypto: {},
      lookingAtSingleCrypto: false
    })
    delete localStorage.token
    this.props.history.push('/login')
  }

  renewState(){
  if(!localStorage.token){return}
  fetch("http://localhost:3000/api/v1/profile", {
    method: "GET",
    headers: {
      'Authorization': "Bearer " + localStorage.token
    }
  })
  .then(res => res.json())
  .then(data => this.setActiveUser(data, "soft"))
}

  displayUserCryptos = () => {
    if(!localStorage.token){return}
    fetch("http://localhost:3000/api/v1/profile", {
      method: "GET",
      headers: {
        'Authorization': "Bearer " + localStorage.token,
      }
    })
    .then(res => res.json())
    .then(data => {
      this.setState({
        userCryptos: data.user.cryptos,
        hasClickedMyCryptos: !this.state.hasClickedMyCryptos
      })
    })
  }

  toggleMyCryptos() {
    this.setState({
      hasClickedMyCryptos: !this.state.hasClickedMyCryptos
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
      body: JSON.stringify({
        user
      })
    })
    .then(res => res.json())
    .then(data => {
      this.setActiveUser(data)
      this.props.history.push('/dashboard')
    })
  }

  deleteUser(id){
    fetch(USER_URL + `/${id}`, {
      method: "DELETE",
      headers: {
        'Authorization': "Bearer " + localStorage.token
      }
    })
    .then( () => this.logout())
  }

  setCurrentCrypto = (crypto) => {
    this.setState({
      currentCrypto: crypto,
      lookingAtSingleCrypto: true
    })
    this.props.history.push('/my-crypto/' + crypto.id)

  }

  renderUserCryptos = () => {
    const {userCryptos} = this.state
    if(this.state.hasClickedMyCryptos === true) {
      return <UserCryptos
              toggleCryptos={this.toggleMyCryptos}
              userCryptos={userCryptos}
              setCurrentCrypto={this.setCurrentCrypto}
              />
    }
  }

  renderDetailedView = () => {
    const {currentCrypto} = this.state
    if(this.state.lookingAtSingleCrypto === true) {
      return <UserCryptoDetailedView
              currentCrypto={currentCrypto}
              returnMyCryptos={this.returnMyCryptos}
              deleteCrypto={this.deleteCrypto}
              />
    }

  }

  returnMyCryptos = () => {
    this.setState({
      currentCrypto: null,
      lookingAtSingleCrypto: false,
      hasClickedMyCryptos: true
    })
    this.props.history.push('/dashboard')
  }

  returnMainMenu = () => {
    this.setState({
      hasClickedMyCryptos: false,
      lookingAtSingleCrypto: false
    })
    this.props.history.push('/dashboard')
  }

  deleteCrypto = (crypto) => {
    const cryptoId = crypto.id
    fetch("http://localhost:3000/api/v1/remove_crypto/"+ cryptoId, {
      method: "DELETE",
      headers: {
        'Authorization': "Bearer " + localStorage.token
      },
      body: JSON.stringify({crypto_id: cryptoId})
    })
    .then(res => res.json())
    .then(data => {
      this.setState({
        currentCrypto: null,
        lookingAtSingleCrypto: false,
      })
      this.setError(`Deleted ${crypto.name} from Cryptos`)
      this.displayUserCryptos()
    })

  }



  render(){

    return (
      <div className="App">
        <Route path='/' render={() => <Banner current_user={this.state.current_user}
                                              error={this.state.error}
                                              feedback={this.state.feedback}
                                              logout={this.logout}
                                              displayUserCryptos={this.displayUserCryptos}
                                              returnMainMenu={this.returnMainMenu}
                                              onCryptos={this.state.hasClickedMyCryptos}

                                              />}/>
        <main className="main">
          <Route exact path="/login" render={() => <Login attemptLogin={this.attemptLogin}/>}/>
          <Route exact path="/user_signup" render={() => <NewUserForm createNewUser={this.createNewUser}/>}/>
          <Route path='/my-crypto' render={() => this.renderDetailedView()} />
          {this.renderUserCryptos()}
          <Route exact path="/dashboard" render={() =>  <Dashboard setFeedback={this.setFeedback}/>} />
          <Route exact path="/update_profile" render={() => <EditUserContainer current_user={this.state.current_user}
                                                                               updateUser={this.updateUser}
                                                                               deleteUser={this.deleteUser}/>} />
        </main>

      </div>
    );
  }

}

export default withRouter(App);
