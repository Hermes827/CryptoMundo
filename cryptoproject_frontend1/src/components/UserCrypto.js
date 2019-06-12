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
    <h1>{this.trim(this.props.crypto.name)}</h1>
    <img className="logo" src={"https://www.cryptocompare.com" + this.props.crypto.image}></img>
    </div>
    )
  }

}

export default UserCrypto
