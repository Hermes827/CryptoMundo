function changeState(state, action){
  switch (action.type) {
    case 'INCREASE_COUNT':
    return {count: state.count + 1}
    case 'DECREASE_COUNT':
    return {count: state.count - 1}
    default:
      return state;
  }
}

// <Route exact path="/news" render={() => <NewsContainer news={this.state.news}
//                                                        toggleNews={this.toggleNews}
//                                                        setCurrentNewsArticle={this.setCurrentNewsArticle}
//                                                        />}/>
//only reason that newscontainer doesnt render properly is because of the logic in newscontainer component itself
//turns out I just had to pass in props for this newscontainer component, when i access news by clicking on the button
//that function passes down news to the newscontainer component, but this doesnt happen when accessing newscontainer via
//changing the URL name
{this.renderNews()}

// renderDetailedNewsView = () => {
//   const {news, currentNewsArticle} = this.state
//   if(this.state.lookingAtSingleNewsArticle === true) {
//     return(
//       <div>
//         <NewsContainer
//                 returnToHomepageFromNewsContainer={this.returnToHomepageFromNewsContainer}
//                 toggleNews={this.toggleNews}
//                 setCurrentNewsArticle={this.setCurrentNewsArticle}
//                 news={news}
//                 currentNewsArticle={this.state.currentNewsArticle}
//                 lookingAtSingleNewsArticle={this.state.lookingAtSingleNewsArticle}
//                 />
//                 <ArticleView
//                 currentNewsArticle={currentNewsArticle}
//                 returnToNewsContainer={this.returnToNewsContainer}
//                 />
//       </div>
//         )
//   }
// }

// renderNews = () => {
//   const {news} = this.state
//   if(this.state.hasClickedNewsDBButton === true){
//     return <NewsContainer
//             returnToHomepageFromNewsContainer={this.returnToHomepageFromNewsContainer}
//             toggleNews={this.toggleNews}
//             setCurrentNewsArticle={this.setCurrentNewsArticle}
//             news={news}
//             currentNewsArticle={this.state.currentNewsArticle}
//             lookingAtSingleNewsArticle={this.state.lookingAtSingleNewsArticle}
//             />
//   }
// }

returnToNewsContainer = () => {
  this.setState({
    currentNewsArticle: null,
    lookingAtSingleNewsArticle: false,
    hasClickedNewsDBButton: true
  })
}

toggleNews = () => {
  // this.setState({
  //   hasClickedNewsDBButton: !this.state.hasClickedNewsDBButton
  // })
  console.log("hello")
}

setCurrentNewsArticle = (article) => {
  this.setState({
    currentNewsArticle: article,
    lookingAtSingleNewsArticle: true
  })
}

// returnToHomepageFromNewsContainer = () => {
//   console.log("hello")
//   this.setState({
//     // cryptosAreLoading: true,
//     currentNewsArticle: null,
//     lookingAtSingleNewsArticle: false,
//     hasClickedNewsDBButton: true
//   })
// }

// setNewsState = () => {
//   this.setState({
//     hasClickedNewsDBButton: true
//   })
// }

returnToHomepageFromNewsContainer = () => {
  this.setState({
    currentNewsArticle: null,
    lookingAtSingleNewsArticle: false,
    hasClickedNewsDBButton: false
  })
}

  {this.renderNews()}

  <Route exact path="/news" render={() => this.renderDetailedNewsView()} />
  {this.renderNews()}
