import React from 'react'

class UserCryptoDetailedView extends React.Component {

  render(){
    return(
      <div className="UserCryptoDetailedView">
          <h1>{this.props.currentCrypto.name}</h1>
          <img className="logo1" src={"https://www.cryptocompare.com" + this.props.currentCrypto.image}></img>
          {this.props.error !== "" && <div className="error-message">{this.props.error}</div>}
      
          <h3>Current Price: {this.props.currentCrypto.price} USD</h3>
          <h3>Market: {this.props.currentCrypto.market}</h3>
          <h3>Daily Volume: {this.props.currentCrypto.volume}</h3>
          <h3>Total Supply: {this.props.currentCrypto.supply}</h3>
          <h3>Daily High: {this.props.currentCrypto.highday}</h3>
          <h3>Daily Low: {this.props.currentCrypto.lowday}</h3>
          <button onClick={this.props.returnMyCryptos}>
            Back
          </button>

          <button onClick={()=>this.props.deleteCrypto(this.props.currentCrypto)}>
            Delete from my Cryptos
          </button>

      </div>
    )
  }

}

export default UserCryptoDetailedView
