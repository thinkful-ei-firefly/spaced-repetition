import React, { Component } from 'react';
import GuessService from '../../services/guess-services';
import "./learning.css"

class LearningRoute extends Component {
  state = {
    correct: 0,
    incorrect: 0,
    currentWord: '',
    totalScore: 0,
    nextWord: '',
    wordCorrectCount: 0,
    wordIncorrectCount: 0,
    answer: '',
    guess: '',
    isCorrect: null,
    language: ''
  };

  getNextWord = () => {
    GuessService.getLanguageHead().then(res =>
      this.setState({
        currentWord: res.nextWord,
        correct: res.wordCorrectCount,
        incorrect: res.wordIncorrectCount,
        totalScore: res.totalScore,
        isCorrect: null,
        language: res.language
      })
    );
  };

  handleButtonClick = event => {
    this.setState({
      currentWord: this.state.nextWord,
      correct: this.state.wordCorrectCount,
      incorrect: this.state.wordIncorrectCount,
      isCorrect: null
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    let { guess } = event.target;
    guess = guess.value;
    this.setState({ guess });
    GuessService.submitGuess(guess).then(res => {
      guess = '';
      const {
        nextWord,
        wordCorrectCount,
        wordIncorrectCount,
        answer,
        totalScore,
        isCorrect
      } = res;
      if (isCorrect) {
        this.setState({ correct: this.state.correct + 1 });
      } else {
        this.setState({ incorrect: this.state.incorrect + 1 });
      }
      this.setState({
        nextWord,
        wordCorrectCount,
        wordIncorrectCount,
        answer,
        totalScore,
        isCorrect
      });
    });
  };

  renderForm = () => {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <label htmlFor="learn-guess-input">
          What's the translation for this word?
        </label>
        <input type="text" required id="learn-guess-input" name="guess"></input><br/>
        <button type="submit">Submit your answer</button>
      </form>
    );
  };

  renderResponse = () => {
    return (
      <>
        <h2>
          {this.state.isCorrect === true
            ? 'You were correct! :D'
            : 'Good try, but not quite right :('}
        </h2>
        <div className="DisplayFeedback">
          <p>
            The correct translation for {this.state.currentWord} was{' '}
            {this.state.answer} and you chose {this.state.guess}!
          </p>
        </div>
        <button onClick={this.handleButtonClick}>Try another word!</button>
      </>
    );
  };

  componentDidMount() {
    this.getNextWord();
  }

  render() {
    return (
      <section className="Learning">
        {this.state.isCorrect === null ? <h2>Translate the word:</h2> : ''}
        <span lang="ja">{this.state.currentWord}</span>
        <div className="DisplayScore">
          <p>Your total score is: {this.state.totalScore}</p>
        </div>
        <p>You have answered this word correctly {this.state.correct} times.</p>
        <p>
          You have answered this word incorrectly {this.state.incorrect} times.
        </p>
        {this.state.isCorrect === null
          ? this.renderForm()
          : this.renderResponse()}
      </section>
    );
  }
}

export default LearningRoute;
