import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom'

class Dashboard extends Component {

  userIsLoggedIn(){
    return this.props.current_user.username
  }

  renderDefaultForm(){
    if(this.props.history.location.pathname === "/"){
      return (
        <div>
          <div className="dashboard-centerConsole-form">
          <h1 className="title">Crypto Mundo</h1>
          <button className="crypto-button" onClick={()=> this.props.history.push('/user_signup')}>Get Started</button>
          </div>
        </div>
      )
    }
  }


  render(){
    return (
      <div>

            {!this.userIsLoggedIn() &&
              <div className="dashboard">
              <div className="dashboard-loggedout"><Link to='/user_signup'><div>Sign up</div></Link></div>
              <div className="dashboard-loggedout"><Link to="/login"><div>Login</div></Link></div>
              </div>
            }

            {this.userIsLoggedIn() &&
              <div className="dashboard">
              <div><Link to="/my_crypto"><div className="dashboard-loggedin" onClick={this.props.displayUserCryptos}>My Cryptos</div></Link></div>
              <div><Link to="/news"><div className="dashboard-loggedin">News</div></Link></div>
              <div><Link to="/update_profile"><div className="dashboard-loggedin">Settings</div></Link></div>
              <div onClick={this.props.logout} className="dashboard-loggedin">Log Out</div>
             </div>
            }

            {this.renderDefaultForm()}

      </div>
  )
  }
}

export default withRouter(Dashboard)
