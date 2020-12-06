import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import {
  joinBoardAsync,
  getBoardsAsync,
} from "../../redux/board/board.actions";
import {
  setLandingPage,
  unsetLandingPage,
} from "../../redux/user/user.actions";
import {
  selectCurrentUser,
  selectToken,
} from "../../redux/user/user.selectors";

const JoinBoard = ({
  currentUser,
  joinBoard,
  token,
  match,
  setLandingPage,
  unsetLandingPage,
}) => {
  let history = useHistory();
  useEffect(() => {
    if (!currentUser) {
      setLandingPage(`/home/boards/join-board/${match.params.hashedBoardId}`);
      history.push("/login");
    } else {
      unsetLandingPage();
      joinBoard(match.params.hashedBoardId, token);
    }
  }, []);
  return <Redirect to="/home" />;
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  token: selectToken,
});

const mapDispatchToProps = (dispatch) => ({
  joinBoard: (hashedBoardId, token) =>
    dispatch(joinBoardAsync(hashedBoardId, token)),
  setLandingPage: (landingPage) => dispatch(setLandingPage(landingPage)),
  unsetLandingPage: () => dispatch(unsetLandingPage()),
  getBoards: (token) => dispatch(getBoardsAsync(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(JoinBoard);
