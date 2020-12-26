import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import WelcomeTeaser from "../../components/welcome-teaser/welcome-teaser.component";
import BoardItemList from "../../components/board-item-list/board-item-list.container";
import AddBoard from "../../components/add-board/add-board.component";
import { BoardsOverviewPageContainer } from "./boards-overview.styles";
import { selectUserNameAndSurname } from "../../redux/user/user.selectors";
import "./boards-overview.styles.scss";

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
