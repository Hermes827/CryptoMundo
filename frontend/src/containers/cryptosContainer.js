import React from 'react'
import Crypto from '../components/crypto'
import CryptoDetailedView from '../components/CryptoDetailedView'

// const API = "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD&api_key={2eb0a0afcdbd0af89e90104132e9424984ac9324e5c2b62272a6afbe9567cb19}"

class CryptosContainer extends React.Component {

  constructor(props){
    super(props)
      this.state = {
        cryptos: [],
        lookingAtSingleCrypto: false,
        hasClickedButton: false,
        currentCrypto: {},
        feedback: ""
      }
    }

  componentDidMount(){
    fetch("http://localhost:3000/api/v1/searchbyname")
      .then(res => res.json())
      .then(data => {
        this.setState({
          cryptos: data
          })
          console.log(data)
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
    })
  }

  render(){
    return(
      <div className="cryptoItem">
        <h1 className="ccHeader">All Cryptocurrencies</h1>
        <button className="CCbutton" onClick={this.props.returnToHomepageFromCryptosContainers}>Return to homepage</button>
            {this.renderDetailedUserCryptoView()}
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
    )
  }
}

export default CryptosContainer
