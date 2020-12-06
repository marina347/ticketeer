import LaneTypes from "./lane.types";
import lanes from "./lane.reducer";

const initialState = {
  laneItems: [],
  isLoading: false,
  error: null,
};

const mockLanes = [
  { _id: "1", boardId: "1", name: "Lane 1" },
  { _id: "2", boardId: "1", name: "Lane 2" },
];

const stateWithLanes = {
  isLoading: false,
  error: null,
  laneItems: mockLanes,
};

it("Should return the initial state", () => {
  expect(lanes(undefined, {})).toEqual(initialState);
});

describe("GET LANES", () => {
  it("Should set isLoading to true if is getLanesStart action", () => {
    expect(
      lanes(initialState, { type: LaneTypes.GET_LANES_START }).isLoading
    ).toBe(true);
  });

  it("Should set isLoading to false and set lanes to laneItems if is getLanesSuccess action", () => {
    expect(
      lanes(initialState, {
        type: LaneTypes.GET_LANES_SUCCESS,
        lanes: mockLanes,
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      laneItems: mockLanes,
    });
  });

  it("Should set isLoading to false and set error object if is getLanesFailure action", () => {
    expect(
      lanes(initialState, {
        type: LaneTypes.GET_LANES_FAILURE,
        error: "Error",
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      error: "Error",
    });
  });
});

describe("ADD LANE", () => {
  const mockLane = {
    _id: "3",
    name: "Lane 3",
    boardId: "1",
  };

  it("Should set isLoading to true if is addLaneStart action", () => {
    expect(
      lanes(initialState, { type: LaneTypes.ADD_LANE_START }).isLoading
    ).toBe(true);
  });

  it("Should set isLoading to false and add lane to laneItems if is addLaneSuccess action", () => {
    expect(
      lanes(initialState, {
        type: LaneTypes.ADD_LANE_SUCCESS,
        lane: mockLane,
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      laneItems: [...initialState.laneItems, mockLane],
    });
  });

  it("Should set isLoading to false and set error object if is addLaneFailure action", () => {
    expect(
      lanes(initialState, {
        type: LaneTypes.ADD_LANE_FAILURE,
        error: "Error",
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      error: "Error",
    });
  });
});

describe("DELETE LANE", () => {
  const laneToDelete = {
    _id: "2",
    name: "Lane 2",
    boardId: "2",
  };
  it("Should set isLoading to true if is deleteLaneStart action", () => {
    expect(
      lanes(initialState, { type: LaneTypes.DELETE_LANE_START }).isLoading
    ).toBe(true);
  });

  it("Should set isLoading to false and delete lane from laneItems if is deleteLaneSuccess action", () => {
    expect(
      lanes(stateWithLanes, {
        type: LaneTypes.DELETE_LANE_SUCCESS,
        lane: laneToDelete,
      })
    ).toEqual({
      ...stateWithLanes,
      isLoading: false,
      laneItems: [{ _id: "1", boardId: "1", name: "Lane 1" }],
    });
  });

  it("Should set isLoading to false and set error object if is deleteLaneFailure action", () => {
    expect(
      lanes(initialState, {
        type: LaneTypes.DELETE_LANE_FAILURE,
        error: "Error",
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      error: "Error",
    });
  });
});
