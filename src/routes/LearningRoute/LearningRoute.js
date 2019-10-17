import React, { Component } from "react";
import TokenService from "../../services/token-service";
import config from "../../config";

class LearningRoute extends Component {
  state = {
    correct: 0,
    incorrect: 0,
    currentWord: ''
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
      incorrect: data.wordIncorrectCount
    });
  };

  componentDidMount() {
    this.getLanguageHead();
  }

  renderWord(){
    return <section>
      <h2>{this.state.currentWord}</h2>
      <p>Guesses: {this.state.correct + this.state.incorrect}</p>
      <p>Correct: {this.state.correct}</p>
    </section>    
  }

  render() {
    return <section>
        <h3>Word to practice</h3>
        {this.renderWord()}
        <a href="/learn">
          <button>Start practicing</button>
        </a>
    </section>;
  }
}

export default LearningRoute;
