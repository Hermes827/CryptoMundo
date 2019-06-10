import React, { Component } from 'react'
import CryptosContainer from './cryptosContainer'
import CryptoNameForm from '../components/cryptoNameForm'
import {Redirect} from 'react-router-dom'
import DetailedView from '../components/detailedView'

const URL = "http://localhost:3000/api/v1/searchbyname"
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

    // const title = document.getElementsByClassName("forms")
    // console.log(title)
    // title.classList.add("hide-title")
    fetch(URL)
      .then(res => res.json())
      .then(data => {
        this.setState({
          cryptos: data,
          cryptosAreLoading: false
        })
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
    console.log(crypto)
  }




  renderCryptos() {
    if(this.state.cryptos.length === 0 && !this.state.cryptosAreLoading){
      return null
    } else if (!this.state.cryptosAreLoading){
      return  <div className="cryptosContainer">
        <h2 className="card-title">View Cryptos</h2>
        <CryptosContainer cryptos={this.state.cryptos}
                                    setCurrentCrypto={this.setCurrentCrypto}/>
      </div>

    } else {
        return <div className="cryptosContainer">
          <div className="loading-dimmer ui segment">
            <div className="ui active dimmer">
              <div className="ui text loader">Finding Cryptos...</div>
            </div>
          </div>
        </div>
    }


  }


  renderDetailedView(){
    const {currentCrypto} = this.state
    if(this.state.lookingAtSingleCrypto === true) {
      return <DetailedView
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
            <h1 className="title">My Crypto</h1>
            <CryptoNameForm getCryptosName={this.getCryptosName}/>
            {this.renderDetailedView()}
          <br/>
          </div>
        </div>
    );
  }
}
