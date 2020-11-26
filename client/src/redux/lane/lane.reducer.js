import LanesTypes from "./lane.types";

const INITIAL_STATE = {
  laneItems: [],
  error: null,
  isLoading: false,
};

const lanes = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LanesTypes.GET_LANES_START:
    case LanesTypes.ADD_LANE_START:
    case LanesTypes.DELETE_LANE_START:
      return { ...state, isLoading: true };
    case LanesTypes.GET_LANES_SUCCESS:
      return {
        ...state,
        laneItems: action.lanes,
        error: null,
        isLoading: false,
      };
    case LanesTypes.ADD_LANE_SUCCESS:
      return {
        ...state,
        laneItems: [...state.laneItems, action.lane],
        error: null,
        isLoading: false,
      };
    case LanesTypes.DELETE_LANE_SUCCESS:
      return {
        ...state,
        laneItems: state.laneItems.filter(
          (laneItem) => laneItem._id !== action.lane._id
        ),
        error: null,
        isLoading: false,
      };
    case LanesTypes.ADD_LANE_FAILURE:
    case LanesTypes.GET_LANES_FAILURE:
    case LanesTypes.DELETE_LANE_FAILURE:
      return { ...state, isLoading: false, error: action.error };
    case LanesTypes.CLEAR_LANES:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default lanes;
