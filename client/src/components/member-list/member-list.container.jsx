import { connect } from "react-redux";

import { selectBoard } from "../../redux/board/board.selectors";
import { getBoardsAsync } from "../../redux/board/board.actions";
import { fetchBoardMembersAsync } from "../../redux/board/board.actions";
import MemberList from "./member-list.component";
import {
  selectToken,
  selectCurrentUser,
} from "../../redux/user/user.selectors";
import { selectBoardsAreLoading } from "../../redux/board/board.selectors";

const mapStateToProps = (state, ownProps) => ({
  board: selectBoard(ownProps.boardId)(state) || null,
  currentUser: selectCurrentUser(state),
  token: selectToken(state),
  isLoading: selectBoardsAreLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  getBoards: (token) => dispatch(getBoardsAsync(token)),
  fetchMembers: (boardId, token) =>
    dispatch(fetchBoardMembersAsync(boardId, token)),
});

const MemberListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberList);

export default MemberListContainer;
