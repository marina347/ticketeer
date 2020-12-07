import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import FormTextArea from "../form-text-area/form-text-area.component";
import FormButton from "../form-button/form-button.component";
import { AddTicketItemContainer } from "./add-ticket.styles";
import { addTicketAsync } from "../../redux/ticket/ticket.actions";
import {
  selectToken,
  selectCurrentUser,
} from "../../redux/user/user.selectors";

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
    <AddTicketItemContainer>
      <form id="add_ticket_form" onSubmit={handleSubmit}>
        <FormTextArea
          id="add_ticket_input"
          name="ticketName"
          label="Add ticket"
          cols={20}
          rows={2}
          value={ticketName}
          onChange={handleChange}
          required
        />
        <FormButton type="submit">ADD</FormButton>
      </form>
    </AddTicketItemContainer>
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
