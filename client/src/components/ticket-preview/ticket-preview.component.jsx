import React from "react";
import { connect } from "react-redux";
import Select from "react-select";
import { withRouter } from "react-router-dom";

import "./ticket-preview.styles.css";
import EditableInput from "../editable-input/editable-input.component";
import {
  selectTicketAssigners,
  selectTicketItem,
} from "../../redux/ticket/ticket.selectors";
import { updateTicketAsync } from "../../redux/ticket/ticket.actions";
import { selectMembersOfBoard } from "../../redux/board/board.selectors";
import FormInput from "../form-input/form-input.component";
import FormButton from "../form-button/form-button.component";

class TicketPreview extends React.Component {
  state = {
    selectedOptions: [],
    tag: "",
  };

  componentDidMount() {
    const { ticketAssigners } = this.props;
    this.setState({
      selectedOptions: ticketAssigners.map((member) => ({
        value: member._id,
        label: member.name,
      })),
    });
  }

  handleTagAdd = (e) => {
    this.setState({ tag: e.target.value });
  };

  handleTagSubmit = (e) => {
    e.preventDefault();
    const { ticketItem, token, updateTicket } = this.props;
    const tags = ticketItem.tags;
    tags.push({ tag: this.state.tag });
    ticketItem.tags = tags;
    updateTicket(ticketItem, token);
    this.setState({ tag: "" });
  };

  handleChange = (selectedOptions) => {
    const { ticketItem, token, updateTicket, boardMembers } = this.props;
    this.setState({ selectedOptions }, () => {
      if (selectedOptions) {
        const mappedSelections = this.state.selectedOptions.map(
          (selectedOption) => ({ _id: selectedOption.value })
        );
        const assigners = boardMembers.filter((boardMember) =>
          mappedSelections.find(
            (mappedSelection) => boardMember._id == mappedSelection._id
          )
        );

        ticketItem.assigners = assigners.map((assigner) => ({
          assigner: assigner._id,
        }));
      } else {
        ticketItem.assigners = [];
      }
      updateTicket(ticketItem, token);
    });
  };

  render() {
    const {
      id,
      updateTicket,
      ticketItem,
      ticketAssigners,
      token,
      boardMembers,
    } = this.props;
    return (
      <div className="nice-font ticket-preview-container">
        <EditableInput
          defaultViewClassName="ticket-header"
          editViewClassName="ticket-header"
          updateTicket={updateTicket}
          ticketItem={ticketItem}
          token={token}
          label={""}
          fieldName={"name"}
          fieldType={"input"}
          defaultName={ticketItem.name}
        />
        <EditableInput
          updateTicket={updateTicket}
          ticketItem={ticketItem}
          token={token}
          label={"Description: "}
          fieldName={"description"}
          fieldType={"textarea"}
          defaultViewValueClassName="ticket-description-view "
          editViewClassName="ticket-description ticket-description-edit"
          defaultViewInnerValueClassName="ticket-description"
          defaultName={ticketItem.description}
        />
        Assigners:{" "}
        <Select
          isMulti
          value={this.state.selectedOptions}
          onChange={this.handleChange}
          options={boardMembers.map((member) => ({
            value: member._id,
            label: member.name,
          }))}
        />
        <form onSubmit={this.handleTagSubmit}>
          <FormInput
            label=""
            type="text"
            containerClassName="tag-input-container"
            className="tag-input"
            name="tag"
            placeholder="Tag"
            value={this.state.tag}
            handleChange={this.handleTagAdd}
          />
          <FormButton className="tag-input-button">Dodaj tag</FormButton>
        </form>
        Tags:
        <div className="tag-list-container">
          {ticketItem.tags.map((item, ind) => (
            <p class="tag-list-item" key={ind}>
              {item.tag}
            </p>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ticketAssigners: selectTicketAssigners(
      ownProps.id,
      selectMembersOfBoard(ownProps.match.params.boardId)(state)
    )(state),
    ticketItem: selectTicketItem(ownProps.id)(state),
    token: state.user.token,
    boardMembers: selectMembersOfBoard(ownProps.match.params.boardId)(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  updateTicket: (ticket, token) => dispatch(updateTicketAsync(ticket, token)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TicketPreview)
);
