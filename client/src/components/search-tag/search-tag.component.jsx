import React from "react";
import { connect } from "react-redux";

import Search from "../search/search.component";
import { getTicketsAsync } from "../../redux/ticket/ticket.actions";
import { selectTicketsFromBoard } from "../../redux/ticket/ticket.selectors";
import { getLanesAsync } from "../../redux/lane/lane.actions";

class SearchTag extends React.Component {
  state = {
    tagName: "",
    tickets: [],
  };

  handleChange = (e) => {
    this.setState({ tagName: e.target.value, tickets: [] }, () => {
      this.ticketContainsTag();
    });
  };

  ticketContainsTag = () => {
    const { ticketsFromBoard } = this.props;
    let ticketsArray = [];
    ticketsFromBoard.forEach((ticket) => {
      ticket.tags.find((tag) => {
        if (tag.tag.includes(this.state.tagName)) {
          ticketsArray.push(ticket);
          return true;
        }
        return false;
      });
    });
    this.setState({ tickets: ticketsArray });
  };

  render() {
    return (
      <div>
        <Search
          type="text"
          placeholder="Tag name"
          onChange={this.handleChange}
        />
        {this.state.tagName !== "" &&
          this.state.tickets.map((ticket) => (
            <p key={ticket._id}>{ticket.name}</p>
          ))}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  token: state.user.token,
  ticketsFromBoard: selectTicketsFromBoard(
    ownProps.boardId,
    state.tickets.ticketItems,
    state
  )(state),
});

const mapDispatchToProps = (dispatch) => ({
  getLanes: (boardId, token) => dispatch(getLanesAsync(boardId, token)),
  getTickets: (boardId, token) => dispatch(getTicketsAsync(boardId, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchTag);
