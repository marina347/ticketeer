import LaneTypes from "./lane.types";
import * as laneActions from "./lane.actions";

const mockLane = {
  _id: "1",
  name: "Lane 1",
  boardId: "1",
};

const mockLanes = [mockLane, { _id: "2", name: "Lane 2", boardId: "1" }];

describe("ADD LANE ACTIONS", () => {
  it("Should create the addLaneStart action", () => {
    expect(laneActions.addLaneStart().type).toEqual(LaneTypes.ADD_LANE_START);
  });

  it("Should create the addLaneSuccess action", () => {
    const action = laneActions.addLaneSuccess(mockLane);
    expect(action.type).toEqual(LaneTypes.ADD_LANE_SUCCESS);
    expect(action.lane).toEqual(mockLane);
  });

  it("Should create the addLaneFailure action", () => {
    const action = laneActions.addLaneFailure("Error");
    expect(action.type).toEqual(LaneTypes.ADD_LANE_FAILURE);
    expect(action.error).toEqual("Error");
  });

  it("Should create addLaneAsync action", () => {
    const mockActionCreator = laneActions.addLaneAsync();
    const mockDispatch = jest.fn();
    mockActionCreator(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(laneActions.addLaneStart());
  });
});

describe("GET LANES ACTIONS", () => {
  it("Should create the getLanesStart action", () => {
    expect(laneActions.getLanesStart().type).toEqual(LaneTypes.GET_LANES_START);
  });

  it("Should create the getLanesSuccess action", () => {
    const action = laneActions.getLanesSuccess(mockLanes);
    expect(action.type).toEqual(LaneTypes.GET_LANES_SUCCESS);
    expect(action.lanes).toEqual(mockLanes);
  });

  it("Should create the getLanesFailure action", () => {
    const action = laneActions.getLanesFailure("Error");
    expect(action.type).toEqual(LaneTypes.GET_LANES_FAILURE);
    expect(action.error).toEqual("Error");
  });

  it("Should create getLanesAsync action", () => {
    const mockActionCreator = laneActions.getLanesAsync();
    const mockDispatch = jest.fn();
    mockActionCreator(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(laneActions.getLanesStart());
  });
});

describe("DELETE LANE ACTIONS", () => {
  it("Should create the deleteLaneStart action", () => {
    expect(laneActions.deleteLaneStart().type).toEqual(
      LaneTypes.DELETE_LANE_START
    );
  });

  it("Should create the deleteLaneSuccess action", () => {
    const action = laneActions.deleteLaneSuccess(mockLane);
    expect(action.type).toEqual(LaneTypes.DELETE_LANE_SUCCESS);
    expect(action.lane).toEqual(mockLane);
  });

  it("Should create the deleteLaneFailure action", () => {
    const action = laneActions.deleteLaneError("Error");
    expect(action.type).toEqual(LaneTypes.DELETE_LANE_FAILURE);
    expect(action.error).toEqual("Error");
  });

  it("Should create deleteLaneAsync action", () => {
    const mockActionCreator = laneActions.deleteLaneAsync();
    const mockDispatch = jest.fn();
    mockActionCreator(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(laneActions.deleteLaneStart());
  });
});
