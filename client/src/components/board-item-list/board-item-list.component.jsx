import React from "react";
import { connect } from "react-redux";

import BoardItem from "../board-item/board-item.component";
import { BoardItemListContainer } from "./board-item-list.styles";
import Spinner from "../spinner/spinner.component";
import { getBoardsAsync } from "../../redux/board/board.actions";

export class BoardItemList extends React.Component {
  componentDidMount() {
    const { getBoards, token } = this.props;
    getBoards(token);
  }

  render() {
    const { history, match, boards, isLoading } = this.props;
    if (!isLoading) {
      return (
        <BoardItemListContainer>
          {boards.map((board) => (
            <BoardItem
              key={board._id}
              _id={board._id}
              history={history}
              match={match}
            />
          ))}
        </BoardItemListContainer>
      );
    } else return <Spinner></Spinner>;
  }
}

const mapDispathToProps = (dispatch) => ({
  getBoards: (token) => dispatch(getBoardsAsync(token)),
});

export default connect(null, mapDispathToProps)(BoardItemList);
