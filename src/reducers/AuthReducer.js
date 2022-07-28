import * as actions from "../actions/Type";

const intialState = {
  token: "",
  error: "",
  user: {
    branchId: {
      name: "",
    },
    realEstateId: {
      image: "",
    },
  },
  isAuth: null,
  password_obj_check: {},
  status_check: null,
  rtoken: "",
};
const AuthReducer = (state = intialState, action) => {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        // token: action.payload.token,
        isAuth: true,
      };
    case actions.RTOKEN_SUCCESS:
      return {
        ...state,
        isAuth: true,
      };
    case actions.LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    case actions.LOGOUT_SUCCESS:
      return {
        ...intialState,
      };
    case actions.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case actions.CHANGE_PASSWORD:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case actions.LOST_PASSWORD_CHECK:
      return {
        ...state,
        password_obj_check: action.payload.res,
        status_check: action.payload.status,
      };
    case actions.LOST_PASSWORD_UPDATE:
      return {
        ...state,
      };
    case actions.CHANGE_IMAGE:
      return {
        ...state,
        user: action.payload.user,
      };
    default:
      return { ...state };
  }
};

export default AuthReducer;
