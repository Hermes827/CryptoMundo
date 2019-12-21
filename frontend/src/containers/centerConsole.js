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
        <CryptosContainer
        returnToHomepageFromCryptosContainers={this.returnToHomepageFromCryptosContainers}
        />
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
          <div className="centerConsole">
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
