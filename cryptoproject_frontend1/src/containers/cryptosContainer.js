import React from 'react'
import Crypto from '../components/crypto'


class CryptosContainer extends React.Component {

  render(){
    return(
      <div className="cryptoItem">
        <button className="CCbutton" onClick={this.props.returnHome}>Return to homepage</button>
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
