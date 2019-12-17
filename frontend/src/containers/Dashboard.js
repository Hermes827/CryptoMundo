import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {withRouter} from 'react-router';
import CryptosContainer from './cryptosContainer'
import CryptoNameForm from '../components/cryptoNameForm'
import CryptoDetailedView from '../components/CryptoDetailedView'

// const API = "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD&api_key={2eb0a0afcdbd0af89e90104132e9424984ac9324e5c2b62272a6afbe9567cb19}"

class Dashboard extends Component {

  constructor(props){
    super(props)
      this.state = {
        cryptos: [],
        lookingAtSingleCrypto: false,
        cryptoContainerIsOpen: false,
        currentCrypto: {},
        feedback: "",
        cryptoContainerIsOpen: false
      }
    }

    setFeedback(str){
      this.setState({
        feedback: str
      })
      setTimeout(() => this.setState({feedback: ""}), 1500)
    }

    componentDidMount(){
      fetch("http://localhost:3000/api/v1/searchbyname")
        .then(res => res.json())
        .then(data => {
          this.setState({
            cryptos: data
            })
        })
    }

  // getCryptosName = () => {
  //   fetch("http://localhost:3000/api/v1/searchbyname")
  //     .then(res => res.json())
  //     .then(data => {
  //       this.setState({
  //         cryptos: data
  //         })
  //     })
  // }

  setCurrentCrypto = (crypto) => {
    this.setState({
      currentCrypto: crypto,
      lookingAtSingleCrypto: true
    })
  }

  returnToCryptosContainer = () => {
    this.setState({
      currentCrypto: null,
      lookingAtSingleCrypto: false
    })
  }

  addCrypto = (crypto) => {
    fetch("http://localhost:3000/api/v1/add_crypto", {
      method: 'POST',
      body: JSON.stringify({crypto_id: crypto.id}),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.token
      }
    })
    .then(res => res.json())
    .then(data => {
      this.setFeedback(`Added ${crypto.name} to portfolio`)
    })
  }

returnToHomepageFromCryptosContainers = () => {
  this.setState({
    currentCrypto: null,
    lookingAtSingleCrypto: false,
    cryptoContainerIsOpen: false
  })
}

  renderCryptos() {
    if(this.state.cryptoContainerIsOpen === true){
      return  <div className="cryptosContainer">
        <h2 className="card-title">View Cryptos</h2>
        <CryptosContainer
          cryptos={this.state.cryptos}
          setCurrentCrypto={this.setCurrentCrypto}
          returnToHomepageFromCryptosContainers={this.returnToHomepageFromCryptosContainers}
          />
      </div>
    }
  }

  turnOn = () => {
    this.setState({
      cryptoContainerIsOpen: true
    })
    console.log("hello")
  }


  renderDetailedUserCryptoView(){
    const {currentCrypto, lookingAtSingleCrypto} = this.state
    if(lookingAtSingleCrypto === true) {
      return <CryptoDetailedView
              feedback={this.state.feedback}
              currentCrypto={currentCrypto}
              returnToCryptosContainer={this.returnToCryptosContainer}
              addCrypto={this.addCrypto}
              />
    }
  }



  render(){

    return (
        <div className="App">
          {this.renderCryptos()}
          <div className="forms">
            <h1 className="title">Crypto Mundo</h1>
            <CryptoNameForm turnOn={this.turnOn}/>
          <br/>
          </div>
          {this.renderDetailedUserCryptoView()}
        </div>
    );
  }
}

export default withRouter(Dashboard)
