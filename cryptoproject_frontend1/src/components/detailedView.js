import React from 'react'

class DetailedView extends React.Component {

  render(){
    return(
      <div className="detailedView">
          <h1>{this.props.currentCrypto.name}</h1>
          <img className="logo" src={"https://www.cryptocompare.com" + this.props.currentCrypto.image}></img>
          <h3>Current Price: {this.props.currentCrypto.price} USD</h3>




          <button onClick={this.props.returnMainMenu}>
            <i className="arrow left icon"></i>
            Go back to cryptos
          </button>
          <button onClick={()=> this.props.addCrypto(this.props.currentCrypto)}>
            Save crypto

          </button>
          {this.props.feedback !== "" && <div className="feedback-message">{this.props.feedback}</div>}
      </div>
    )
  }

}



export default DetailedView
