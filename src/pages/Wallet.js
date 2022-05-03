import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../App.css';
import AddExpenseForm from '../components/AddExpenseForm';
import ExpensesTable from '../components/ExpensesTable';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   totalExpenses: 0,
    // };

    this.sumExpenses = this.sumExpenses.bind(this);
  }

  componentDidMount() {
    this.sumExpenses();
  }

  // componentDidUpdate() {
  //   this.sumExpenses();
  // }

  sumExpenses() {
    const { userExpenses } = this.props;
    const sumValues = userExpenses.reduce(
      (acc,
        { value, currency, exchangeRates }) => acc + value * exchangeRates[currency].ask,
      0,
    );

    return sumValues.toFixed(2);
  }

  render() {
    const { userEmail } = this.props;
    // const { totalExpenses } = this.state;
    // console.log(currencyAPI());
    return (
      <div>
        <header className="header">
          <h2>Trybe Wallet</h2>

          <div className="email-expenses-div">
            <h3 data-testid="email-field">
              Email:
              { ` ${userEmail}` }
            </h3>
            <h3>Despesa Total:</h3>
            <h3 data-testid="total-field">
              {` ${this.sumExpenses()} `}
            </h3>
            <h3 data-testid="header-currency-field">BRL</h3>
          </div>
        </header>

        <AddExpenseForm />
        <ExpensesTable />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  userExpenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(Wallet);

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
  userExpenses: PropTypes.number.isRequired,
};
