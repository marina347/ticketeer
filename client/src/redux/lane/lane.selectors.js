import { createSelector } from "reselect";

const selectLanes = (state) => state.lanes;

const selectLaneItems = () =>
  createSelector([selectLanes], (lanes) => lanes.laneItems);

export const selectLanesByBoardId = (boardId) => {
  return createSelector([selectLanes], (lanes) =>
    lanes.laneItems.filter((lane) => lane.boardId === boardId)
  );
};

export const selectIsLoading = createSelector(
  [selectLanes],
  (lanes) => lanes.isLoading && lanes.laneItems.length === 0
);

export const selectLaneItemById = (laneId) =>
  createSelector([selectLaneItems], (item) => item._id == laneId);

export const selectTicketsFromLaneItem = (laneId, tickets) =>
  createSelector([selectLaneItemById(laneId)], (lane) =>
    tickets.filter((ticket) => ticket.laneId == laneId)
  );
