import React, { Component } from 'react';
import GuessService from '../../services/guess-services';

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
    isCorrect: null
  };

  componentDidMount() {
    GuessService.getLanguageHead().then(res =>
      this.setState({
        currentWord: res.nextWord,
        correct: res.wordCorrectCount,
        incorrect: res.wordIncorrectCount,
        totalScore: res.totalScore
      })
    );
  }

  onSubmit = event => {
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
      <form onSubmit={this.onSubmit}>
        <label htmlFor="learn-guess-input">
          What's the translation for this word?
        </label>
        <input type="text" required id="learn-guess-input" name="guess"></input>
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
        <p className="DisplayFeedback">
          The correct translation for {this.state.currentWord} was
          {this.state.answer} and you chose {this.state.guess}!
        </p>
        <button>Try another word!</button>
      </>
    );
  };

  render() {
    return (
      <section>
        {this.state.isCorrect === null ? <h2>Translate the word:</h2> : ''}
        <span>{this.state.currentWord}</span>
        <p className="DisplayScore">
          Your total score is: {this.state.totalScore}
        </p>
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
