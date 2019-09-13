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

  setNews = () => {
    console.log("hello")
  }

  render(){
    return <div className="ui attached top">

      <div className="banner">
        <div className="home">
        <a href="#/" className={this.state.active === "main" ? 'item active' : "item"} onClick={this.selectMain}>
          Home
        </a>
        </div>
        <div  className="myCryptos">
        <a href="#/" className={this.state.active === "cryptos" ? 'item active' : "item"} onClick={this.selectCryptos}>
          My Cryptos
        </a>
        </div>
        <div className="right menu">
          {!this.userIsLoggedIn() &&
            <>
            <div className="news">
            <Link to="/news"><div className="ui button" onClick={this.props.setNews}>News</div></Link>
            </div>
            <div className="signup1">
            <Link to='/user_signup'><div className="ui primary button">Sign up</div></Link>
            </div>

            <div className="login1">
            <Link to="/login"><div className="ui button">Login</div></Link>
            </div>
          </>
          }
          {this.userIsLoggedIn() && <div className="news1">
                                      <div>
                                      <Link to="/news"><div className="ui button"  onClick={this.props.setNews}>News</div></Link>
                                      </div>
                                    </div>}
          {this.userIsLoggedIn() && <div className="settings1">
                                        <div onClick={() => this.props.history.push('/update_profile')} className="ui button">
                                          <div onClick={this.props.setEdit}>
                                          Settings
                                          </div>
                                        </div>
                                    </div>}
          {this.userIsLoggedIn() && <div className="logout1"><div onClick={this.props.logout} className="ui primary button">Log Out</div></div>}

          <div className="item">

          </div>
        </div>
      </div>


    </div>;
  }
}

export default withRouter(Banner)




    // { this.userIsLoggedIn() && <div className="item">Welcome, {this.props.current_user.username}</div>}
