import { toast } from "react-toastify";
import React from "react";

import TicketTypes from "./ticket.types";
import EnvVariables from "../../env-variables";
import { removeError } from "../common";
import ErrorMessages from "../../utils/error-messages";
import FormButton from "../../components/form-button/form-button.component";

export const getTicketsStart = () => ({
  type: TicketTypes.GET_TICKETS_START,
});

export const getTicketsSuccess = (tickets) => ({
  type: TicketTypes.GET_TICKETS_SUCCESS,
  tickets,
});

export const getTicketsFailure = (error) => ({
  type: TicketTypes.GET_TICKETS_FAILURE,
  error,
});

export const updateTicketStart = () => ({
  type: TicketTypes.UPDATE_TICKET_START,
});

export const updateTicketSuccess = (ticket) => ({
  type: TicketTypes.UPDATE_TICKET_SUCCESS,
  ticket,
});

export const updateTicketFailure = (error) => ({
  type: TicketTypes.UPDATE_TICKET_FAILURE,
  error,
});

export const addTicketStart = () => ({
  type: TicketTypes.ADD_TICKET_START,
});

export const addTicketSuccess = (ticket) => ({
  type: TicketTypes.ADD_TICKET_SUCCESS,
  ticket,
});

export const addTicketFailure = (error) => ({
  type: TicketTypes.ADD_TICKET_FAILURE,
  error,
});

export const getTicketsAsync = (boardId, token) => {
  return async (dispatch) => {
    dispatch(getTicketsStart());
    try {
      const requestOptions = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(
        `${EnvVariables.REACT_APP_SERVER_PATH}/tickets/${boardId}`,
        requestOptions
      );
      const tickets = await response.json();
      dispatch(getTicketsSuccess(tickets));
    } catch (error) {
      dispatch(getTicketsFailure(error.message));
    }
  };
};

export const updateTicketAsync = (ticket, token) => {
  return async (dispatch) => {
    dispatch(updateTicketStart());
    try {
      const requestOptions = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: ticket.name,
          description: ticket.description,
          assigners: ticket.assigners,
          laneId: ticket.laneId,
          tags: ticket.tags,
        }),
      };
      const response = await fetch(
        `${EnvVariables.REACT_APP_SERVER_PATH}/tickets/${ticket._id}`,
        requestOptions
      );
      const responseJson = await response.json();
      dispatch(updateTicketSuccess(responseJson.ticket));
    } catch (error) {
      dispatch(updateTicketFailure(error.message));
      toast.error(ErrorMessages.UPDATE_TICKET_ERROR_MESSAGE, {
        autoClose: false,
        closeButton: <FormButton className="btn btn-notification" onClick={() => dispatch(removeError())}>X</FormButton>,
      });
    }
  };
};

export const addTicketAsync = (ticket, token) => {
  return async (dispatch) => {
    dispatch(addTicketStart());
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: ticket.name,
          laneId: ticket.laneId,
          tags: ticket.tags,
        }),
      };
      const response = await fetch(
        `${EnvVariables.REACT_APP_SERVER_PATH}/tickets`,
        requestOptions
      );
      const responseJson = await response.json();
      dispatch(addTicketSuccess(responseJson.ticket));
    } catch (error) {
      dispatch(addTicketFailure(error.message));
      toast.error(ErrorMessages.ADD_TICKET_ERROR_MESSAGE, {
        autoClose: false,
        closeButton: <FormButton className="btn btn-notification" onClick={() => dispatch(removeError())}>X</FormButton>,
      });
    }
  };
};
