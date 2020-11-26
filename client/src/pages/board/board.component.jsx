import React from "react";
import { connect } from "react-redux";

import { selectBoard } from "../../redux/board/board.selectors";
import LaneList from "../../components/lane-list/lane-list.component";
import MemberList from "../../components/member-list/member-list.container";
import InviteMember from "../../components/invite-member/invite-member.component";

const BoardPage = ({ board, isLoading }) => {
  return (
    <div className="nice-font">
      <h1
        style={{
          margin: "30px",
          marginLeft: "100px",
          fontFamily: "Nunito",
        }}
      >
        {board ? board.name : ""}
      </h1>
      <LaneList boardId={board._id} />
      <MemberList boardId={board._id} />
      <InviteMember boardId={board._id} />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { board: selectBoard(ownProps.match.params.boardId)(state) };
};

export default connect(mapStateToProps)(BoardPage);
