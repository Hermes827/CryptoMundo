import React from 'react'

class ArticleDetailedView extends React.Component {

  render(){
    return(
      <div className="articleView">
        {console.log(this.props.currentNewsArticle)}
        <h3>{this.props.currentNewsArticle.title}</h3>
        <img className="storyImg" src={this.props.currentNewsArticle.urlToImage}></img>
        <h5>{this.props.currentNewsArticle.publishedAt}</h5>
        <h5>{this.props.currentNewsArticle.author}</h5>
        <h3>{this.props.currentNewsArticle.description}</h3>
        <a href={this.props.currentNewsArticle.url} target="_blank">Read More Here HELLO</a>
        {console.log(this.props.currentNewsArticle.url)}
        <br/>
        &nbsp;
        <button className="returnButtonNews" onClick={this.props.returnToNewsContainer}>
          Close
        </button>
      </div>
    )
  }

}

export default ArticleDetailedView
