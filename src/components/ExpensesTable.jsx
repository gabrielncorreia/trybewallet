import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ExpensesTableHeader from './ExpensesTableHeader';
import '../App.css';

class ExpensesTable extends Component {
  constructor(props) {
    super(props);

    this.initialsToExtensive = this.initialsToExtensive.bind(this);
    this.toFixed = this.toFixed.bind(this);
  }

  initialsToExtensive(initial) {
    const initials = {
      USD: 'Dólar Comercial',
      CAD: 'Dólar Canadense',
      GBP: 'Libra Esterlina',
      ARS: 'Peso Argentino',
      BTC: 'Bitcoin',
      LTC: 'LiteCoin',
      EUR: 'Euro',
      JPY: 'Iene Japonês',
      CHF: 'Franco Suíço',
      AUD: 'Dólar Australiano',
    };

    return initials[initial];
  }

  toFixed(value) {
    return Number(value).toFixed(2);
  }

  render() {
    const { getExpenses } = this.props;
    console.log(getExpenses);
    return (
      <div>
        <table className="table-header-div">
          <ExpensesTableHeader />
          { getExpenses.map((exp) => (
            <tr key={ exp.id } id="expenses-tr-div">
              <td>{ exp.description }</td>
              <td>{ exp.tag }</td>
              <td>{ exp.method }</td>
              <td>{ exp.value }</td>
              <td>{ this.initialsToExtensive(exp.currency) }</td>
              <td>{ this.toFixed(exp.exchangeRates[exp.currency].ask) }</td>
              <td>{ this.toFixed(exp.value * exp.exchangeRates[exp.currency].ask) }</td>
              <td>Real</td>
              <td>Botão</td>
            </tr>
          )) }
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getExpenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(ExpensesTable);

ExpensesTable.propTypes = {
  getExpenses: PropTypes.func.isRequired,
};
