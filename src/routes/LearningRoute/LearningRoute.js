import React, { Component } from "react";
import TokenService from "../../services/token-service";
import config from "../../config";

class LearningRoute extends Component {
  state = {
    correct: 0,
    incorrect: 0,
    currentWord: '',
    totalScore: 0
  };

  getLanguageHead = async () => {
    const data = await fetch(`${config.API_ENDPOINT}/language/head`, {
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
    console.log(data)
    this.setState({
      currentWord: data.nextWord,
      correct: data.wordCorrectCount,
      incorrect: data.wordIncorrectCount,
      totalScore: data.totalScore
    });
  };

  componentDidMount() {
    this.getLanguageHead();
  }

  onSubmit = event => {
    event.preventDefault()
    let {guess} = event.target
    guess = guess.value
  }

  render() {
    return <section>
        <h2>Translate the word:</h2>
        <span>{this.state.currentWord}</span>
        <p>Your total score is: {this.state.totalScore}</p>
        <p>You have answered this word correctly {this.state.correct} times.</p>
        <p>You have answered this word incorrectly {this.state.incorrect} times.</p>
        
        <form onSubmit={this.onSubmit}>
          <label htmlFor="learn-guess-input">What's the translation for this word?</label>
          <input type="text" required id="learn-guess-input" name="guess"></input>
          <button type="submit">Submit your answer</button>
        </form>
    </section>;
  }
}

export default LearningRoute;
