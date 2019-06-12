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

countCrypto = (cc) => {
  const cryptos = []
  this.props.userCryptos.map((crypto) => {
    if(cc.name === crypto.name) {
      cryptos.push(crypto)
      console.log(crypto)
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

// highday: "$ 8,250.00"
// id: 1
// image: "/media/19633/btc.png"
// lowday: "$ 7,834.57"
// market: "CryptoCompare Index"
// name: "BTC"
// price: "8129.49"
// supply: "Ƀ 17,755,400.0"
// volume: "$ 372,457,436.4"

  render(){
    return(
      <div className="userCryptos">
      <h1>My Cryptocurrencies</h1>
      <h2>Total portfolio value: ${this.getPrices()}</h2>
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

export default UserCryptos
