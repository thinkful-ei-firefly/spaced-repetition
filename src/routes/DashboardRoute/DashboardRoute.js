import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';
import TokenService from '../../services/token-service';

import { Link } from 'react-router-dom';
import config from '../../config';
import Word from '../../components/Word/Word';

class DashboardRoute extends Component {
  // static contextType = LanguageContext;
  static contextType = UserContext;
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
    const score = data.total_score;

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
        <h2>{this.context.user.name}'s Words</h2>
        <p>Language: {this.state.language}</p>
        <ul>{this.renderWords()}</ul>
        <p>Total Correct: {this.state.score}</p>
        <Link to="/learn">
          <button>Start Learning!</button>
        </Link>
      </section>
    );
  }
}

export default DashboardRoute;
