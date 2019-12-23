import React from 'react'

class UserCrypto extends React.Component {

  constructor(props){
    super(props)

    // this.viewCrypto = this.viewCrypto.bind(this)
  }

  // viewCrypto(){
  //   this.props.setCurrentCrypto(this.props.crypto)
  //   console.log("hello")
  // }

  render(){
    return(
    <div className="crypto" onClick={()=> this.props.setCurrentCrypto(this.props.crypto)}>
    <h1>{this.props.crypto.name}</h1>
    <img className="logo" src={"https://www.cryptocompare.com" + this.props.crypto.image}></img>
    <h2>Quantity: {this.props.countCrypto(this.props.crypto)}</h2>
    </div>
    )
  }

}

export default UserCrypto
