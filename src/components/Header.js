import { faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import './HeaderStyle.css';

class Header extends React.Component {
  render() {
    const { email, expenses } = this.props;
    const totalExpenses = expenses.reduce((acc, curr) => (
      acc + parseFloat(curr.value) * parseFloat(curr.exchangeRates[curr.currency].ask)
    ), 0);
    return (
      <header className="header">
        <div className="header-itens">
          <div className="header-logo">
            <FontAwesomeIcon icon={ faWallet } className="header-icon" />
            <h2>TrybeWallet</h2>
          </div>
          <span className="header-item-email">Email:</span>
          <span data-testid="email-field" className="header-input-email">
            { email }
          </span>
          <span className="header-item-despesa">Despesas:</span>
          <span data-testid="total-field">
            {
              !totalExpenses
                ? `${0}`
                : `${totalExpenses.toFixed(2)}`
            }
          </span>
          <span data-testid="header-currency-field">
            BRL
          </span>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = ({
  email: PropTypes.string,
  expenses: PropTypes.arrayOf(PropTypes.any),
}).isRequired;
export default connect(mapStateToProps)(Header);
