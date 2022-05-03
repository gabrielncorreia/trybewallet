import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { addUserEmail } from '../actions';
import '../App.css';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isButtonDisabled: true,
      redirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    // this.validatingLogin = this.validatingLogin(this);
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    }, () => {
      // Login validation:
      const { email, password } = this.state;
      const minValue = 6;
      // Source: https://www.w3resource.com/javascript/form/email-validation.php
      const validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

      this.setState({
        isButtonDisabled: !(validEmail.test(email) && password.length >= minValue), // Se as duas condições forem verdadeiras, a negação dela será igual a false, habilitando, assim, o botão.
      });
    });
  }

  render() {
    const { isButtonDisabled, redirect, email } = this.state;
    const { dispatchUserEmail } = this.props;
    return (
      <div className="login-div">
        <div className="login-fieldset">
          <h1>Login page</h1>
          <form className="form-div">
            <label htmlFor="email">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                data-testid="email-input"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="password">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                data-testid="password-input"
                onChange={ this.handleChange }
              />
            </label>

            <button
              type="button"
              disabled={ isButtonDisabled }
              onClick={ () => {
                dispatchUserEmail(email);
                this.setState({ redirect: true });
              } }
            >
              Entrar
            </button>
          </form>
        </div>
        { redirect ? <Redirect to="/carteira" /> : null}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchUserEmail: (email) => dispatch(addUserEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  dispatchUserEmail: PropTypes.func.isRequired,
};
