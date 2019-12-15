import React from 'react'

class UserCrypto extends React.Component {

  constructor(props){
    super(props)

    this.viewCrypto = this.viewCrypto.bind(this)
  }

  // trim(str){
  //   return str.length > 15 ? str.substr(0, 15) + '...' : str;
  // }

  viewCrypto(){
    this.props.setCurrentCrypto(this.props.crypto)
  }

  render(){
    return(
    <div className="crypto" onClick={this.viewCrypto}>
    <h1>{this.props.crypto.name}</h1>
    <img className="logo" src={"https://www.cryptocompare.com" + this.props.crypto.image}></img>
    <h2>Quantity: {this.props.countCrypto(this.props.crypto)}</h2>
    </div>
    )
  }

}

export default UserCrypto
