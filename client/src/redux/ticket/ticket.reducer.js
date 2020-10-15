import TicketTypes from "./ticket.types";

const INITIAL_STATE = {
  ticketItems: [],
  error: null,
  isLoading: false,
};

const tickets = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TicketTypes.GET_TICKETS_START:
    case TicketTypes.ADD_TICKET_START:
    case TicketTypes.UPDATE_TICKET_START:
      return { ...state, isLoading: true };
    case TicketTypes.GET_TICKETS_SUCCESS:
      return {
        ...state,
        ticketItems: action.tickets,
        isLoading: false,
        error: null,
      };
    case TicketTypes.UPDATE_TICKET_SUCCESS:
      return {
        ...state,
        ticketItems: state.ticketItems.map((ticket) =>
          ticket._id === action.ticket._id ? action.ticket : ticket
        ),
        isLoading: false,
        error: null,
      };
    case TicketTypes.ADD_TICKET_SUCCESS:
      return {
        ...state,
        ticketItems: [...state.ticketItems, action.ticket],
        isLoading: false,
        error: null,
      };
    case TicketTypes.UPDATE_TICKET_FAILURE:
    case TicketTypes.ADD_TICKET_FAILURE:
    case TicketTypes.GET_TICKETS_FAILURE:
      return { ...state, error: action.error, isLoading: false };
    default:
      return state;
  }
};

export default tickets;
