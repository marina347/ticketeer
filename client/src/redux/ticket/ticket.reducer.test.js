import TicketTypes from "./ticket.types";
import tickets from "./ticket.reducer";

const initialState = {
  ticketItems: [],
  isLoading: false,
  error: null,
};

const mockTickets = [
  { _id: "1", laneId: "1", name: "Ticket 1" },
  { _id: "2", laneId: "1", name: "Ticket 2" },
];

const stateWithTickets = {
  isLoading: false,
  error: null,
  ticketItems: mockTickets,
};

it("Should return the initial state", () => {
  expect(tickets(undefined, {})).toEqual(initialState);
});

describe("GET TICKETS", () => {
  it("Should set isLoading to true if is getTicketsStart action", () => {
    expect(
      tickets(initialState, { type: TicketTypes.GET_TICKETS_START }).isLoading
    ).toBe(true);
  });

  it("Should set isLoading to false and set tickets to ticketItems if is getTicketsSuccess action", () => {
    expect(
      tickets(initialState, {
        type: TicketTypes.GET_TICKETS_SUCCESS,
        tickets: mockTickets,
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      ticketItems: mockTickets,
    });
  });

  it("Should set isLoading to false and set error object if is getTicketsFailure action", () => {
    expect(
      tickets(initialState, {
        type: TicketTypes.GET_TICKETS_FAILURE,
        error: "Error",
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      error: "Error",
    });
  });
});

describe("ADD TICKET", () => {
  const mockTicket = {
    _id: "3",
    laneId: "1",
    name: "Ticket 3",
  };
  it("Should set isLoading to true if is addTicketStart action", () => {
    expect(
      tickets(initialState, { type: TicketTypes.ADD_TICKET_START }).isLoading
    ).toBe(true);
  });

  it("Should set isLoading to false and add ticket to ticketItems if is addTicketSuccess action", () => {
    expect(
      tickets(stateWithTickets, {
        type: TicketTypes.ADD_TICKET_SUCCESS,
        ticket: mockTicket,
      })
    ).toEqual({
      ...stateWithTickets,
      isLoading: false,
      ticketItems: [...stateWithTickets.ticketItems, mockTicket],
    });
  });

  it("Should set isLoading to false and set error object if is addTicketFailure action", () => {
    expect(
      tickets(initialState, {
        type: TicketTypes.ADD_TICKET_FAILURE,
        error: "Error",
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      error: "Error",
    });
  });
});

describe("UPDATE TICKET", () => {
  const updatedTicket = {
    _id: "1",
    laneId: "2",
    name: "Ticket new name",
    description: "Description 1",
  };
  it("Should set isLoading to true if is updateTicketStart action", () => {
    expect(
      tickets(initialState, { type: TicketTypes.UPDATE_TICKET_START }).isLoading
    ).toBe(true);
  });

  it("Should set isLoading to false and update ticket in ticketItems if is updateTicketSuccess action", () => {
    expect(
      tickets(stateWithTickets, {
        type: TicketTypes.UPDATE_TICKET_SUCCESS,
        ticket: updatedTicket,
      })
    ).toEqual({
      ...stateWithTickets,
      isLoading: false,
      ticketItems: [updatedTicket, { _id: "2", laneId: "1", name: "Ticket 2" }],
    });
  });

  it("Should set isLoading to false and set error object if is updateTicketFailure action", () => {
    expect(
      tickets(initialState, {
        type: TicketTypes.UPDATE_TICKET_FAILURE,
        error: "Error",
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      error: "Error",
    });
  });
});
