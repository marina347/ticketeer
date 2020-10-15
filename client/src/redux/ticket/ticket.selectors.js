import { createSelector } from "reselect";
import { selectLanesByBoardId } from "../lane/lane.selectors";

const selectTickets = (state) => state.tickets;
const selectMembers = (state) => state.user.members;

export const selectTicketItems = createSelector(
  [selectTickets],
  (tickets) => tickets.ticketItems
);

export const selectTicketItem = (ticketId) =>
  createSelector([selectTicketItems], (ticketItems) =>
    ticketItems.find((ticket) => ticket._id == ticketId)
  );

export const selectTicketItemAssigners = (ticketId) => {
  const selector = createSelector(
    [selectTicketItem(ticketId)],
    (ticketItem) => ticketItem.assigners
  );
  return selector;
};

export const selectTicketsByLanes = (laneId) =>
  createSelector([selectTicketItems], (ticketItems) =>
    ticketItems.filter((ticket) => ticket.laneId === laneId)
  );

export const selectTicketAssigners = (ticketId, boardMembers) =>
  createSelector([selectTicketItemAssigners(ticketId)], (members) =>
    members.map((member) =>
      boardMembers.find((boardMember) => boardMember._id == member.assigner)
    )
  );

export const selectTicketsFromBoard = (boardId, tickets, state) => {
  let ticketsArray = [];
  return createSelector([selectLanesByBoardId(boardId)], (lanes) => {
    lanes.map((lane) => {
      tickets.forEach((ticket) => {
        if (ticket.laneId == lane._id) ticketsArray.push(ticket);
      });
    });
    return ticketsArray;
  });
};
