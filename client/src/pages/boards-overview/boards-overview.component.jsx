import React from "react";

import WelcomeTeaser from "../../components/welcome-teaser/welcome-teaser.component";
import BoardItemList from "../../components/board-item-list/board-item-list.container";
import AddItem from "../../components/add-item/add-item.component";
import "./boards-overview.styles.scss";
import AddBoardItem from "../../components/add-board-item/add-board-item-form.component";
import Popup from "../../components/popup/popup.component";

const AddBoard = AddItem(Popup(AddBoardItem));

const BoardsOverviewPage = () => {
  return (
    <div className="boards-overview">
      <WelcomeTeaser />
      <AddBoard />
      <BoardItemList />
    </div>
  );
};

export default BoardsOverviewPage;
