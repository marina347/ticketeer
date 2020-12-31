import React from "react";
import { connect } from "react-redux";

import { selectBoard } from "../../redux/board/board.selectors";
import LaneList from "../../components/lane-list/lane-list.component";
import BoardDetails from "../../components/board-details/board-details.component";
import "./board.styles.scss";

const BoardPage = ({ board }) => {
  return (
    <div className="board-page">
      <div className="board-page__group">
        <BoardDetails board={board} />
        <LaneList boardId={board._id} />
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { board: selectBoard(ownProps.match.params.boardId)(state) };
};

export default connect(mapStateToProps)(BoardPage);
