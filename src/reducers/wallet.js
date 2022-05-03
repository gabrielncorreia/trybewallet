// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

// const initialState = {
//   user: {
//     email: '',
//   },
//   wallet: {
//     currencies: [],
//     expenses: [],
//   },
// };
const initialState = {
  currencies: [],
  expenses: [],
};

function walletReducer(state = initialState, action) {
  switch (action.type) {
  case 'ADD_CURRENCIES':
    return {
      ...state,
      currencies: action.currencies,
    };
  case 'ADD_EXPENSE':
    return {
      ...state,
      expenses: [
        ...state.expenses,
        { id: state.expenses.length, ...action.expenses },
      ],
    };
  default:
    return state;
  }
}

export default walletReducer;
