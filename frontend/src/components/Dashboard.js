import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom'

class Dashboard extends Component {

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
      <div className="dashboard">

            {!this.userIsLoggedIn() &&
              <div>
              <div className="dashboard-signup"><Link to='/user_signup'><div>Sign up</div></Link></div>
              <div className="dashboard-login"><Link to="/login"><div>Login</div></Link></div>
              </div>
            }

            {this.userIsLoggedIn() &&
              <div>
              <div><Link to="/my_crypto"><div className="ui button" onClick={this.props.displayUserCryptos}>My Cryptos</div></Link></div>
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

export default withRouter(Dashboard)
