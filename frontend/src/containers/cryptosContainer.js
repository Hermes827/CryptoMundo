import React from 'react'
import Crypto from '../components/crypto'
import CryptoDetailedView from '../components/CryptoDetailedView'

class CryptosContainer extends React.Component {

  constructor(props){
    super(props)
      this.state = {
        cryptos: [],
        lookingAtSingleCrypto: false,
        hasClickedButton: false,
        currentCrypto: {},
        feedback: "",
        hasClickedButton: false
      }
    }

  componentDidMount(){
    this.startLoadingSpinner()
    fetch("http://localhost:3000/api/v1/searchbyname")
      .then(res => res.json())
      .then(data => {
        const newData = data.slice(0,50)
        this.setState({
          cryptos: newData
          })
          this.stopLoadingSpinner()
          console.log(newData)
      })
  }

  setFeedback(str){
    this.setState({
      feedback: str
    })
    setTimeout(() => this.setState({feedback: ""}), 1500)
  }

  setCurrentCrypto = (crypto) => {
    this.setState({
      currentCrypto: crypto,
      lookingAtSingleCrypto: true
    })
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
      console.log(data)
    })
  }

  // loading spinner

  startLoadingSpinner(){
    this.setState({
      hasClickedButton: true
    })

  }

  stopLoadingSpinner(){
    this.setState({
      hasClickedButton: false
    })
  }

  renderLoadingSpinner(){
    if(this.state.hasClickedButton === true){
      return (
        <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      )
    }
  }



  render(){
    return(
        <div className="cryptosContainer">
        <h1 className="cryptoContainer-title">Top 50 Cryptocurrencies by Market Cap</h1>
        <button className="cryptoContainer-button" onClick={this.props.returnToHomepageFromCryptosContainers}>Return to homepage</button>
        {this.renderDetailedUserCryptoView()}
        <div>
        {this.renderLoadingSpinner()}
        {
        this.state.cryptos.map((crypto)=>{
          return <Crypto
                  className="cryptoElement"
                  key={"display-"+crypto.name+"-"+crypto.id}
                  crypto={crypto}
                  setCurrentCrypto={this.setCurrentCrypto}
                  />
        })
       }
       </div>
       </div>
    )
  }
}

export default CryptosContainer
