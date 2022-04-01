export const LOGIN = 'LOGIN';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const GET_EXPENSES = 'GET_EXPENSES';

export const submitLogin = (user) => ({ type: LOGIN, user });// Coloque aqui suas actions

export const getCurrencies = (currencies) => ({ type: GET_CURRENCIES, currencies });

export const getExpenses = (expenses) => ({ type: GET_EXPENSES, expenses });

export const fetchAPI = () => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const objectKeys = Object.keys(data).filter((item) => item !== 'USDT');
    return dispatch(getCurrencies(objectKeys));
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchExpenses = (expenses) => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    expenses.exchangeRates = data;
    dispatch(getExpenses(expenses));
  } catch (error) {
    console.log(error.message);
  }
};
