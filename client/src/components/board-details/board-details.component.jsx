import React from "react";

import "./board-details.styles.scss";
import MemberList from "../member-list/member-list.container";

const BoardDetails = ({ board }) => {
  return (
    <div className="board-details">
      <div className="board-details__row">
        <p className="board-details__name">{board ? board.name : ""}</p>
        <MemberList boardId={board._id} />
      </div>
      {board.description != "" ? (
        <p className="board-details__description">{board.description}</p>
      ) : null}
    </div>
  );
};

export default BoardDetails;
