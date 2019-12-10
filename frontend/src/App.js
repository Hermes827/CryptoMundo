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
import NewsContainer from './containers/newsContainer'
import ArticleView from './components/articleView'

const USER_URL = "http://localhost:3000/api/v1/users"
const LOGIN_URL = "http://localhost:3000/api/v1/login"
const newsAPI = "https://newsapi.org/v2/everything?q=cryptocurrency&from=2019-12-10&sortBy=publishedAt&apiKey=e17454af05b842518705a1a4960a4f94"

class App extends React.Component{

  componentDidMount(){
    fetch(newsAPI)
      .then(res => res.json())
      .then(data => {
        this.setState({
          news: data.articles
        })
        console.log(data.articles)
      })
  }

  constructor(props){
    super(props)

    this.state = {
      current_user: {},
      error: "",
      feedback: "",
      userCryptos: [],
      hasClickedMyCryptos: false,
      currentCrypto: {},
      lookingAtSingleCrypto: false,
      cryptosAreLoading: false,
      news: [],
      hasClickedNews: false,
      currentNews: {},
      lookingAtSingleNews: false,
      hasClickedSettings: false
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
        hasClickedMyCryptos: !this.state.hasClickedMyCryptos,
        cryptosAreLoading: false
      })
      console.log(data)
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

  setCurrentCrypto1 = (crypto) => {
    this.setState({
      currentCrypto: crypto,
      lookingAtSingleCrypto: true
    })
    // this.props.history.push('/my-crypto/' + crypto.id)

  }

  renderUserCryptos = () => {
    const {userCryptos} = this.state
    if(this.state.hasClickedMyCryptos === true &&!this.state.cryptosAreLoading) {
      return <UserCryptos
              returnHome={this.returnHome}
              toggleCryptos={this.toggleMyCryptos}
              userCryptos={userCryptos}
              setCurrentCrypto={this.setCurrentCrypto}
              />
    }
  }

  countCrypto = (cc) => {
    const cryptos = []
    this.state.userCryptos.map((crypto) => {
      if(cc.name === crypto.name) {
        cryptos.push(crypto)
        console.log(crypto)
      }
    })
    return cryptos.length
  }


  renderDetailedView = () => {
    const {userCryptos} = this.state
    const {currentCrypto} = this.state
    if(this.state.lookingAtSingleCrypto === true) {
      return(
        <div>
              <UserCryptos
              returnHome={this.returnHome}
              toggleCryptos={this.toggleMyCryptos}
              userCryptos={userCryptos}
              setCurrentCrypto={this.setCurrentCrypto}
              />
              <UserCryptoDetailedView
              countCrypto={this.countCrypto}
              currentCrypto={currentCrypto}
              returnMyCryptos={this.returnMyCryptos}
              deleteCrypto={this.deleteCrypto}
              error={this.state.error}
              />
        </div>
          )
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

  returnHome = () => {
    console.log("hello")
    this.setState({
      cryptosAreLoading: true,
      currentCrypto: null,
      lookingAtSingleCrypto: false,
      hasClickedMyCryptos: true
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
      let cryptoNames = data.user.cryptos.map((crypto) => {
        return crypto.name
      })
      // console.log(cryptoNames)
      // console.log(data.user.cryptos)
      if(!cryptoNames.includes(crypto.name)){
        setTimeout(() => this.setState({
          currentCrypto: null,
          lookingAtSingleCrypto: false,
        }), 2000)
      }


      this.setError(`Deleted ${crypto.name} from Cryptos`)
      this.displayUserCryptos()
    })

  }

setNews = () => {
  this.setState({
    hasClickedNews: true
  })
}

returnHomeNews = () => {
  this.setState({
    currentNews: null,
    lookingAtSingleNews: false,
    hasClickedNews: false
  })
  this.props.history.push('/dashboard')
}

  toggleNews = () => {
    this.setState({
      hasClickedNews: !this.state.hasClickedNews
    })
  }

  setCurrentNews = (article) => {
    this.setState({
      currentNews: article,
      lookingAtSingleNews: true
    })
  }

  // returnHomeNews = () => {
  //   console.log("hello")
  //   this.setState({
  //     // cryptosAreLoading: true,
  //     currentNews: null,
  //     lookingAtSingleNews: false,
  //     hasClickedNews: true
  //   })
  // }

  returnMyNews = () => {
    this.setState({
      currentNews: null,
      lookingAtSingleNews: false,
      hasClickedNews: true
    })
  }

renderNews = () => {
  const {news} = this.state
  if(this.state.hasClickedNews === true){
    return <NewsContainer
            returnHomeNews={this.returnHomeNews}
            toggleNews={this.toggleNews}
            setCurrentNews={this.setCurrentNews}
            news={news}
            currentNews={this.state.currentNews}
            lookingAtSingleNews={this.state.lookingAtSingleNews}
            />
  }
}

renderDetailedViewNews = () => {
  const {news, currentNews} = this.state
  if(this.state.lookingAtSingleNews === true) {
    return(
      <div>
        <NewsContainer
                returnHomeNews={this.returnHomeNews}
                toggleNews={this.toggleNews}
                setCurrentNews={this.setCurrentNews}
                news={news}
                currentNews={this.state.currentNews}
                lookingAtSingleNews={this.state.lookingAtSingleNews}
                />
                <ArticleView
                currentNews={currentNews}
                returnMyNews={this.returnMyNews}
                />
      </div>
        )
  }
}

renderEditUser = () => {
if(this.state.hasClickedSettings === true) {
  return <EditUserContainer
            current_user={this.state.current_user}
            updateUser={this.updateUser}
            deleteUser={this.deleteUser}
            setEdit={this.setEdit}
          />
}
}

setEdit = () => {
  console.log("hello")
  this.setState({
    hasClickedSettings: !this.state.hasClickedSettings
  })
  this.props.history.push('/dashboard')

}

  render(){

    return (
      <div className="App">
        <Route path='/' render={() => <Banner current_user={this.state.current_user}


                                              logout={this.logout}
                                              displayUserCryptos={this.displayUserCryptos}
                                              returnMainMenu={this.returnMainMenu}
                                              returnMainMenu1={this.returnMainMenu1}
                                              onCryptos={this.state.hasClickedMyCryptos}
                                              setNews={this.setNews}
                                              setEdit={this.setEdit}

                                              />}/>
        <main className="main">
          <Route exact path="/news" render={() => this.renderDetailedViewNews()} />
          {this.renderNews()}
          <Route exact path="/login" render={() => <Login attemptLogin={this.attemptLogin}/>}/>
          <Route exact path="/user_signup" render={() => <NewUserForm createNewUser={this.createNewUser}/>}/>
          <Route path='/my-crypto' render={() => this.renderDetailedView()} />
          {this.renderUserCryptos()}
          <Route exact path="/dashboard" render={() =>  <Dashboard
                                                         setFeedback={this.setFeedback}
                                                         feedback={this.state.feedback}
                                                         />}
                                                         />
                                                       <Route exact path="/update_profile" render={() => this.renderEditUser()}/>
        </main>

      </div>
    );
  }

}

export default withRouter(App);
