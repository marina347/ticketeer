import React from "react";
import { connect } from "react-redux";
import Select from "react-select";
import { withRouter } from "react-router-dom";

import "./ticket-preview.styles.scss";
import EditableInput from "../editable-input/editable-input.component";
import {
  selectTicketAssigners,
  selectTicketItem,
} from "../../redux/ticket/ticket.selectors";
import { updateTicketAsync } from "../../redux/ticket/ticket.actions";
import { selectMembersOfBoard } from "../../redux/board/board.selectors";
import FormInput from "../form-inputs/form-input/form-input.component";
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
    const { updateTicket, ticketItem, token, boardMembers } = this.props;
    return (
      <div className="ticket-preview">
        <h3 className="ticket-preview__heading">Edit ticket</h3>
        <EditableInput
          updateTicket={updateTicket}
          ticketItem={ticketItem}
          token={token}
          label={"Name"}
          fieldName={"name"}
          fieldType={"input"}
          defaultName={ticketItem.name}
        />
        <EditableInput
          updateTicket={updateTicket}
          ticketItem={ticketItem}
          token={token}
          label={"Description"}
          fieldName={"description"}
          fieldType={"textarea"}
          defaultName={ticketItem.description}
        />
        <Select
          isMulti
          className="select u-border-none"
          value={this.state.selectedOptions}
          onChange={this.handleChange}
          options={boardMembers.map((member) => ({
            value: member._id,
            label: member.name,
          }))}
        />
        <form class="tag-form" onSubmit={this.handleTagSubmit}>
          <FormInput
            label="Tag"
            type="text"
            name="tag"
            value={this.state.tag}
            handleChange={this.handleTagAdd}
          />
          <FormButton className="btn btn-inverted btn--small u-animation-none">
            Add tag
          </FormButton>
        </form>
        <div className="tag-list">
          {ticketItem.tags.map((item, ind) => (
            <span class="tag-list__item" key={ind}>
              {item.tag}
            </span>
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
