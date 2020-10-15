import React from "react";
import { connect } from "react-redux";
import Tooltip from "@material-ui/core/Tooltip";

import { BoardItemContainer } from "./board-item.styles";
import { selectBoard } from "../../redux/board/board.selectors";
import { selectToken } from "../../redux/user/user.selectors";

const MAX_LENGTH = 28;

const BoardItem = ({ history, match, _id, board }) => {
  return (
    <Tooltip
      title={
        <div style={{ fontSize: "16px" }}>
          <p>{board.name}</p>
          <br />
          <p>{board.description}</p>
        </div>
      }
      placement="top"
    >
      <BoardItemContainer
        onClick={() => history.push(`${match.url}/boards/${_id}`)}
      >
        <p>
          {board.name.length > 20
            ? `${board.name.substring(0, MAX_LENGTH)}...`
            : board.name}
        </p>
      </BoardItemContainer>
    </Tooltip>
  );
};

const mapStateToProps = (state, ownProps) => ({
  board: selectBoard(ownProps._id)(state) || null,
  token: selectToken,
});

export default connect(mapStateToProps)(BoardItem);
