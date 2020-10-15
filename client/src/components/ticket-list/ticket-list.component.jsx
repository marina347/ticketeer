import React from "react";
import { connect } from "react-redux";

import { selectTicketsByLanes } from "../../redux/ticket/ticket.selectors";
import { getTicketsAsync } from "../../redux/ticket/ticket.actions";
import Ticket from "../ticket/ticket.component";
import { selectToken } from "../../redux/user/user.selectors";

class TicketList extends React.Component {
  onDragStart = (event, id) => {
    event.dataTransfer.setData("id", id);
  };
  componentDidMount() {
    const { getTickets, boardId, token } = this.props;
    getTickets(boardId, token);
  }
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
});

const mapDispatchToProps = (dispatch) => ({
  getTickets: (boardId, token) => dispatch(getTicketsAsync(boardId, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TicketList);
