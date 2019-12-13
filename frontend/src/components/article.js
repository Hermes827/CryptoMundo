import React, { Component } from 'react'

class Article extends Component {

  viewArticle = () => {
    // this.props.toggleNews() togglenews might be useless
    this.props.setCurrentNews(this.props.article)
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
