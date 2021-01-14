import React, { useState } from "react";
import "./board-link.styles.scss";
import EnvVariables from "../../env-variables";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ReactComponent as ClipBoardIcon } from "../../assets/svg/clipboard.svg";

const BoardLink = ({ boardLink }) => {
  const boardUrl = `${EnvVariables.REACT_APP_CLIENT_PATH}/home/boards/join-board/${boardLink}`;
  const [copy, setCopy] = useState(false);
  return (
    <div className="board-link">
      <h3 className="board-link__heading">Board invitation link</h3>
      <p className="board-link__helptext">
        Copy invitation link below and send it to your friends. When they open
        it, they will automatically become members of the board.
      </p>
      <span className="board-link__path">
        {boardLink !== "" ? boardUrl : ""}
      </span>
      <CopyToClipboard text={boardUrl} onCopy={() => setCopy(true)}>
        <ClipBoardIcon className="board-link__clipboard"></ClipBoardIcon>
      </CopyToClipboard>
      {copy ? (
        <span className="board-link__info">Link copied to clipboard.</span>
      ) : null}
    </div>
  );
};

export default BoardLink;
