import React, { Component } from 'react'
import CryptosContainer from './cryptosContainer'
import {withRouter} from 'react-router-dom'

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

  dimBackground = () => {
    console.log("hello")

  }

  combinedFunction = () => {
    this.toggleState()
    this.dimBackground()
  }

  render(){

    return (
          <div className="centerConsole">
          <h1 className="title">Crypto Mundo</h1>
          <button className="crypto-button" onClick={this.combinedFunction}>
          See all cryptocurrencies
          </button>
          {this.renderCryptos()}
          </div>
    );
  }
}

export default withRouter(centerConsole)
