import React from 'react'
import {withRouter} from 'react-router';
import UserCrypto from '../components/UserCrypto'
import UserCryptoDetailedView from '../components/UserCryptoDetailedView'

class UserCryptosContainer extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      error: "",
      userCryptos: [],
      currentCrypto: {},
      lookingAtSingleCrypto: false
    }
  }

  setError(str){
    this.setState({
      error: str
    })
    setTimeout(() => this.setState({error: ""}), 1500)
  }

  componentDidMount(){
    if(!localStorage.token){return}
    fetch("http://localhost:3000/api/v1/profile", {
      method: "GET",
      headers: {
        'Authorization': "Bearer " + localStorage.token,
      }
    })
    .then(res => res.json())
    .then(data => {
      this.setState({
        userCryptos: data.user.cryptos
        // cryptosAreLoading: false
      })
    })
  }

  setCurrentCrypto = (crypto) => {
    this.setState({
      currentCrypto: crypto,
      lookingAtSingleCrypto: true
    })
    this.props.history.push('/my_crypto/' + crypto.id)
  }

  renderDetailedUserCryptoView = () => {
    const {currentCrypto, lookingAtSingleCrypto} = this.state
    if(lookingAtSingleCrypto === true) {
      return(
        <div>
        <UserCryptoDetailedView
        countCrypto={this.countCrypto}
        currentCrypto={currentCrypto}
        returnToUserCryptosContainer={this.returnToUserCryptosContainer}
        deleteCrypto={this.deleteCrypto}
        error={this.state.error}
        />
        </div>
          )
    }
  }

  returnToUserCryptosContainer = () => {
    this.setState({
      currentCrypto: null,
      lookingAtSingleCrypto: false,
    })
  }

  returnToHomepageFromCryptosContainers = () => {
    this.setState({
      currentCrypto: null,
      lookingAtSingleCrypto: false
    })
    this.props.history.push('/center_console')
  }


  deleteCrypto = (crypto) => {
    fetch("http://localhost:3000/api/v1/remove_crypto/"+ crypto.id, {
      method: "DELETE",
      headers: {
        'Authorization': "Bearer " + localStorage.token
      },
      body: JSON.stringify({crypto_id: crypto.id})
    })
    .then(res => res.json())
    .then(data => {
      let cryptoNames = data.user.cryptos.map((crypto) => {
        return crypto.name
      })
      if(!cryptoNames.includes(crypto.name)){
        setTimeout(() => this.setState({
          currentCrypto: null,
          lookingAtSingleCrypto: false,
        }), 2000)
      }
      this.setError("Deleted ${crypto.name} from Cryptos")
      this.componentDidMount()
    })
  }

getPrices = () => {
  const values = []
  this.state.userCryptos.map((crypto)=> {
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
  this.state.userCryptos.map((crypto) => {
    if(cc.name === crypto.name) {
      cryptos.push(crypto)
    }
  })
  return cryptos.length
}

distinctCrypto = () => {
const array = this.state.userCryptos
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
      <button className="CCbutton" onClick={this.returnToHomepageFromCryptosContainers}>Return to homepage</button>
      <div>
      {this.renderDetailedUserCryptoView()}
      {this.distinctCrypto().map((crypto)=>{
        return <UserCrypto
                countCrypto={this.countCrypto}
                key={"user-"+crypto.name+"-"+crypto.id}
                crypto={crypto}
                setCurrentCrypto={this.setCurrentCrypto}
                />
      })}
      </div>
      </div>
    )
  }

}

export default withRouter(UserCryptosContainer)
