import LanesTypes from "./lane.types";

export const getLanesStart = () => ({
  type: LanesTypes.GET_LANES_START,
});

export const getLanesSuccess = (lanes) => ({
  type: LanesTypes.GET_LANES_SUCCESS,
  lanes,
});

export const getLanesFailure = (error) => ({
  type: LanesTypes.GET_LANES_FAILURE,
  error,
});

export const clearLanes = () => ({
  type: LanesTypes.CLEAR_LANES,
});

export const addLaneStart = () => ({
  type: LanesTypes.ADD_LANE_START,
});

export const addLaneSuccess = (lane) => ({
  type: LanesTypes.ADD_LANE_SUCCESS,
  lane,
});

export const addLaneFailure = (error) => ({
  type: LanesTypes.ADD_LANE_FAILURE,
  error,
});

export const deleteLaneStart = () => ({
  type: LanesTypes.DELETE_LANE_START,
});

export const deleteLaneSuccess = (lane) => ({
  type: LanesTypes.DELETE_LANE_SUCCESS,
  lane,
});

export const deleteLaneError = (error) => ({
  type: LanesTypes.DELETE_LANE_ERROR,
  error,
});

export const getLanesAsync = (boardId, token) => {
  return async (dispatch) => {
    dispatch(getLanesStart());
    try {
      const requestOptions = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(
        `http://localhost:3001/lanes/${boardId}`,
        requestOptions
      );

      const responseJson = await response.json();
      dispatch(getLanesSuccess(responseJson.lanes));
    } catch (error) {
      dispatch(getLanesFailure(error));
    }
  };
};

export const addLaneAsync = (name, boardId, token) => {
  return async (dispatch) => {
    dispatch(addLaneStart());
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: name, boardId: boardId }),
      };
      const response = await fetch(
        `http://localhost:3001/lanes`,
        requestOptions
      );
      const jsonResponse = await response.json();
      dispatch(addLaneSuccess(jsonResponse.lane));
    } catch (error) {
      dispatch(addLaneFailure(error));
    }
  };
};

export const deleteLaneAsync = (laneId, token) => {
  return async (dispatch) => {
    dispatch(deleteLaneStart());
    try {
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(
        `http://localhost:3001/lanes/${laneId}`,
        requestOptions
      );
      const jsonResponse = await response.json();
      dispatch(deleteLaneSuccess(jsonResponse.lane));
    } catch (error) {
      dispatch(deleteLaneError(error));
    }
  };
};
