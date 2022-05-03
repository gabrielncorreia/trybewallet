import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { addExpense, currencyAPI } from '../actions/index';
import PaymentMethod from './PaymentMethod';
import Tags from './Tags';
import Currency from './Currency';
import '../App.css';

const initialState = {
  value: 0,
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  exchangeRates: {},
};

class AddExpenseForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...initialState,
    };

    this.handleChange = this.handleChange.bind(this);
    this.saveExpenses = this.saveExpenses.bind(this);
  }

  async componentDidMount() {
    // await currencyAPI();

    // console.log('chamou 1');
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  async saveExpenses() {
    const { saveExpense } = this.props;
    const exchangeRates = await currencyAPI();
    const expense = {
      ...this.state,
      exchangeRates,
    };

    saveExpense(expense);

    // console.log('chamou 2');
    this.setState({ ...initialState });
  }

  render() {
    // this.saveExpenses();
    const { value, description } = this.state;
    return (
      <div className="add-expense-div">
        <label htmlFor="value">
          Valor:
          <input
            type="number"
            name="value"
            value={ value }
            data-testid="value-input"
            onChange={ this.handleChange }
          />
        </label>
        <Currency handleChange={ this.handleChange } />
        <PaymentMethod handleChange={ this.handleChange } />
        <Tags handleChange={ this.handleChange } />
        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            name="description"
            value={ description }
            data-testid="description-input"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          onClick={ () => {
            this.saveExpenses();
          } }
        >
          Adicionar Despesa
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveExpense: (expenses) => dispatch(addExpense(expenses)),
});

export default connect(null, mapDispatchToProps)(AddExpenseForm);

AddExpenseForm.propTypes = {
  saveExpense: propTypes.func.isRequired,
};
