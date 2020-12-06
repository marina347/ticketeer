import BoardTypes from "./board.types";
import boards from "./board.reducer";

const initialState = {
  boardItems: [],
  isLoading: false,
  error: null,
};

const mockBoards = [
  { _id: "1", name: "Board1", description: "Description 1" },
  { _id: "2", name: "Board 2", description: "Description 2" },
];

const mockBoardsWithBoardTwoLink = [
  { _id: "1", name: "Board1", description: "Description 1" },
  { _id: "2", name: "Board 2", description: "Description 2", link: "link" },
];

const stateWithBoards = {
  isLoading: false,
  error: null,
  boardItems: mockBoards,
};

const mockBoardsWithMemberThreeInFirstBoard = [
  {
    _id: "1",
    name: "Board1",
    description: "Description 1",
    members: [1, 2, 3],
  },
  { _id: "2", name: "Board 2", description: "Description 2" },
];

it("Should return the initial state", () => {
  expect(boards(undefined, {})).toEqual(initialState);
});

describe("ADD BOARD", () => {
  it("Should set isLoading to true if is addBoardsStart action", () => {
    expect(
      boards(initialState, { type: BoardTypes.ADD_BOARD_START }).isLoading
    ).toBe(true);
  });

  it("Should set isLoading to false and add board to boardItems if is addBoardsSuccess action", () => {
    const mockBoard = {
      _id: "1",
      name: "Board1",
      description: "Description 1",
    };
    expect(
      boards(initialState, {
        type: BoardTypes.ADD_BOARD_SUCCESS,
        board: mockBoard,
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      boardItems: [...initialState.boardItems, mockBoard],
    });
  });

  it("Should set isLoading to false and set error object if is addBoardsFailure action", () => {
    expect(
      boards(initialState, {
        type: BoardTypes.ADD_BOARD_FAILURE,
        error: "Error",
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      error: "Error",
    });
  });
});

describe("GET BOARDS", () => {
  it("Should set isLoading to true if is getBoardsStart action", () => {
    expect(
      boards(initialState, { type: BoardTypes.GET_BOARDS_START }).isLoading
    ).toBe(true);
  });

  it("Should set isLoading to false and set boards to boardItems if is getBoardsSuccess action", () => {
    expect(
      boards(initialState, {
        type: BoardTypes.GET_BOARDS_SUCCESS,
        boards: mockBoards,
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      boardItems: mockBoards,
    });
  });

  it("Should set isLoading to false and set error object if is getBoardsFailure action", () => {
    expect(
      boards(initialState, {
        type: BoardTypes.GET_BOARDS_FAILURE,
        error: "Error",
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      error: "Error",
    });
  });
});

describe("GENERATE HASHED BOARD ID", () => {
  it("Should set isLoading to true if is generateHashedBoardIdStart action", () => {
    expect(
      boards(initialState, { type: BoardTypes.GENERATE_HASHED_BOARD_ID_START })
        .isLoading
    ).toBe(true);
  });

  it("Should set isLoading to false and set board link in boardItems if is generateHashedBoardIdSuccess action", () => {
    expect(
      boards(stateWithBoards, {
        type: BoardTypes.GENERATE_HASHED_BOARD_ID_SUCCESS,
        boardId: "2",
        link: "link",
      })
    ).toEqual({
      ...stateWithBoards,
      isLoading: false,
      boardItems: mockBoardsWithBoardTwoLink,
    });
  });

  it("Should set isLoading to false and set error object if is generateHashedBoardIdFailure action", () => {
    expect(
      boards(initialState, {
        type: BoardTypes.GENERATE_HASHED_BOARD_ID_FAILURE,
        error: "Error",
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      error: "Error",
    });
  });
});

describe("FETCH BOARD MEMBERS", () => {
  it("Should set isLoading to true if is fetchBoardMembersStart action", () => {
    expect(
      boards(initialState, { type: BoardTypes.FETCH_BOARD_MEMBERS_START })
        .isLoading
    ).toBe(true);
  });

  it("Should set isLoading to false and set members in board in boardItems if is fetchBoardMembersSuccess action", () => {
    expect(
      boards(stateWithBoards, {
        type: BoardTypes.FETCH_BOARD_MEMBERS_SUCCESS,
        boardId: "1",
        members: [1, 2, 3],
      })
    ).toEqual({
      ...stateWithBoards,
      isLoading: false,
      boardItems: mockBoardsWithMemberThreeInFirstBoard,
    });
  });

  it("Should set isLoading to false and set error object if is fetchBoardMembersFailure action", () => {
    expect(
      boards(initialState, {
        type: BoardTypes.FETCH_BOARD_MEMBERS_FAILURE,
        error: "Error",
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      error: "Error",
    });
  });
});
