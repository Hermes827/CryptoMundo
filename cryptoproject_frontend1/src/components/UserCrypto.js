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
    <div className="userCrypto" onClick={this.viewCrypto}>
    <h2 className="crypto-title">{this.trim(this.props.crypto.name)}</h2>
    <img className="cryptoImage" src={this.props.crypto.img_url} alt={this.props.crypto.name}/>
    </div>
    )
  }

}

export default UserCrypto
