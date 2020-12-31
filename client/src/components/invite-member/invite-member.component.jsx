import React, { useState } from "react";
import { connect } from "react-redux";

import { generateHashedBoardIdAsync } from "../../redux/board/board.actions";
import { selectBoardLink } from "../../redux/board/board.selectors";
import { selectToken } from "../../redux/user/user.selectors";
import { ReactComponent as ShareIcon } from "../../assets/svg/share.svg";
import "./invite-member.styles.scss";
import Popup from "../popup/popup.component";
import BoardLink from "../board-link/board-link.component";

const BoardLinkPopup = Popup(BoardLink);

export const InviteMember = ({ boardLink, generateLink, boardId, token }) => {
  const [popupOpened, setPopup] = useState(false);
  const handleClick = () => {
    setPopup(!popupOpened);
  };
  return (
    <div>
      <div className="icon-cont" onClick={handleClick}>
        <ShareIcon
          className="icon"
          onClick={() => generateLink(boardId, token)}
        />
      </div>
      <BoardLinkPopup
        popupOpened={popupOpened}
        onPopupClose={handleClick}
        boardLink={boardLink}
      />
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
