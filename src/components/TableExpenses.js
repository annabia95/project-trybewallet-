import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class TableExpenses extends React.Component {
  render() {
    /*     const { expenses } = this.props; */
    return (
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
            <th>Moeda de Conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Linha</td>
            <td>Linha</td>
            <td>Linha</td>
            <td>Linha</td>
            <td>Linha</td>
            <td>Linha</td>
            <td>Linha</td>
            <td>Linha</td>
            <td>Linha</td>
          </tr>
        </tbody>
      </table>

    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

TableExpenses.propTypes = ({
  expenses: PropTypes.arrayOf(PropTypes.any),
}).isRequired;

export default connect(mapStateToProps)(TableExpenses);
