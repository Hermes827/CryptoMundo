import React from 'react'

class Crypto extends React.Component {

  //

  render(){
    return(
      <div className="crypto"
           onClick={() => this.props.setCurrentCrypto(this.props.crypto)}
            >
          <h1>{this.props.crypto.name}</h1>
          <img className="logo" src={"https://www.cryptocompare.com" + this.props.crypto.image}></img>
          <h3>Current Price: {this.props.crypto.price} USD</h3>

      </div>
    )
  }

}

export default Crypto
