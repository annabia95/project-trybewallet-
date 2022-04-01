import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { fetchAPI } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { fetchAPIaction } = this.props;
    fetchAPIaction();
  }

  render() {
    const { currencies } = this.props;
    return (
      <div>
        <h1>TrybeWallet</h1>
        <Header />
        <form>
          <label htmlFor="value">
            Valor:
            <input type="text" id="value" data-testid="value-input" />
          </label>
          <label htmlFor="description">
            Descrição:
            <input type="text" id="description" data-testid="description-input" />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select id="currency" data-testid="currency-input">
              { currencies.map((item) => <option key={ item }>{item}</option>) }
            </select>
          </label>
          <label htmlFor="payment">
            Método de pagamento:
            <select id="payment" data-testid="method-input">
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag:
            <select id="tag" data-testid="tag-input">
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
        </form>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAPIaction: () => dispatch(fetchAPI()),
});

Wallet.propTypes = {
  fetchAPIaction: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
