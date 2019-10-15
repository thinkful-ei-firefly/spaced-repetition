import React, { Component } from 'react';
// import LanguageContext from './context/LanguageContext';
import TokenService from '../../services/token-service';
import WordList from '../../components/WordList/WordList';
import { Link } from 'react-router-dom';
import config from '../../config';

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

  render() {
    return (
      <section>
        <p>Language: {this.context.language}</p>
        {/* component for word list */}
        <ul>
          <li>Word 1: 0/5</li>
          <li>Word 2</li>
          <li>Word 3</li>
        </ul>
        <p>Total Correct: 10</p>
        <Link to="/learn">
          <button>Start Learning!</button>
        </Link>
      </section>
    );
  }
}

export default DashboardRoute;
