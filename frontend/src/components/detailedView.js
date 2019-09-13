import React from 'react'

class DetailedView extends React.Component {

          // <h3>Market: {this.props.currentCrypto.market}</h3>
          //

  render(){
    return(
      <div className="detailedView">
          <h3>{this.props.currentCrypto.name}</h3>
          <img className="logo1" src={"https://www.cryptocompare.com" + this.props.currentCrypto.image}></img>
          <br/>
          <img className="graph" src={"https://images.cryptocompare.com/sparkchart/" + this.props.currentCrypto.name + "/USD/latest.png?ts=" + this.props.currentCrypto.lastUpdate}></img>
          <br/>
          {this.props.feedback !== "" && <div className="feedback-message">{this.props.feedback}</div>}
          <h3>Current Price: ${this.props.currentCrypto.price} USD</h3>
            <h3>Daily High: {this.props.currentCrypto.highday} USD</h3>
            <h3>Daily Low: {this.props.currentCrypto.lowday} USD</h3>

          <h3>Daily Volume: {this.props.currentCrypto.volume} USD</h3>
          <h3>Total Supply: {this.props.currentCrypto.supply}</h3>

          <button className="returnButton" onClick={this.props.returnMainMenu}>
            Go back to cryptos
          </button>
          &nbsp;
          <button className="detailButton" onClick={()=> this.props.addCrypto(this.props.currentCrypto)}>
            Add crypto to portfolio
          </button>

      </div>
    )
  }

}

export default DetailedView
