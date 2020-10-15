import UserTypes from "./user.types";

export const signInStart = () => ({
  type: UserTypes.SIGN_IN_START,
});

export const signInSuccess = (currentUser) => ({
  type: UserTypes.SIGN_IN_SUCCESS,
  currentUser,
});

export const signInFailure = (error) => ({
  type: UserTypes.SIGN_IN_FAILURE,
  error,
});

export const signOutStart = () => ({
  type: UserTypes.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
  type: UserTypes.SIGN_OUT_SUCCESS,
});

export const signOutFailure = (error) => ({
  type: UserTypes.SIGN_OUT_FAILURE,
  error,
});

export const getTokenStart = () => ({
  type: UserTypes.GET_TOKEN_START,
});

export const getTokenSuccess = (token) => ({
  type: UserTypes.GET_TOKEN_SUCCESS,
  token,
});

export const getTokenFailure = (error) => ({
  type: UserTypes.GET_TOKEN_FAILURE,
  error,
});

export const removeTokenStart = () => ({
  type: UserTypes.REMOVE_TOKEN_START,
});

export const removeTokenSuccess = () => ({
  type: UserTypes.REMOVE_TOKEN_SUCCESS,
});

export const removeTokenFailure = (error) => ({
  type: UserTypes.REMOVE_TOKEN_FAILURE,
  error,
});

export const setLandingPage = (landingPage) => ({
  type: UserTypes.SET_LANDING_PAGE,
  landingPage,
});

export const unsetLandingPage = () => ({
  type: UserTypes.UNSET_LANDING_PAGE,
});

export const signInStartAsync = (user, history) => {
  return async (dispatch) => {
    dispatch(signInStart());
    try {
      dispatch(
        signInSuccess({
          id: user.googleId,
          name: user.name,
          email: user.email,
        })
      );
      try {
        history.push("/home");
      } catch (error) {}
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };
};

export const getTokenAsync = (user, history, tokenId) => {
  return async (dispatch) => {
    dispatch(getTokenStart());
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ googleToken: tokenId }),
      };
      const response = await fetch(
        `http://localhost:3001/users/googleAuth`,
        requestOptions
      );
      const jsonResponse = await response.json();
      dispatch(getTokenSuccess(jsonResponse.token));
      dispatch(signInStartAsync(user, history));
    } catch (error) {
      dispatch(getTokenFailure(error));
    }
  };
};

export const removeTokenAsync = (token, history) => {
  return async (dispatch) => {
    dispatch(removeTokenStart());
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ token }),
      };
      const response = await fetch(
        `http://localhost:3001/users/logout`,
        requestOptions
      );
      if (response.status !== 200) {
        return dispatch(removeTokenFailure());
      }
      dispatch(removeTokenSuccess());
      history.push("/login");
    } catch (error) {
      dispatch(removeTokenFailure(error));
    }
  };
};
