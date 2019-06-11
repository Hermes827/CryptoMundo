import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom'

class Banner extends Component {


  constructor(props){
    super(props)
    this.state = {
      active: this.props.onCryptos ? "cryptos" : "main"
    }

    this.selectMain = this.selectMain.bind(this)
    this.selectCryptos = this.selectCryptos.bind(this)
  }

  userIsLoggedIn(){
    return this.props.current_user.username
  }

  static getDerivedStateFromProps(props, state){
    return {active: props.onCryptos ? "cryptos" : "main"}
  }

  selectMain(ev){
    this.setState({
      active: "main"
    })
    this.props.returnMainMenu(ev)
  }

  selectCryptos(ev){
    this.setState({
      active: "cryptos"
    })
    this.props.displayUserCryptos(ev)
  }

  render(){
    return <div className="ui attached top">

      <div className="banner">
        <a href="#/" className={this.state.active === "main" ? 'item active' : "item"} onClick={this.selectMain}>
          Home
        </a>
        <br/>
        <a href="#/" className={this.state.active === "cryptos" ? 'item active' : "item"} onClick={this.selectCryptos}>
          My Cryptos
        </a>
        <div className="right menu">
          {!this.userIsLoggedIn() && <><div className="item">
            <Link to='/user_signup'><div className="ui primary button">Sign up</div></Link>
          </div>
          <div className="item">
            <Link to="/login"><div className="ui button">Login</div></Link>
          </div></>
          }
          { this.userIsLoggedIn() && <div className="item">Welcome, {this.props.current_user.username}</div>}
          {this.userIsLoggedIn() && <div className="item">
                                        <div onClick={() => this.props.history.push('/update_profile')} className="ui button">
                                          Settings
                                        </div>
                                    </div>}
          {this.userIsLoggedIn() && <div className="item"><div onClick={this.props.logout} className="ui primary button">Log Out</div></div>}
          <div className="item">

          </div>
        </div>
      </div>
      {this.props.error !== "" && <div className="error-message">{this.props.error}</div>}
      {this.props.feedback !== "" && <div className="feedback-message">{this.props.feedback}</div>}
    </div>;
  }
}

export default withRouter(Banner)
