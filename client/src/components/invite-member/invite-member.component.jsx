import React from "react";
import { connect } from "react-redux";

import FormButton from "../form-button/form-button.component";
import { generateHashedBoardIdAsync } from "../../redux/board/board.actions";
import { selectBoardLink } from "../../redux/board/board.selectors";
import { selectToken } from "../../redux/user/user.selectors";
import { InviteContainer } from "./invite-member.styles";

const InviteMember = ({ boardLink, generateLink, boardId, token }) => {
  const handleSubmit = () => {
    generateLink(boardId, token);
  };

  const boardUrl = `http://localhost:3000/home/boards/join-board/${boardLink}`;
  return (
    <InviteContainer>
      <div>
        <p>Create link for joining this board!</p>
        <div>{boardLink !== "" ? boardUrl : boardLink}</div>
        <FormButton onClick={handleSubmit}>CREATE</FormButton>
      </div>
    </InviteContainer>
  );
};

const mapStateToProps = (state, ownProps) => ({
  boardLink: selectBoardLink(ownProps.boardId)(state),
  token: selectToken(state),
});

const mapDispatchToProps = (dispatch) => ({
  generateLink: (boardId, token) =>
    dispatch(generateHashedBoardIdAsync(boardId, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InviteMember);
