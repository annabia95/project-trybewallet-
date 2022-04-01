export const LOGIN = 'LOGIN';
export const GET_CURRENCIES = 'GET_CURRENCIES';

export const submitLogin = (user) => ({ type: LOGIN, user });// Coloque aqui suas actions

export const getCurrencies = (currencies) => ({ type: GET_CURRENCIES, currencies });

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
