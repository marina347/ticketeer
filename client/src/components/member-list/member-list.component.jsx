import React from "react";

import Member from "../member/member.component";
import Spinner from "../spinner/spinner.component";
import "./member-list.styles.css";
import UserIconSmall from "../user-icon/user-icon-small/user-icon-small.component";

class MemberList extends React.Component {
  componentDidMount() {
    const { fetchMembers, boardId, token } = this.props;
    fetchMembers(boardId, token);
  }
  render() {
    const { board, isLoading } = this.props;
    if (!isLoading) {
      return (
        <div className="member-list-container nice-font">
          <h2>Members:</h2>
          {board.members.map((member) => (
            <Member key={member._id} {...member}></Member>
          ))}
        </div>
      );
    }
    return <Spinner></Spinner>;
  }
}

export default MemberList;
