import * as actions from "../actions/Type";
const intialState = {
  transactions: [],
};
const TransactionReducer = (state = intialState, action) => {
  switch (action.type) {
    case actions.ADD_TRANSACTION:
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };

    case actions.GET_LIST_TRANSACTION:
      return {
        ...state,
        transactions: action.payload,
      };

    default:
      return { ...state };
  }
};

export default TransactionReducer;
