import React from 'react'
import UserCrypto from '../components/UserCrypto'

class UserCryptos extends React.Component {

getPrices = () => {
  const values = []
  this.props.userCryptos.map((crypto)=> {
    values.push(parseInt(crypto.price))
  })
  if(values.length >= 1) {
  let total = values.reduce((x, y) => x + y)
  return total
}
  let total  = 0
  return total
}


  render(){
    return(
      <div className="userCryptos">
      <h1>My Cryptocurrencies</h1>
      <h2>Total portfolio value: ${this.getPrices()}</h2>
      <button className="CCbutton" onClick={this.props.returnHome}>Return to homepage</button>
      {console.log(this.getPrices())}

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
