import React, { useState } from "react";
import "./add-board.styles.scss";
import { ReactComponent as PlusIcon } from "../../assets/svg/plus.svg";
import AddBoardItem from "../add-board-item/add-board-item";

const AddBoard = () => {
  const [modalOpened, setModal] = useState(false);
  const handleClick = () => {
    setModal(!modalOpened);
  };
  return (
    <div className="add-board-container">
      <div className="add-board-item" onClick={handleClick}>
        <PlusIcon className="add-board-item__icon" />
      </div>
      <AddBoardItem modalOpened={modalOpened} />
    </div>
  );
};

export default AddBoard;
