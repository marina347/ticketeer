import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

import BoardItemList from "./board-item-list.component";
import {
  selectToken,
  selectCurrentUser,
} from "../../redux/user/user.selectors";
import {
  selectBoardsItems,
  selectBoardsAreLoading,
} from "../../redux/board/board.selectors";

const mapStateToProps = createStructuredSelector({
  boards: selectBoardsItems,
  token: selectToken,
  isLoading: selectBoardsAreLoading,
  currentUser: selectCurrentUser,
});

const BoardItemListContainer = compose(
  withRouter,
  connect(mapStateToProps)
)(BoardItemList);

export default BoardItemListContainer;
