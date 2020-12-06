import TicketTypes from "./ticket.types";
import * as ticketActions from "./ticket.actions";

const mockTicket = {
  _id: "1",
  name: "Lane 1",
  boardId: "1",
};

const mockTickets = [mockTicket, { _id: "2", laneId: "1", name: "Ticket 2" }];

describe("ADD TICKET ACTIONS", () => {
  it("Should create the addTicketStart action", () => {
    expect(ticketActions.addTicketStart().type).toEqual(
      TicketTypes.ADD_TICKET_START
    );
  });

  it("Should create the addTicketSuccess action", () => {
    const action = ticketActions.addTicketSuccess(mockTicket);
    expect(action.type).toEqual(TicketTypes.ADD_TICKET_SUCCESS);
    expect(action.ticket).toEqual(mockTicket);
  });

  it("Should create the addTicketFailure action", () => {
    const action = ticketActions.addTicketFailure("Error");
    expect(action.type).toEqual(TicketTypes.ADD_TICKET_FAILURE);
    expect(action.error).toEqual("Error");
  });

  it("Should create addTicketAsync action", () => {
    const mockActionCreator = ticketActions.addTicketAsync();
    const mockDispatch = jest.fn();
    mockActionCreator(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(ticketActions.addTicketStart());
  });
});

describe("GET TICKETS ACTIONS", () => {
  it("Should create the getTicketsStart action", () => {
    expect(ticketActions.getTicketsStart().type).toEqual(
      TicketTypes.GET_TICKETS_START
    );
  });

  it("Should create the getTicketsSuccess action", () => {
    const action = ticketActions.getTicketsSuccess(mockTickets);
    expect(action.type).toEqual(TicketTypes.GET_TICKETS_SUCCESS);
    expect(action.tickets).toEqual(mockTickets);
  });

  it("Should create the getTicketsFailure action", () => {
    const action = ticketActions.getTicketsFailure("Error");
    expect(action.type).toEqual(TicketTypes.GET_TICKETS_FAILURE);
    expect(action.error).toEqual("Error");
  });

  it("Should create getTicketsAsync action", () => {
    const mockActionCreator = ticketActions.getTicketsAsync();
    const mockDispatch = jest.fn();
    mockActionCreator(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(ticketActions.getTicketsStart());
  });
});

describe("UPDATE TICKET ACTIONS", () => {
  const ticketToBeUpdated = {
    _id: "1",
    name: "Lane 1",
    boardId: "1",
    description: "Description",
  };
  it("Should create the  updateTicketStart action", () => {
    expect(ticketActions.updateTicketStart().type).toEqual(
      TicketTypes.UPDATE_TICKET_START
    );
  });

  it("Should create the updateTicketSuccess action", () => {
    const action = ticketActions.updateTicketSuccess(ticketToBeUpdated);
    expect(action.type).toEqual(TicketTypes.UPDATE_TICKET_SUCCESS);
    expect(action.ticket.description).toEqual("Description");
  });

  it("Should create the updateTicketFailure action", () => {
    const action = ticketActions.updateTicketFailure("Error");
    expect(action.type).toEqual(TicketTypes.UPDATE_TICKET_FAILURE);
    expect(action.error).toEqual("Error");
  });

  it("Should create updateTicketAsync action", () => {
    const mockActionCreator = ticketActions.updateTicketAsync();
    const mockDispatch = jest.fn();
    mockActionCreator(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(
      ticketActions.updateTicketStart()
    );
  });
});
