import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom'

class Dashboard extends Component {

  userIsLoggedIn(){
    return this.props.current_user.username
  }

  render(){
    return (
      <div>

            {!this.userIsLoggedIn() &&
              <div className="dashboard">
              <div><Link to='/user_signup'><div className="dashboard-loggedout">Sign up</div></Link></div>
              <div><Link to="/login"><div className="dashboard-loggedout">Login</div></Link></div>
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

      </div>
  )
  }
}

export default withRouter(Dashboard)
