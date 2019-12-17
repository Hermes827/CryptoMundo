import React from 'react'
import Crypto from '../components/crypto'


class CryptosContainer extends React.Component {

  constructor(props){
    super(props)
      this.state = {
        cryptos: [],
        lookingAtSingleCrypto: false,
        cryptoContainerIsOpen: false,
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

  render(){
    return(
      <div className="cryptoItem">
        <h1 className="ccHeader">All Cryptocurrencies</h1>
        <button className="CCbutton" onClick={this.props.returnToHomepageFromCryptosContainers}>Return to homepage</button>
        {
        this.props.cryptos.map((crypto)=>{
          return <Crypto
                  className="cryptoElement"
                  key={"display-"+crypto.name+"-"+crypto.id}
                  crypto={crypto}
                  setCurrentCrypto={this.props.setCurrentCrypto}
                  />

        })
      }
    </div>
    )
  }

}

export default CryptosContainer
