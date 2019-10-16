<<<<<<< HEAD
import React, { Component } from "react";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import "../register.css";
=======
import React, { Component } from 'react';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import './register.css';
>>>>>>> f453f11119c16627ff507661a97afe228fd86a88

class RegistrationRoute extends Component {
  static defaultProps = {
    history: {
      push: () => {}
    }
  };

  handleRegistrationSuccess = () => {
    const { history } = this.props;
    history.push('/login');
  };

  render() {
    return (
      <section>
        <p>
          Practice learning a language with the spaced reptition revision
          technique.
        </p>
        <h2>Sign up</h2>
        <RegistrationForm
          onRegistrationSuccess={this.handleRegistrationSuccess}
        />
      </section>
    );
  }
}

export default RegistrationRoute;
