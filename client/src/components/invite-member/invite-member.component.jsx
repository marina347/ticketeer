import React, { useState } from "react";
import { connect } from "react-redux";

import { generateHashedBoardIdAsync } from "../../redux/board/board.actions";
import { selectBoardLink } from "../../redux/board/board.selectors";
import { selectToken } from "../../redux/user/user.selectors";
import { ReactComponent as ShareIcon } from "../../assets/svg/share.svg";
import "./invite-member.styles.scss";
import Popup from "../popup/popup.component";
import BoardLink from "../board-link/board-link.component";
import Modal from "../modal/Modal";

const BoardLinkPopup = Popup(BoardLink);

export const InviteMember = ({ boardLink, generateLink, boardId, token }) => {
  const [modalOpened, setModal] = useState(false);
  const handleClick = () => {
    setModal(!modalOpened);
  };
  return (
    <div>
      <div id="icon-box" className="icon-box" onClick={handleClick}>
        <ShareIcon
        id="icon"
          className="icon"
          onClick={() => generateLink(boardId, token)}
        />
      </div>
      {modalOpened ? (
        <Modal id="modal">
          <BoardLinkPopup onPopupClose={handleClick} boardLink={boardLink} />
        </Modal>
      ) : null}
    </div>
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
