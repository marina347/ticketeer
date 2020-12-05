import BoardTypes from "./board.types";

const INITIAL_STATE = {
  boardItems: [],
  isLoading: false,
  error: null,
};

const boards = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BoardTypes.ADD_BOARD_START:
    case BoardTypes.GET_BOARDS_START:
    case BoardTypes.GENERATE_HASHED_BOARD_ID_START:
    case BoardTypes.JOIN_BOARD_START:
    case BoardTypes.FETCH_BOARD_MEMBERS_START:
      return { ...state, isLoading: true };
    case BoardTypes.JOIN_BOARD_SUCCESS:
    case BoardTypes.ADD_BOARD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        boardItems: [...state.boardItems, { ...action.board }],
      };
    case BoardTypes.GET_BOARDS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        boardItems: action.boards,
      };
    case BoardTypes.GENERATE_HASHED_BOARD_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        boardItems: state.boardItems.map((board) =>
          board._id == action.boardId ? { ...board, link: action.link } : board
        ),
      };
    case BoardTypes.FETCH_BOARD_MEMBERS_SUCCESS:
      return {
        ...state,
        error: null,
        isLoading: false,
        boardItems: state.boardItems.map((board) =>
          board._id == action.boardId
            ? { ...board, members: action.members }
            : board
        ),
      };
    case BoardTypes.ADD_BOARD_FAILURE:
    case BoardTypes.GET_BOARDS_FAILURE:
    case BoardTypes.GENERATE_HASHED_BOARD_ID_FAILURE:
    case BoardTypes.JOIN_BOARD_FAILURE:
    case BoardTypes.FETCH_BOARD_MEMBERS_FAILURE:
      return { ...state, isLoading: false, error: action.error };
    default:
      return state;
  }
};

export default boards;
