import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom'

class Banner extends Component {

  constructor(){
    super()
    this.state = {
      nothingHasBeenClicked: true
    }
  }

  userIsLoggedIn(){
    return this.props.current_user.username
  }

  renderDefaultForm(){
    if(this.props.history.location.pathname === "/"){
      return (
        <div className="App">
          <div className="forms">
          <h1 className="title">Crypto Mundo</h1>
          </div>
        </div>
      )
    }
  }

  render(){
    return (
      <div>

            {!this.userIsLoggedIn() &&
              <div>
              <div className="banner">
              <div className="signup1"><Link to='/user_signup'><div className="ui primary button">Sign up</div></Link></div>
              <div className="login1"><Link to="/login"><div className="ui button">Login</div></Link></div>
              </div>
              </div>
            }

            {this.userIsLoggedIn() &&
              <div className="banner">
              <div><Link to="/my-crypto"><div className="ui button" onClick={this.props.displayUserCryptos}>My Cryptos</div></Link></div>
              <div><Link to="/news"><div className="ui button">News</div></Link></div>
              <div className="ui button"><Link to="/update_profile"><div>Settings</div></Link></div>
              <div onClick={this.props.logout} className="ui primary button">Log Out</div>
             </div>
            }

            {this.renderDefaultForm()}

      </div>
  )
  }
}

export default withRouter(Banner)
