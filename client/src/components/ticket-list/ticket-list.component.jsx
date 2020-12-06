import React from "react";
import { connect } from "react-redux";

import { selectTicketsByLanes } from "../../redux/ticket/ticket.selectors";
import { getTicketsAsync } from "../../redux/ticket/ticket.actions";
import Ticket from "../ticket/ticket.component";
import {
  selectCurrentUserId,
  selectToken,
} from "../../redux/user/user.selectors";
import { getSocket } from "../../utils/client-socket";

let socket;

class TicketList extends React.Component {
  onDragStart = (event, id) => {
    event.dataTransfer.setData("id", id);
  };
  componentDidMount() {
    const { getTickets, boardId, token } = this.props;
    getTickets(boardId, token);
    socket = getSocket();
    socket.on("getTickets", (initiatorOfRequestId) =>
      this.handleGetTickets(initiatorOfRequestId)
    );
  }

  componentWillUnmount() {
    socket.off("getTickets");
  }

  handleGetTickets = (initiatorOfRequestId) => {
    const { getTickets, boardId, token, userId } = this.props;
    if (userId != initiatorOfRequestId) {
      getTickets(boardId, token);
    }
  };

  render() {
    const { tickets } = this.props;
    return tickets.map((ticket) => (
      <Ticket
        onDragStart={(event) => this.onDragStart(event, ticket._id)}
        className="draggable lane-item"
        key={ticket._id}
        {...ticket}
      ></Ticket>
    ));
  }
}

const mapStateToProps = (state, ownProps) => ({
  tickets: selectTicketsByLanes(ownProps.laneId)(state),
  token: selectToken(state),
  userId: selectCurrentUserId(state),
});

const mapDispatchToProps = (dispatch) => ({
  getTickets: (boardId, token) => dispatch(getTicketsAsync(boardId, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TicketList);
