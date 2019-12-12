import React from 'react'

class ArticleDetailedView extends React.Component {

  render(){
    return(
      <div className="articleView">
        {console.log(this.props.currentNews)}
        <h3>{this.props.currentNews.title}</h3>
        <img className="storyImg" src={this.props.currentNews.urlToImage}></img>
        <h5>{this.props.currentNews.publishedAt}</h5>
        <h5>{this.props.currentNews.author}</h5>
        <h3>{this.props.currentNews.description}</h3>
        <a href={this.props.currentNews.url} target="_blank">Read More Here HELLO</a>
        {console.log(this.props.currentNews.url)}
        <br/>
        &nbsp;
        <button className="returnButtonNews" onClick={this.props.returnMyNews}>
          Close
        </button>
      </div>
    )
  }

}

export default ArticleDetailedView
