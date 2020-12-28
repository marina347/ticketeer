import React from "react";

import Member from "../member/member.component";
import Spinner from "../spinner/spinner.component";
import "./member-list.styles.scss";

class MemberList extends React.Component {
  componentDidMount() {
    const { fetchMembers, boardId, token } = this.props;
    fetchMembers(boardId, token);
  }
  render() {
    const { board, isLoading } = this.props;
    if (!isLoading) {
      return (
        <div className="member-list-container">
          <h2 className="member-list-container__heading">Members:</h2>
          <div className="member-list-container__list">
            {board.members.map((member) => (
              <Member key={member._id} {...member}></Member>
            ))}
          </div>
        </div>
      );
    }
    return <Spinner></Spinner>;
  }
}

export default MemberList;
