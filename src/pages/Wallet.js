import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../components/HeaderStyle.css';
import Header from '../components/Header';
import { fetchAPI, fetchExpenses } from '../actions';
import TableExpenses from '../components/TableExpenses';
import './WalletStyle.css';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentaçao',
    };
    this.handleChange = this.handleChange.bind(this);
    this.sendExpensesToState = this.sendExpensesToState.bind(this);
  }

  componentDidMount() {
    const { fetchAPIaction } = this.props;
    fetchAPIaction();
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  sendExpensesToState() {
    const { fetchExpensesAction } = this.props;
    fetchExpensesAction(this.state);
    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    }));
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        <Header />
        <form className="form">
          <label htmlFor="value" className="input-form">
            Valor:
            <input
              type="text"
              id="value"
              data-testid="value-input"
              name="value"
              value={ value }
              onChange={ this.handleChange }
              className="input-value"
            />
          </label>
          <label htmlFor="description" className="input-form">
            Descrição:
            <input
              type="text"
              id="description"
              data-testid="description-input"
              name="description"
              value={ description }
              onChange={ this.handleChange }
              className="input-value"
            />
          </label>
          <label htmlFor="currency" className="input-form">
            Moeda:
            <select
              id="currency"
              data-testid="currency-input"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
              className="input-value"
            >
              { currencies.map((coin) => <option key={ coin }>{coin}</option>) }
            </select>
          </label>
          <label htmlFor="payment" className="input-form">
            Método de pagamento:
            <select
              id="payment"
              data-testid="method-input"
              name="method"
              value={ method }
              onChange={ this.handleChange }
              className="input-value"
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag" className="input-form">
            Tag:
            <select
              id="tag"
              data-testid="tag-input"
              name="tag"
              value={ tag }
              onChange={ this.handleChange }
              className="input-value"
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <button type="button" onClick={ this.sendExpensesToState } className="bttn-add">
            Adicionar despesa
          </button>
        </form>
        <TableExpenses />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAPIaction: () => dispatch(fetchAPI()),
  fetchExpensesAction: (expenses) => dispatch(fetchExpenses(expenses)),
});

Wallet.propTypes = {
  fetchAPIaction: PropTypes.func.isRequired,
  fetchExpensesAction: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
