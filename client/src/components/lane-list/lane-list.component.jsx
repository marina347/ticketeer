import React from "react";
import { connect } from "react-redux";

import { getLanesAsync } from "../../redux/lane/lane.actions";
import { selectLanesByBoardId } from "../../redux/lane/lane.selectors";
import { LaneListContainer } from "./lane-list.styles";
import Lane from "../lane/lane.component";
import AddLane from "../add-lane/add-lane.component";
import { selectToken } from "../../redux/user/user.selectors";
import { socket } from "../header/header.component";
import { selectCurrentUserId } from "../../redux/user/user.selectors";

class LaneList extends React.Component {
  componentDidMount() {
    const { getLanes, boardId, token, userId } = this.props;
    socket.emit("join", { boardId, userId });
    getLanes(boardId, token);
    socket.on("getLanes", (initiatorOfRequestId) => {
      this.handleGetLanes(initiatorOfRequestId);
    });
  }

  componentWillUnmount() {
    socket.off("getLanes");
  }

  handleGetLanes = (initiatorOfRequestId) => {
    const { getLanes, boardId, token, userId } = this.props;
    if (userId != initiatorOfRequestId) {
      console.log("emitted");
      getLanes(boardId, token);
    }
  };

  render() {
    const { lanes, boardId } = this.props;
    return (
      <div>
        <LaneListContainer style={{ paddingBottom: "9px" }}>
          {lanes.map((lane) => (
            <Lane key={lane._id} boardId={boardId} {...lane}></Lane>
          ))}
        </LaneListContainer>
        <AddLane boardId={boardId} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  lanes: selectLanesByBoardId(ownProps.boardId)(state),
  token: selectToken(state),
  userId: selectCurrentUserId(state),
});

const mapDispatchToProps = (dispatch) => ({
  getLanes: (boardId, token) => dispatch(getLanesAsync(boardId, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LaneList);
