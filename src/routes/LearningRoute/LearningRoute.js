import React, { Component } from "react";
import TokenService from "../../services/token-service";
import config from "../../config";

class LearningRoute extends Component {
  state = {
    language: "",
    words: [],
    score: 0,
    currentWord: 0
  };

  getLanguageInfo = async () => {
    const data = await fetch(`${config.API_ENDPOINT}/language`, {
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
    console.log(data);
    const language = data.language.name;
    const words = data.words;
    const score = data.language.total_score;
    this.setState({ language, words, score });
  };

  componentDidMount() {
    this.getLanguageInfo();
  }

  renderWord(){
    console.log(this.state.words)
    if (this.state.words.length === 0){
      return <p></p>
    } else {
      let current = this.state.words[this.state.currentWord]
    return <section>
      <h2>{current.original}</h2>
      <p>Guesses: {current.correct_count + current.incorrect_count}</p>
      <p>Correct: {current.correct_count}</p>
    </section>
    }
    
  }

  render() {
    return <section>
      <h2>{this.state.language}</h2>
        <h3>Word to practice</h3>
        {this.renderWord()}
        <p>Total correct answers: {this.state.score}</p>
        <a href="/learn">
          <button>Start practicing</button>
        </a>
    </section>;
  }
}

export default LearningRoute;
