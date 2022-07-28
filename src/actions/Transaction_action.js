import * as actions from "./Type";
import Instance from "../util/Instance";
import swal from "sweetalert";
import "react-toastify/dist/ReactToastify.css";

export const Add_Transaction = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: actions.ADD_TRANSACTION,
        payload: data,
      });
    } catch (error) {
      alert(`error of Creating Transaction`);
    }
  };
};

export const Get_List_Transactions = () => {
  return async (dispatch) => {
    try {
      let data = JSON.parse(localStorage.getItem("data"));
      dispatch({
        type: actions.GET_LIST_TRANSACTION,
        payload: data,
      });
    } catch (error) {
      alert(`error of get List Transactions`);
    }
  };
};
