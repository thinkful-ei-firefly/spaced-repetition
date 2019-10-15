import React, { Component } from 'react';
// import LanguageContext from './context/LanguageContext';
import TokenService from '../../services/token-service';

import { Link } from 'react-router-dom';
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
    const score = data.score;
    console.log({ language, words, score });
    this.setState({ language, words, score });
  };

  componentDidMount() {
    this.getLanguageInfo();
  }

  renderWords() {
    return this.state.words.map(word => <Word word={word} />);
  }

  render() {
    return (
      <section>
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
