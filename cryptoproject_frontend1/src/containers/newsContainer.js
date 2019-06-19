import React, { Component } from 'react'
import Article from '../components/article'

class NewsContainer extends Component {

  render(){
    return (
      <div className="articles">
      <h1 className="ccHeader">News Stories</h1>
      <button className="CCbutton" onClick={this.props.returnHomeNews}>Return to homepage</button>

        <div>

        {
          this.props.news.map((article)=> {
            return <Article
                    className="article"
                    article={article}
                    toggleNews={this.props.toggleNews}
                    setCurrentNews={this.props.setCurrentNews}
                    />
          })
        }

        </div>

      </div>
    )
  }
}

export default NewsContainer
