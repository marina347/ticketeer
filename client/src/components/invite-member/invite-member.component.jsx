import React from "react";
import { connect } from "react-redux";

import FormButton from "../form-button/form-button.component";
import { generateHashedBoardIdAsync } from "../../redux/board/board.actions";
import { selectBoardLink } from "../../redux/board/board.selectors";
import { selectToken } from "../../redux/user/user.selectors";
import { InviteContainer } from "./invite-member.styles";
import EnvVariables from "../../env-variables";

export const InviteMember = ({ boardLink, generateLink, boardId, token }) => {
  const boardUrl = `${EnvVariables.REACT_APP_SERVER_PATH}/home/boards/join-board/${boardLink}`;

  return (
    <InviteContainer>
      <p>Create link for joining this board!</p>
      <div id="board-link">{boardLink !== "" ? boardUrl : boardLink}</div>
      <FormButton
        id="board-link-button"
        onClick={() => generateLink(boardId, token)}
      >
        CREATE
      </FormButton>
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
