import React from 'react'
import UserCrypto from '../components/UserCrypto'

class UserCryptos extends React.Component {

  render(){
    return(
      <div className="userCryptoItem">
      <h2 className="card-title">My Cryptos</h2>
      <div className="flex-container">
      {this.props.userCryptos.map((crypto)=>{
        return <UserCrypto
                key={"user-"+crypto.name+"-"+crypto.id}
                toggleCryptos={this.props.toggleCryptos}
                crypto={crypto}
                setCurrentCrypto={this.props.setCurrentCrypto}
                />
      })}
    </div>
      </div>
    )
  }

}

export default UserCryptos
