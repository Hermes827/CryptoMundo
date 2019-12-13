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
//                                                        setCurrentNews={this.setCurrentNews}
//                                                        />}/>
//only reason that newscontainer doesnt render properly is because of the logic in newscontainer component itself
//turns out I just had to pass in props for this newscontainer component, when i access news by clicking on the button
//that function passes down news to the newscontainer component, but this doesnt happen when accessing newscontainer via
//changing the URL name
{this.renderNews()}

// renderDetailedViewNews = () => {
//   const {news, currentNews} = this.state
//   if(this.state.lookingAtSingleNews === true) {
//     return(
//       <div>
//         <NewsContainer
//                 returnHomeNews={this.returnHomeNews}
//                 toggleNews={this.toggleNews}
//                 setCurrentNews={this.setCurrentNews}
//                 news={news}
//                 currentNews={this.state.currentNews}
//                 lookingAtSingleNews={this.state.lookingAtSingleNews}
//                 />
//                 <ArticleView
//                 currentNews={currentNews}
//                 returnToNewsContainer={this.returnToNewsContainer}
//                 />
//       </div>
//         )
//   }
// }

// renderNews = () => {
//   const {news} = this.state
//   if(this.state.hasClickedNewsButton === true){
//     return <NewsContainer
//             returnHomeNews={this.returnHomeNews}
//             toggleNews={this.toggleNews}
//             setCurrentNews={this.setCurrentNews}
//             news={news}
//             currentNews={this.state.currentNews}
//             lookingAtSingleNews={this.state.lookingAtSingleNews}
//             />
//   }
// }

returnToNewsContainer = () => {
  this.setState({
    currentNews: null,
    lookingAtSingleNews: false,
    hasClickedNewsButton: true
  })
}

toggleNews = () => {
  // this.setState({
  //   hasClickedNewsButton: !this.state.hasClickedNewsButton
  // })
  console.log("hello")
}

setCurrentNews = (article) => {
  this.setState({
    currentNews: article,
    lookingAtSingleNews: true
  })
}

// returnHomeNews = () => {
//   console.log("hello")
//   this.setState({
//     // cryptosAreLoading: true,
//     currentNews: null,
//     lookingAtSingleNews: false,
//     hasClickedNewsButton: true
//   })
// }

// setNews = () => {
//   this.setState({
//     hasClickedNewsButton: true
//   })
// }

returnHomeNews = () => {
  this.setState({
    currentNews: null,
    lookingAtSingleNews: false,
    hasClickedNewsButton: false
  })
}

  {this.renderNews()}
