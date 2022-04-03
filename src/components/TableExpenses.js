import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { deleteExpenses } from '../actions';

class TableExpenses extends React.Component {
  constructor() {
    super();
    this.bttnDelete = this.bttnDelete.bind(this);
  }

  /* Referência para o slice(): https://www.w3schools.com/jsref/jsref_slice_array.asp */
  bttnDelete() {
    const { deleteExpensesAction, expenses } = this.props;
    const remove = expenses.slice(1);
    return (deleteExpensesAction(remove));
  }

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <caption>Minhas Despesas</caption>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { expenses.map((exp) => (
              <tr key={ exp.id }>
                <td>{ exp.description }</td>
                <td>{ exp.tag }</td>
                <td>{ exp.method }</td>
                <td>{ parseFloat(exp.value).toFixed(2) }</td>
                <td>{ (exp.exchangeRates[exp.currency].name) }</td>
                <td>{ parseFloat(exp.exchangeRates[exp.currency].ask).toFixed(2) }</td>
                <td>
                  { (parseFloat(exp.exchangeRates[exp.currency]
                    .ask) * exp.value).toFixed(2) }
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.bttnDelete() }

                  >
                    Excluir
                  </button>
                </td>
              </tr>
            )) }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpensesAction: (expenses) => dispatch(deleteExpenses(expenses)),
});

TableExpenses.propTypes = ({
  expenses: PropTypes.arrayOf(PropTypes.any),
}).isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(TableExpenses);
