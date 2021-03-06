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
      lookingAtSingleNewsArticle: false,
      hasClickedButton: false
    }
  }

  componentDidMount(){
    this.startLoadingSpinner()
    fetch(NEWS_API)
      .then(res => res.json())
      .then(data => {
        this.setState({
          news: data.articles
        })
        this.stopLoadingSpinner()
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

  // loading spinner

  startLoadingSpinner(){
    this.setState({
      hasClickedButton: true
    })
  }

  stopLoadingSpinner(){
    this.setState({
      hasClickedButton: false
    })
  }

  renderLoadingSpinner(){
    if(this.state.hasClickedButton === true){
      return (
        <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      )
    }
  }

  render(){
    return (
      <div className="newsContainer">
      <h1 className="ccHeader">News Stories</h1>
      <button className="CCbutton" onClick={this.returnToHomepageFromNewsContainer}>Return to homepage</button>
      {this.renderDetailedNewsView()}
      <div>
        {this.renderLoadingSpinner()}
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
