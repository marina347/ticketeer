import React from "react";

import "./board-details.styles.scss";
import MemberList from "../member-list/member-list.container";
import InviteMember from "../invite-member/invite-member.component";

const BoardDetails = ({ board }) => {
  return (
    <div className="board-details">
      <div className="board-details__row">
        <div className="board-details__group">
          <p className="board-details__name">{board ? board.name : ""}</p>
          <InviteMember boardId={board._id} />
        </div>
        <MemberList boardId={board._id} />
      </div>
      <div className="board-details__row">
        {board.description != "" ? (
          <p className="board-details__description">{board.description}</p>
        ) : null}
      </div>
    </div>
  );
};

export default BoardDetails;
