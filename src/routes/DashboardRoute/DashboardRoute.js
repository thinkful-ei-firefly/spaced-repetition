import React, { Component } from 'react';
// import LanguageContext from './context/LanguageContext';
import TokenService from '../../services/token-service';
import { Link } from 'react-router-dom';
import config from '../../config';

class DashboardRoute extends Component {
  // static contextType = LanguageContext;

  componentDidMount() {
    return fetch(`${config.API_ENDPOINT}/language`, {
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
    // pull in context and update it here
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
