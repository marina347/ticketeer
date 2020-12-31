import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import FormTextArea from "../form-inputs/form-text-area/form-text-area.component";
import FormButton from "../form-button/form-button.component";
import { addTicketAsync } from "../../redux/ticket/ticket.actions";
import {
  selectToken,
  selectCurrentUser,
} from "../../redux/user/user.selectors";
import "./add-ticket.styles.scss";

export const AddTicket = ({ addTicket, _id, token }) => {
  const [ticketName, setTicketName] = useState("");

  const handleChange = (event) => {
    const { value } = event.target;
    setTicketName(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addTicket(
      {
        name: ticketName,
        laneId: _id,
      },
      token
    );
    setTicketName("");
  };

  return (
    <form id="add_ticket_form" className="add-ticket" onSubmit={handleSubmit}>
      <FormTextArea
        id="add_ticket_input"
        name="ticketName"
        label="Ticket name"
        placeholder="Ticket name"
        cols={50}
        rows={3}
        value={ticketName}
        onChange={handleChange}
      />
      <FormButton
        className="btn btn-main btn--small u-animation-none"
        type="submit"
      >
        ADD
      </FormButton>
    </form>
  );
};

const mapStateToProps = createStructuredSelector({
  token: selectToken,
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  addTicket: (ticket, token) => dispatch(addTicketAsync(ticket, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTicket);
