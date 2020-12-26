import React from "react";
import { connect } from "react-redux";

import BoardItem from "../board-item/board-item.component";
import Spinner from "../spinner/spinner.component";
import { getBoardsAsync } from "../../redux/board/board.actions";
import "./board-item-list.styles.scss";

export class BoardItemList extends React.Component {
  componentDidMount() {
    const { getBoards, token } = this.props;
    getBoards(token);
  }

  render() {
    const { history, match, boards, isLoading } = this.props;
    if (!isLoading) {
      return (
        <div className="board-item-list-container">
          {boards.map((board) => (
            <BoardItem
              key={board._id}
              _id={board._id}
              history={history}
              match={match}
            />
          ))}
        </div>
      );
    } else return <Spinner></Spinner>;
  }
}

const mapDispathToProps = (dispatch) => ({
  getBoards: (token) => dispatch(getBoardsAsync(token)),
});

export default connect(null, mapDispathToProps)(BoardItemList);
