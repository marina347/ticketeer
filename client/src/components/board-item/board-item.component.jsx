import React from "react";
import { connect } from "react-redux";

import { selectBoard } from "../../redux/board/board.selectors";
import "./board-item.styles.scss";

export const BoardItem = ({ history, match, _id, board }) => {
  return (
    <div
      className="board-item"
      onClick={() => history.push(`${match.url}/boards/${_id}`)}
    >
      <p id="board_item_name" className="board-item__name">
        {board.name}
      </p>
      <p className="board-item__description">{board.description}</p>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  board: selectBoard(ownProps._id)(state) || null,
});

export default connect(mapStateToProps)(BoardItem);
