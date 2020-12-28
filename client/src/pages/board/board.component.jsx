import React from "react";
import { connect } from "react-redux";

import { selectBoard } from "../../redux/board/board.selectors";
import LaneList from "../../components/lane-list/lane-list.component";
import MemberList from "../../components/member-list/member-list.container";
import InviteMember from "../../components/invite-member/invite-member.component";
import "./board.styles.scss";

const BoardPage = ({ board, isLoading }) => {
  return (
    <div className="board-page">
      <div className="board-page__details">
        <p className="board-page-name">{board ? board.name : ""}</p>
        <MemberList boardId={board._id} />
      </div>
      <p className="board-page-description">{board.description}</p>
      <LaneList boardId={board._id} />
      <InviteMember boardId={board._id} />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { board: selectBoard(ownProps.match.params.boardId)(state) };
};

export default connect(mapStateToProps)(BoardPage);
