import React from "react";

import Member from "../member/member.component";
import Spinner from "../spinner/spinner.component";
import LightTooltip from "../light-tooltip/light-tooltip.component";
import "./member-list.styles.scss";

const lastIndexOfMemberToBeDisplayed = 4;

class MemberList extends React.Component {
  componentDidMount() {
    const { fetchMembers, boardId, token } = this.props;
    fetchMembers(boardId, token);
  }
  render() {
    const { board, isLoading } = this.props;
    if (!isLoading) {
      return (
        <div className="member-list">
          <h2 className="member-list__heading">Members:</h2>
          <div className="member-list__list">
            {board.members.map((member, index) => {
              if (index <= lastIndexOfMemberToBeDisplayed) {
                return <Member key={member._id} {...member}></Member>;
              }
            })}

            {/* can be separated component - TODO - lazy ATM */}
            {board.members.length > 5 && (
              <LightTooltip
                title={`+ ${
                  board.members.length - lastIndexOfMemberToBeDisplayed - 1
                } other members`}
                placement="bottom"
              >
                <div className="member-list__list--dots">
                  <span>...</span>
                </div>
              </LightTooltip>
            )}
          </div>
        </div>
      );
    }
    return <Spinner></Spinner>;
  }
}

export default MemberList;
