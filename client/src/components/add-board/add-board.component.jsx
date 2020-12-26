import React, { useState } from "react";
import "./add-board.styles.scss";
import { ReactComponent as PlusIcon } from "../../assets/svg/plus.svg";
import AddBoardItem from "../add-board-item/add-board-item";
import Popup from "../popup/popup.component";

const AddBoardPopup = Popup(AddBoardItem);

const AddBoard = () => {
  const [popupOpened, setPopup] = useState(false);
  const handleClick = () => {
    setPopup(!popupOpened);
  };
  return (
    <div className="add-board-container">
      <div className="add-board-item" onClick={handleClick}>
        <PlusIcon className="add-board-item__icon" />
      </div>
      <AddBoardPopup popupOpened={popupOpened} onPopupClose={handleClick} />
    </div>
  );
};

export default AddBoard;
