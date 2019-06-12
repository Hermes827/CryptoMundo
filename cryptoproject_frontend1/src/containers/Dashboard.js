import React, { Component } from 'react'
import CryptosContainer from './cryptosContainer'
import CryptoNameForm from '../components/cryptoNameForm'
import {Redirect} from 'react-router-dom'
import DetailedView from '../components/detailedView'

const URL = "http://localhost:3000/api/v1/searchbyname"
const API = "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD&api_key={2eb0a0afcdbd0af89e90104132e9424984ac9324e5c2b62272a6afbe9567cb19}"
const random = document.getElementsByClassName("title")

export default class Dashboard extends Component {

  constructor(props){
    super(props)
      this.state = {
        cryptos: [],
        lookingAtSingleCrypto: false,
        currentCrypto: {},
        cryptosAreLoading: false
      }
    }

  getCryptosName = (event) => {
    this.setLoading()
    fetch(URL)
      .then(res => res.json())
      .then(data => {
        this.setState({
          cryptos: data,
          cryptosAreLoading: false
        })
        console.log(data)
      })

  }


  setCurrentCrypto = (crypto) => {
    this.setState({
      currentCrypto: crypto,
      lookingAtSingleCrypto: true
    })

  }

  setLoading(){
    this.setState({CryptosAreLoading: true})
  }

  returnMainMenu = () => {

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
      this.props.setFeedback(`Added ${crypto.name} to "My Cryptos"`)
    })
  }




returnHome = () => {
  console.log("hello")
  this.setState({
    cryptosAreLoading: true
  })
}


  renderCryptos() {
    if(this.state.cryptos.length === 0 && !this.state.cryptosAreLoading){
      return null
    } else if (!this.state.cryptosAreLoading){
      return  <div className="cryptosContainer">
        <h2 className="card-title">View Cryptos</h2>
        <CryptosContainer
          cryptos={this.state.cryptos}
          setCurrentCrypto={this.setCurrentCrypto}
          returnHome={this.returnHome}
          />
      </div>
    }
  }


  renderDetailedView(){
    const {currentCrypto} = this.state
    if(this.state.lookingAtSingleCrypto === true) {
      return <DetailedView
              feedback={this.props.feedback}
              currentCrypto={currentCrypto}
              returnMainMenu={this.returnMainMenu}
              addCrypto={this.addCrypto}
              />
    }
  }


  render(){
    if(!localStorage.token){
      return <Redirect to="/login" />
    }

    return (

        <div className="App">
            {this.renderCryptos()}

          <div className="forms">
            <h1 className="title">Crypto Mundo</h1>
            <CryptoNameForm getCryptosName={this.getCryptosName}/>

          <br/>
          </div>
          {this.renderDetailedView()}
        </div>
    );
  }
}
