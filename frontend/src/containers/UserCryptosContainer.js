import React from 'react'
import UserCrypto from '../components/UserCrypto'

class UserCryptosContainer extends React.Component {

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

countCrypto = (cc) => {
  const cryptos = []
  this.props.userCryptos.map((crypto) => {
    if(cc.name === crypto.name) {
      cryptos.push(crypto)
    }
  })
  return cryptos.length
}

distinctCrypto = () => {
  const array = this.props.userCryptos
const result = [];
const map = new Map();
for (const item of array) {
    if(!map.has(item.id)){
        map.set(item.id, true);    // set any value to Map
        result.push({
            id: item.id,
            name: item.name,
            image: item.image,
            highday: item.highday,
            lowday: item.lowday,
            market: item.market,
            price: item.price,
            supply: item.supply,
            volume: item.volume
        });
    }
}
return result
}

  render(){
    return(
      <div className="userCryptos">
      <h1 className="ccHeader">My Cryptocurrencies</h1>
      <h1 className="">Total portfolio value: ${this.getPrices()}</h1>
      <button className="CCbutton" onClick={this.props.returnHome}>Return to homepage</button>

      <div>

      {this.distinctCrypto().map((crypto)=>{
        return <UserCrypto
                countCrypto={this.countCrypto}
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

export default UserCryptosContainer
