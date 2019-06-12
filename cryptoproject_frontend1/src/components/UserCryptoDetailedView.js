import React from 'react'

class UserCryptoDetailedView extends React.Component {

  render(){
    return(
      <div className="UserCryptoDetailedView">
          <h1>{this.props.currentCrypto.name}</h1>
          <img className="logo" src={"https://www.cryptocompare.com" + this.props.currentCrypto.image}></img>
          <h3>Current price: {this.props.currentCrypto.price} USD</h3>
          <button onClick={this.props.returnMyCryptos}>
            Back
          </button>

          <button onClick={()=>this.props.deleteCrypto(this.props.currentCrypto)}>
            Delete from my Cryptos
          </button>
            {this.props.error !== "" && <div className="error-message">{this.props.error}</div>}
      </div>
    )
  }

}

export default UserCryptoDetailedView
