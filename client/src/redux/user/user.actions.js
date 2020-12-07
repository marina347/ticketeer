import UserTypes from "./user.types";
import EnvVariables from "../../env-variables";
import { toast } from "react-toastify";
import React from "react";
import CloseButton from "../../components/close-button/close-button.component";
import { removeError } from "../common";

export const signIn = (currentUser) => ({
  type: UserTypes.SIGN_IN,
  currentUser,
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

export const getTokenAsync = (history, tokenId) => {
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
        `${EnvVariables.REACT_APP_SERVER_PATH}/users/googleAuth`,
        requestOptions
      );

      const jsonResponse = await response.json();
      dispatch(getTokenSuccess(jsonResponse.token));
      const user = jsonResponse.user;
      dispatch(
        signIn({
          _id: user._id,
          id: user.sub,
          name: user.name,
          email: user.email,
        })
      );
      history.push("/home");
    } catch (error) {
      dispatch(getTokenFailure(error.message));
      toast.error(error.message, {
        autoClose: false,
        closeButton: <CloseButton action={() => dispatch(removeError())} />,
      });
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
        `${EnvVariables.REACT_APP_SERVER_PATH}/users/logout`,
        requestOptions
      );
      dispatch(removeTokenSuccess());
      history.push("/login");
    } catch (error) {
      dispatch(removeTokenFailure(error.message));
      toast.error(error.message, {
        autoClose: false,
        closeButton: <CloseButton action={() => dispatch(removeError())} />,
      });
    }
  };
};
