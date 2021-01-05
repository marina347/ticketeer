import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import WelcomeTeaser from "../../components/welcome-teaser/welcome-teaser.component";
import BoardItemList from "../../components/board-item-list/board-item-list.container";
import AddItem from "../../components/add-item/add-item.component";
import { selectUserNameAndSurname } from "../../redux/user/user.selectors";
import "./boards-overview.styles.scss";
import AddBoardItem from "../../components/add-board-item/add-board-item.component";
import Popup from "../../components/popup/popup.component";

const AddBoard = AddItem(Popup(AddBoardItem));

const BoardsOverviewPage = ({ name }) => {
  return (
    <div className="boards-overview">
      <WelcomeTeaser displayName={name} />
      <AddBoard />
      <BoardItemList />
    </div>
  );
};

export const mapStateToProps = createStructuredSelector({
  name: selectUserNameAndSurname,
});

export default connect(mapStateToProps)(BoardsOverviewPage);
