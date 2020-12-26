import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import WelcomeTeaser from "../../components/welcome-teaser/welcome-teaser.component";
import BoardItemList from "../../components/board-item-list/board-item-list.container";
import AddBoard from "../../components/add-board-item/add-board-item";
import { BoardsOverviewPageContainer } from "./boards-overview.styles";
import { selectUserNameAndSurname } from "../../redux/user/user.selectors";

const BoardsOverviewPage = ({ name }) => {
  return (
    <BoardsOverviewPageContainer className="nice-font">
      <WelcomeTeaser displayName={name} />
      <AddBoard />
      <BoardItemList />
    </BoardsOverviewPageContainer>
  );
};

export const mapStateToProps = createStructuredSelector({
  name: selectUserNameAndSurname,
});

export default connect(mapStateToProps)(BoardsOverviewPage);
