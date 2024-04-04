/* 
Quick Tip 

- Use the below function in the EmojiGame Component to shuffle the emojisList every time when an emoji is clicked.

const shuffledEmojisList = () => {
  const {emojisList} = this.props
  return emojisList.sort(() => Math.random() - 0.5)
}

*/

// Write your code here.
import {Component} from 'react'
import './index.css'

import EmojiCard from '../EmojiCard'
import NavBar from '../NavBar'
import WinOrLoseCard from '../WinOrLoseCard'

class EmojiGame extends Component {
  state = {
    clickEmojiList: [],
    topScore: 0,
    isGameInProgress: true,
  }

  resetGame = () => {
    this.setState({clickEmojiList: [], isGameInProgress: true})
  }

  renderScoreCard = () => {
    const {emojiList} = this.props
    const {clickEmojiList} = this.state
    const isWon = clickEmojiList.length === emojiList

    return (
      <WinOrLoseCard
        isWon={isWon}
        onClickPlayAgain={this.resetGame}
        score={clickEmojiList.length}
      />
    )
  }

  finishGameAndSetTopScore = currentScore => {
    const {topScore} = this.state
    let newTopScore = topScore

    if (currentScore > topScore) {
      newTopScore = currentScore
    }
    this.setState({topScore: newTopScore, isGameInProgress: false})
  }

  clickEmoji = id => {
    const {emojiList} = this.props
    const {clickEmojiList} = this.state
    const isEmojiPresent = clickEmojiList.includes(id)
    const clickedEmojiLenght = clickEmojiList.length

    if (isEmojiPresent) {
      this.finishGameAndSetTopScore(clickedEmojiLenght)
    } else {
      if (emojiList.length - 1 === clickedEmojiLenght) {
        this.finishGameAndSetTopScore(emojiList.length)
      }
      this.setState(prevState => ({
        clickEmojiList: [...prevState.clickEmojiList, id],
      }))
    }
  }

  getShuffledEmojiList = () => {
    const {emojiList} = this.props
    return emojiList.sort(() => Math.random() - 0.5)
  }

  renderEmojiList = () => {
    const shuffledEmojisList = this.getShuffledEmojiList()

    return (
      <ul className="emoji-list-container">
        {shuffledEmojisList.map(eachEmojiObject => (
          <EmojiCard
            key={eachEmojiObject.id}
            emojiDetails={eachEmojiObject}
            clickEmoji={this.clickEmoji}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {clickEmojiList, isGameInProgress, topScore} = this.state

    return (
      <div className="app-container">
        <NavBar
          currentScore={clickEmojiList.length}
          isGameInProgress={isGameInProgress}
          topScore={topScore}
        />
        <div className="emoji-game-body">
          {isGameInProgress ? this.renderEmojiList() : this.renderScoreCard()}
        </div>
      </div>
    )
  }
}

export default EmojiGame
