import React from 'react'

class cryptoNameForm extends React.Component {

  constructor(){
    super()
    this.state = {
      searchTerm: ""
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.getCryptosName()
    this.setState({
      searchTerm: ""
    })
  }

  render(){
    return(
      <div>
            <button className="crypto-button" onClick={this.props.turnOn}>
              See all cryptocurrencies

            </button>
      </div>
    )
  }

}

export default cryptoNameForm
