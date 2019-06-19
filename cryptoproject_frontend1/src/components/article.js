import React, { Component } from 'react'

class Article extends Component {

  viewArticle = () => {
    this.props.toggleNews()
    this.props.setCurrentNews(this.props.article)
    console.log("hello")
  }

  render(){
    return (
      <div className="crypto" onClick={this.viewArticle}>
        <h1>{this.props.article.title}</h1>

      </div>
    )
  }
}

export default Article
