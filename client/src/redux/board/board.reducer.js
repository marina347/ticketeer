import BoardTypes from "./board.types";

const INITIAL_STATE = {
  boardItems: [],
  isLoading: false,
  error: null,
};

const boards = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BoardTypes.GET_BOARDS:
      return { ...state, boardItems: action.boards };
    case BoardTypes.ADD_BOARD_START:
    case BoardTypes.GET_BOARDS_START:
    case BoardTypes.GENERATE_HASHED_BOARD_ID_START:
    case BoardTypes.JOIN_BOARD_START:
    case BoardTypes.FETCH_BOARD_MEMBERS_START:
      return { ...state, isLoading: true };
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
    case BoardTypes.JOIN_BOARD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        boardItems: [...state.boardItems, action.board],
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
    case BoardTypes.MOVE_TICKET:
      return state.map((board) => helper(board, board.tasks, action));
    default:
      return state;
  }
};

const helper = (board, tickets, action) => {
  return {
    ...board,
    tasks: tickets.map((ticket) =>
      ticket.id === action.ticketId
        ? { ...ticket, type: action.ticketType }
        : ticket
    ),
  };
};

export default boards;
