import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./lane.styles.css";
import TicketList from "../ticket-list/ticket-list.component";
import AddTicket from "../add-ticket/add-ticket.component";
import { updateTicketAsync } from "../../redux/ticket/ticket.actions";
import { selectTicketItems } from "../../redux/ticket/ticket.selectors";
import { selectToken } from "../../redux/user/user.selectors";
import FormButton from "../form-button/form-button.component";
import { deleteLaneAsync } from "../../redux/lane/lane.actions";

class Lane extends React.Component {
  onDragOver = (event) => {
    event.preventDefault();
  };

  onDrop = (event, cat) => {
    const { tickets, updateTicket, _id, token } = this.props;
    let ticketId = event.dataTransfer.getData("id");
    const ticket = tickets.find((ticket) => ticket._id === ticketId);
    ticket.laneId = _id;
    updateTicket(ticket, token);
  };

  render() {
    const { boardId, _id, name, dropClassName, deleteLane, token } = this.props;
    return (
      <div
        onDragOver={(event) => this.onDragOver(event)}
        onDrop={(event) => {
          this.onDrop(event, dropClassName);
        }}
        className="drag-container lane-container"
      >
        <div className="title-button-group">
          <h2 className="nice-font lane-header">{name}</h2>
        </div>
        <TicketList boardId={boardId} laneId={_id} />
        <AddTicket _id={_id} />
        <FormButton isIconStyle={true} onClick={() => deleteLane(_id, token)}>
          X
        </FormButton>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  tickets: selectTicketItems,
  token: selectToken,
});

const mapDispatchToProps = (dispatch) => ({
  updateTicket: (ticket, token) => dispatch(updateTicketAsync(ticket, token)),
  deleteLane: (laneId, token) => dispatch(deleteLaneAsync(laneId, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Lane);
