import { toast } from "react-toastify";
import React from "react";

import BoardTypes from "./board.types";
import EnvVariables from "../../env-variables";
import { removeError } from "../common";
import ErrorMessages from "../../utils/error-messages";
import FormButton from "../../components/form-button/form-button.component";

export const getBoardsStart = () => ({
  type: BoardTypes.GET_BOARDS_START,
});

export const getBoardsSuccess = (boards) => ({
  type: BoardTypes.GET_BOARDS_SUCCESS,
  boards,
});

export const getBoardsFailure = (error) => ({
  type: BoardTypes.GET_BOARDS_FAILURE,
  error,
});

export const addBoardStart = () => ({
  type: BoardTypes.ADD_BOARD_START,
});

export const addBoardSuccess = (board) => ({
  type: BoardTypes.ADD_BOARD_SUCCESS,
  board,
});

export const addBoardFailure = (error) => ({
  type: BoardTypes.ADD_BOARD_FAILURE,
  error,
});

export const getTokenStart = () => ({
  type: BoardTypes.GET_TOKEN_START,
});

export const getTokenSuccess = (token) => ({
  type: BoardTypes.GET_TOKEN_SUCCESS,
  token,
});

export const getTokenFailure = (error) => ({
  type: BoardTypes.GET_TOKEN_FAILURE,
  error,
});

export const generateHashedBoardIdStart = () => ({
  type: BoardTypes.GENERATE_HASHED_BOARD_ID_START,
});

export const generateHashedBoardIdSuccess = (boardId, link) => ({
  type: BoardTypes.GENERATE_HASHED_BOARD_ID_SUCCESS,
  boardId,
  link,
});

export const generateHashedBoardIdFailure = (error) => ({
  type: BoardTypes.GENERATE_HASHED_BOARD_ID_FAILURE,
  error,
});

export const joinBoardStart = () => ({
  type: BoardTypes.JOIN_BOARD_START,
});

export const joinBoardSuccess = (board) => ({
  type: BoardTypes.JOIN_BOARD_SUCCESS,
  board,
});

export const joinBoardFailure = (error) => ({
  type: BoardTypes.JOIN_BOARD_FAILURE,
  error,
});

export const fetchBoardMembersStart = () => ({
  type: BoardTypes.FETCH_BOARD_MEMBERS_START,
});

export const fetchBoardMembersSuccess = (boardId, members) => ({
  type: BoardTypes.FETCH_BOARD_MEMBERS_SUCCESS,
  boardId,
  members,
});

export const fetchBoardMembersFailure = (error) => ({
  type: BoardTypes.FETCH_BOARD_MEMBERS_FAILURE,
  error,
});

export const getBoardsAsync = (token) => {
  return async (dispatch) => {
    dispatch(getBoardsStart());
    try {
      const requestOptions = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(
        `${EnvVariables.REACT_APP_SERVER_PATH}/boards`,
        requestOptions
      );
      const responseJson = await response.json();
      dispatch(getBoardsSuccess(responseJson.boards));
    } catch (error) {
      dispatch(getBoardsFailure(error.message));
    }
  };
};

export const addBoardAsync = (boardItem, token) => {
  return async (dispatch) => {
    dispatch(addBoardStart());
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...boardItem }),
      };
      const response = await fetch(
        `${EnvVariables.REACT_APP_SERVER_PATH}/boards`,
        requestOptions
      );
      const board = await response.json();
      dispatch(addBoardSuccess(board));
    } catch (error) {
      dispatch(addBoardFailure(error.message));
      toast.error(ErrorMessages.ADD_BOARD_ERROR_MESSAGE, {
        autoClose: false,
        closeButton: <FormButton className="btn btn-notification" onClick={() => dispatch(removeError())}>X</FormButton>,
      });
    }
  };
};

export const generateHashedBoardIdAsync = (boardId, token) => {
  return async (dispatch) => {
    dispatch(generateHashedBoardIdStart());
    try {
      const requestOptions = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(
        `${EnvVariables.REACT_APP_SERVER_PATH}/boards/make-invite/${boardId}`,
        requestOptions
      );
      const jsonResponse = await response.json();
      dispatch(
        generateHashedBoardIdSuccess(boardId, jsonResponse.hashedBoardId)
      );
    } catch (error) {
      dispatch(generateHashedBoardIdFailure(error.message));
      toast.error(ErrorMessages.GENERATE_INVITATION_LINK_ERROR_MESSAGE, {
        autoClose: false,
        closeButton: <FormButton className="btn btn-notification" onClick={() => dispatch(removeError())}>X</FormButton>,
      });
    }
  };
};

export const joinBoardAsync = (hashedBoardId, token) => {
  return async (dispatch) => {
    dispatch(joinBoardStart());
    try {
      const requestOptions = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(
        `${EnvVariables.REACT_APP_SERVER_PATH}/boards/join-board/${hashedBoardId}`,
        requestOptions
      );
      const jsonResponse = await response.json();
      dispatch(joinBoardSuccess(jsonResponse.board));
    } catch (error) {
      dispatch(joinBoardFailure(error.message));
      toast.error(ErrorMessages.JOIN_BOARD_ERROR_MESSAGE, {
        autoClose: false,
        closeButton: <FormButton className="btn btn-notification" onClick={() => dispatch(removeError())}>X</FormButton>,
      });
    }
  };
};

export const fetchBoardMembersAsync = (boardId, token) => {
  return async (dispatch) => {
    dispatch(fetchBoardMembersStart());
    try {
      const requestOptions = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(
        `${EnvVariables.REACT_APP_SERVER_PATH}/boards/${boardId}/members`,
        requestOptions
      );
      const jsonResponse = await response.json();
      dispatch(fetchBoardMembersSuccess(boardId, jsonResponse.members));
    } catch (error) {
      dispatch(fetchBoardMembersFailure(error.message));
    }
  };
};
