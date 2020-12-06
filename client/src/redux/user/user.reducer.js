import UserTypes from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  error: null,
  isLoading: false,
  token: null,
  landingPage: "",
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserTypes.SIGN_OUT_START:
    case UserTypes.GET_TOKEN_START:
    case UserTypes.REMOVE_TOKEN_START:
      return { ...state, isLoading: true };
    case UserTypes.SIGN_IN:
      return {
        ...state,
        currentUser: action.currentUser,
      };
    case UserTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        error: null,
        isLoading: false,
      };
    case UserTypes.GET_TOKEN_SUCCESS:
      return {
        ...state,
        error: null,
        isLoading: false,
        token: action.token,
      };
    case UserTypes.REMOVE_TOKEN_SUCCESS:
      return {
        ...state,
        currentUser: null,
        token: null,
      };
    case UserTypes.SET_LANDING_PAGE:
      return {
        ...state,
        landingPage: action.landingPage,
      };
    case UserTypes.UNSET_LANDING_PAGE:
      return {
        ...state,
        landingPage: "",
      };
    case UserTypes.SIGN_OUT_FAILURE:
    case UserTypes.GET_TOKEN_FAILURE:
    case UserTypes.REMOVE_TOKEN_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default user;
