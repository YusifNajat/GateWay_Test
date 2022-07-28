import { combineReducers } from "redux";
import TransactionReducer from "./TransactionReducer";
const RootReducer = combineReducers({
  TransactionReducer,
});

export default RootReducer;
