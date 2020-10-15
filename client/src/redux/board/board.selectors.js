import { createSelector } from "reselect";

const selectBoards = (state) => state.boards;

const selectMembers = (state) => state.user.members;

export const selectBoardsItems = createSelector(
  [selectBoards],
  (boards) => boards.boardItems
);

export const selectBoardsAreLoading = createSelector(
  [selectBoards],
  (boards) => boards.isLoading
);

export const selectBoard = (boardId) => {
  return createSelector([selectBoardsItems], (boards) =>
    boards.find((board) => board._id === boardId)
  );
};

export const selectBoardLink = (boardId) => {
  return createSelector([selectBoard(boardId)], (board) =>
    board.link ? board.link : ""
  );
};

export const selectMembersOfBoard = (boardId) => {
  return createSelector([selectBoard(boardId)], (board) => board.members);
};

export const selectMemberOfBoardByMemberId = (boardId, memberId) => {
  return createSelector([selectMembers], (members) =>
    members.find((member) => member._id == memberId)
  );
};

export const selectTasksFromBoard = (boardId) =>
  createSelector([selectBoard(boardId)], (board) => board.tasks);

export const selectTaskByStatus = (boardId, status) =>
  createSelector([selectTasksFromBoard(boardId)], (tasks) =>
    tasks.filter((task) => task.type === status)
  );

export const selectMemberObjectFromBoard = (boardId, userMembers) => {
  const selector = createSelector([selectMembersOfBoard(boardId)], (members) =>
    members.map((member) =>
      userMembers.find((userMember) => userMember._id == member.member)
    )
  );
  return selector;
};
