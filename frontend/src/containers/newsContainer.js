import React, { Component } from 'react'
import Article from '../components/article'
import {withRouter} from 'react-router';
import ArticleView from '../components/articleView'

const NEWS_API= "https://newsapi.org/v2/everything?q=cryptocurrency&from=2019-12-10&sortBy=publishedAt&apiKey=e17454af05b842518705a1a4960a4f94"


class NewsContainer extends Component {

  constructor(){
    super()
    this.state = {
      news: [],
      currentNewsArticle: {},
      lookingAtSingleNewsArticle: false
    }
  }

  componentDidMount(){
    fetch(NEWS_API)
      .then(res => res.json())
      .then(data => {
        this.setState({
          news: data.articles
        })
      })
  }

  setCurrentNewsArticle = (article) => {
    this.setState({
      currentNewsArticle: article,
      lookingAtSingleNewsArticle: true
    })
  }

  renderDetailedNewsView = () => {
  const {currentNewsArticle, lookingAtSingleNewsArticle} = this.state
  if(lookingAtSingleNewsArticle === true) {
      return (
            <ArticleView
            currentNewsArticle={currentNewsArticle}
            returnToNewsContainer={this.returnToNewsContainer}
            />
          )
    }
  }

  returnToNewsContainer = () => {
    this.setState({
      currentNewsArticle: null,
      lookingAtSingleNewsArticle: false
    })
  }

  returnToHomepageFromNewsContainer = () => {
    this.setState({
      currentNewsArticle: null,
      lookingAtSingleNewsArticle: false
    })
    this.props.history.push('/center_console')
  }

  render(){
    return (
      <div className="articles">
      <h1 className="ccHeader">News Stories</h1>
      <button className="CCbutton" onClick={this.returnToHomepageFromNewsContainer}>Return to homepage</button>
      {this.renderDetailedNewsView()}
      <div>
        {
          this.state.news.map((article)=> {
            return <Article
                    className="article"
                    article={article}
                    setCurrentNewsArticle={this.setCurrentNewsArticle}
                    />
          })
        }
      </div>
      </div>
    )
  }
}

export default withRouter(NewsContainer)
