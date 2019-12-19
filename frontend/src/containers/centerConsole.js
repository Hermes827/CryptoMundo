import React, { Component } from 'react'
import CryptosContainer from './cryptosContainer'

class centerConsole extends Component {

  constructor(props){
    super(props)
      this.state = {
        hasClickedButton: false
      }
    }

returnToHomepageFromCryptosContainers = () => {
  this.setState({
    hasClickedButton: false
  })
}

  renderCryptos() {
    if(this.state.hasClickedButton === true){
      return (
      <div className="cryptosContainer">
        <h2 className="card-title">View Cryptos</h2>
        <CryptosContainer
        returnToHomepageFromCryptosContainers={this.returnToHomepageFromCryptosContainers}
        />
      </div>
      )
    }
  }

  toggleState = () => {
    this.setState({
      hasClickedButton: true
    })
  }

  render(){

    return (
        <div>
          <div className="forms">
          <h1 className="title">Crypto Mundo</h1>
          <button className="crypto-button" onClick={this.toggleState}>
          See all cryptocurrencies
          </button>
          {this.renderCryptos()}
          </div>
        </div>
    );
  }
}

export default centerConsole
