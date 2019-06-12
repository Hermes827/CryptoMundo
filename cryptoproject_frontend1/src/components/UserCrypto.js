import React from 'react'

class UserCrypto extends React.Component {

  constructor(props){
    super(props)

    this.viewCrypto = this.viewCrypto.bind(this)
  }

  trim(str){
    return str.length > 15 ? str.substr(0, 15) + '...' : str;
  }

  viewCrypto(){
    this.props.toggleCryptos()
    this.props.setCurrentCrypto(this.props.crypto)
    console.log(this.props.crypto)
  }

  render(){
    return(
    <div className="crypto" onClick={this.viewCrypto}>
    <h1 >{this.trim(this.props.crypto.name)}</h1>
    <h3>{this.props.crypto.price} USD</h3>
    </div>
    )
  }

}

export default UserCrypto
