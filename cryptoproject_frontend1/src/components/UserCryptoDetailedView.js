import React from 'react'

class UserCryptoDetailedView extends React.Component {

  render(){
    return(
      <div className="detailedView">
          <h1 className="card-title">{this.props.currentCrypto.name}</h1>
          <img className="detailedViewImg" src={this.props.currentCrypto.img_url} alt={this.props.currentCrypto.name}/>

          
          <button className="ui left inverted green labeled icon button" onClick={this.props.returnMyCryptos}>
            <i className="arrow left icon"></i>
            Back
          </button>

          <button className="ui left inverted red labeled icon button" onClick={()=>this.props.deleteCrypto(this.props.currentCrypto)}>
            <i className="trash alternate icon"></i>
            Delete from my Cryptos
          </button>
      </div>
    )
  }

}

export default UserCryptoDetailedView
