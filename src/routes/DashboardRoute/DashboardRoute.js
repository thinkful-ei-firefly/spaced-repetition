import React, { Component } from 'react';
import TokenService from '../../services/token-service';
import config from '../../config';
import Word from '../../components/Word/Word';

class DashboardRoute extends Component {
  // static contextType = LanguageContext;

  state = {
    language: '',
    words: [],
    score: 0
  };

  getLanguageInfo = async () => {
    const data = await fetch(`${config.API_ENDPOINT}/language`, {
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );

    const language = data.language.name;
    const words = data.words;
    const score = data.language.total_score;
    this.setState({ language, words, score });
  };

  componentDidMount() {
    this.getLanguageInfo();
  }

  renderWords() {
    return this.state.words.map(word => <Word key={word.id} word={word} />);
  }

  render() {
    return (
      <section>
        <h2>{this.state.language}</h2>
        <h3>Words to practice</h3>
        <ul>{this.renderWords()}</ul>
        <p>Total correct answers: {this.state.score}</p>
        <a href="/learn">
          <button>Start practicing</button>
        </a>
      </section>
    );
  }
}

export default DashboardRoute;
