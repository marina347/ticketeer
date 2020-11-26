import BoardTypes from "./board.types";
import * as boardActions from "./board.actions";

const mockBoard = {
  _id: "1",
  name: "Board1",
  description: "Description 1",
};

const mockBoards = [
  mockBoard,
  { _id: "2", name: "Board 2", description: "Description 2" },
];

describe("ADD BOARD ACTIONS", () => {
  it("Should create the addBoardStart action", () => {
    expect(boardActions.addBoardStart().type).toEqual(
      BoardTypes.ADD_BOARD_START
    );
  });

  it("Should create the addBoardSuccess action", () => {
    const action = boardActions.addBoardSuccess(mockBoard);
    expect(action.type).toEqual(BoardTypes.ADD_BOARD_SUCCESS);
    expect(action.board).toEqual(mockBoard);
  });

  it("Should create the addBoardFailure action", () => {
    const action = boardActions.addBoardFailure("Error");
    expect(action.type).toEqual(BoardTypes.ADD_BOARD_FAILURE);
    expect(action.error).toEqual("Error");
  });

  it("Should create addBoardAsync action", () => {
    const mockActionCreator = boardActions.addBoardAsync();
    const mockDispatch = jest.fn();
    mockActionCreator(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(boardActions.addBoardStart());
  });
});

describe("GET BOARD ACTIONS", () => {
  it("Should create the getBoardStart action", () => {
    expect(boardActions.getBoardsStart().type).toEqual(
      BoardTypes.GET_BOARDS_START
    );
  });

  it("Should create the getBoardsSuccess action", () => {
    const action = boardActions.getBoardsSuccess(mockBoards);
    expect(action.type).toEqual(BoardTypes.GET_BOARDS_SUCCESS);
    expect(action.boards).toEqual(mockBoards);
  });

  it("Should create the getBoardsFailure action", () => {
    const action = boardActions.getBoardsFailure("Error");
    expect(action.type).toEqual(BoardTypes.GET_BOARDS_FAILURE);
    expect(action.error).toEqual("Error");
  });

  it("Should create getBoardsAsync action", () => {
    const mockActionCreator = boardActions.getBoardsAsync();
    const mockDispatch = jest.fn();
    mockActionCreator(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(boardActions.getBoardsStart());
  });
});

describe("GENERATE HASHED BOARD ID", () => {
  it("Should create the generateHashedBoardIdStart action", () => {
    expect(boardActions.generateHashedBoardIdStart().type).toEqual(
      BoardTypes.GENERATE_HASHED_BOARD_ID_START
    );
  });

  it("Should create the generateHashedBoardIdSuccess action", () => {
    const action = boardActions.generateHashedBoardIdSuccess("1", "/home");
    expect(action.type).toEqual(BoardTypes.GENERATE_HASHED_BOARD_ID_SUCCESS);
    expect(action.boardId).toEqual("1");
    expect(action.link).toEqual("/home");
  });

  it("Should create the generateHashedBoardIdFailure action", () => {
    const action = boardActions.generateHashedBoardIdFailure("Error");
    expect(action.type).toEqual(BoardTypes.GENERATE_HASHED_BOARD_ID_FAILURE);
    expect(action.error).toEqual("Error");
  });

  it("Should create generateHashedBoardIdAsync action", () => {
    const mockActionCreator = boardActions.generateHashedBoardIdAsync();
    const mockDispatch = jest.fn();
    mockActionCreator(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(
      boardActions.generateHashedBoardIdStart()
    );
  });
});

describe("GENERATE HASHED BOARD ID", () => {
  it("Should create the generateHashedBoardIdStart action", () => {
    expect(boardActions.generateHashedBoardIdStart().type).toEqual(
      BoardTypes.GENERATE_HASHED_BOARD_ID_START
    );
  });

  it("Should create the generateHashedBoardIdSuccess action", () => {
    const action = boardActions.generateHashedBoardIdSuccess("1", "/home");
    expect(action.type).toEqual(BoardTypes.GENERATE_HASHED_BOARD_ID_SUCCESS);
    expect(action.boardId).toEqual("1");
    expect(action.link).toEqual("/home");
  });

  it("Should create the generateHashedBoardIdFailure action", () => {
    const action = boardActions.generateHashedBoardIdFailure("Error");
    expect(action.type).toEqual(BoardTypes.GENERATE_HASHED_BOARD_ID_FAILURE);
    expect(action.error).toEqual("Error");
  });

  it("Should create generateHashedBoardIdAsync action", () => {
    const mockActionCreator = boardActions.generateHashedBoardIdAsync();
    const mockDispatch = jest.fn();
    mockActionCreator(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(
      boardActions.generateHashedBoardIdStart()
    );
  });
});

describe("FETCH BOARD MEMBERS", () => {
  it("Should create the fetchBoardMembersStart action", () => {
    expect(boardActions.fetchBoardMembersStart().type).toEqual(
      BoardTypes.FETCH_BOARD_MEMBERS_START
    );
  });

  it("Should create the fetchBoardMembersSuccess action", () => {
    const action = boardActions.fetchBoardMembersSuccess("1", [
      { member: "1" },
      { member: "2" },
    ]);
    expect(action.type).toEqual(BoardTypes.FETCH_BOARD_MEMBERS_SUCCESS);
    expect(action.boardId).toEqual("1");
    expect(action.members).toEqual([{ member: "1" }, { member: "2" }]);
  });

  it("Should create the fetchBoardMembersFailure action", () => {
    const action = boardActions.fetchBoardMembersFailure("Error");
    expect(action.type).toEqual(BoardTypes.FETCH_BOARD_MEMBERS_FAILURE);
    expect(action.error).toEqual("Error");
  });

  it("Should create fetchBoardMembersAsync action", () => {
    const mockActionCreator = boardActions.fetchBoardMembersAsync();
    const mockDispatch = jest.fn();
    mockActionCreator(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(
      boardActions.fetchBoardMembersStart()
    );
  });
});
