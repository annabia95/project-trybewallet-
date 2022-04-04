/* eslint-disable react/jsx-max-depth */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faLock,
  faSackDollar } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { submitLogin } from '../actions';
import './LoginStyle.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      senha: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  handleSubmit() {
    const { submitLoginAction, history } = this.props;
    submitLoginAction(this.state);
    history.push('/carteira');
  }

  render() {
    const { email, senha } = this.state;

    /* Referência do regexEmail para validação: https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail */
    function validateEmail(emailAdress) {
      const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
      return regexEmail.test(emailAdress);
    }

    function validatePassword(password) {
      const minPassword = 6;
      return password.length >= minPassword;
    }
    return (
      <main className="container">
        <div className="screen">
          <div className="logo__icon_wallet">
            <FontAwesomeIcon icon={ faSackDollar } className="logo__icon" />
          </div>
          <h1 className="title">TrybeWallet </h1>
          <div className="screen__content">
            <FontAwesomeIcon icon={ faUser } className="login__icon_user" />
            <div className="login">
              <div className="login__field">
                <label htmlFor="input-email">
                  <input
                    type="email"
                    id="input-email"
                    value={ email }
                    name="email"
                    onChange={ this.handleChange }
                    data-testid="email-input"
                    className="login__input"
                  />
                </label>
                <br />
                <label htmlFor="input-password">
                  <input
                    type="password"
                    id="input-password"
                    value={ senha }
                    name="senha"
                    onChange={ this.handleChange }
                    data-testid="password-input"
                    className="login__input"
                  />
                </label>
                <button
                  type="submit"
                  disabled={ !validateEmail(email) || !validatePassword(senha) }
                  onClick={ this.handleSubmit }
                  className="bttn__submit"
                >
                  Entrar
                </button>
              </div>
            </div>
            <FontAwesomeIcon icon={ faLock } className="login__icon_lock" />
            <h3 className="text-footer">Or login with</h3>
            <footer className="social-login">
              <FontAwesomeIcon icon={ faFacebook } className="social-login__icon" />
              <FontAwesomeIcon icon={ faInstagram } className="social-login__icon" />
              <FontAwesomeIcon icon={ faGithub } className="social-login__icon" />
            </footer>
          </div>
        </div>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  submitLoginAction: (user) => dispatch(submitLogin(user)),
});

Login.propTypes = {
  submitLoginAction: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
