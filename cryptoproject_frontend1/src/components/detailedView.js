import React from 'react'

class DetailedView extends React.Component {

  render(){
    return(
      <div className="detailedView">
          <h1 className="card-title">{this.props.currentCrypto.name}</h1>
          <h3>{this.props.currentCrypto.price}</h3>




          <button className="ui left inverted green labeled icon button" onClick={this.props.returnMainMenu}>
            <i className="arrow left icon"></i>
            Go back to cryptos
          </button>
          <button className="ui inverted right green labeled icon button" onClick={()=> this.props.addCrypto(this.props.currentCrypto)}>
            Save crypto
        
          </button>

      </div>
    )
  }

}

export default DetailedView
