import React from 'react'
import UserCrypto from '../components/UserCrypto'

class UserCryptos extends React.Component {

  render(){
    return(
      <div className="userCryptos">
      <h1>My Cryptocurrencies</h1>
      <button className="CCbutton" onClick={this.props.returnHome}>Return to homepage</button>
      <div>
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
