import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom'

class Banner extends Component {

  constructor(props){
    super(props)

    // this.state = {
    //   active: this.props.hasClickedMyCryptos ? "cryptos" : "main"
    // }

  }

  userIsLoggedIn(){
    return this.props.current_user.username
  }

  // static getDerivedStateFromProps(props, state){
  //   // return {active: props.hasClickedMyCryptos ? "cryptos" : "main"}
  // }

  // selectMain = (ev) => {
  //   // this.setState({
  //   //   active: "main"
  //   // })
  //   this.props.returnMainMenu(ev)
  // }

  // selectCryptos = () => {
  //   // this.setState({ not necessary I guess
  //   //   active: "cryptos"
  //   // })
  //   this.props.displayUserCryptos()
  // }

  render(){
    return (
    <div>

      <div className="banner">


          {!this.userIsLoggedIn() &&
            <div>
            <div className="signup1">
            <Link to='/user_signup'><div className="ui primary button">Sign up</div></Link>
            </div>
            <div className="login1">
            <Link to="/login"><div className="ui button">Login</div></Link>
            </div>
          </div>
          }

          {this.userIsLoggedIn() &&
            <div>
              <div>
              <Link to="/my-crypto"><div className="ui button" onClick={this.props.displayUserCryptos}>My Cryptos</div></Link>
              </div>

              <div>
              <Link to="/news"><div className="ui button">News</div></Link>
              </div>

                <div className="ui button">
                  <Link to="/update_profile"><div>Settings</div></Link>
                </div>

                <div onClick={this.props.logout} className="ui primary button">
                  Log Out
                </div>
              </div>
                  }
      </div>

    </div>
  )
  }
}

export default withRouter(Banner)
    // { this.userIsLoggedIn() && <div className="item">Welcome, {this.props.current_user.username}</div>}

    // <div className="myCryptos">
    // <a href="#/" onClick={this.selectCryptos}>
    //   My Cryptos
    // </a>
    // </div>

    // <div className="home">
    // <a href="#/" className={this.state.active === "main" ? 'item active' : "item"} onClick={this.selectMain}>
    //   Home
    // </a>
    // </div>
