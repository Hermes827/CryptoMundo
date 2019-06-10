import React from 'react'

class Crypto extends React.Component {

  //

  render(){
    return(
      <div className="crypto"
           onClick={() => this.props.setCurrentCrypto(this.props.crypto)}
            >
          <h1>{this.props.crypto.name}</h1>
          <h3>{this.props.crypto.price} USD</h3>


      </div>
    )
  }

}

export default Crypto
