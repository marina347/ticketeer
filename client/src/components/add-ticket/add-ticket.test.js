import React from "react";
import { shallow, mount } from "enzyme";

import { AddTicket } from "./add-ticket.component";

describe("AddTicket component", () => {
  let wrapper;
  let mockProps;
  let addTicket;
  let event;
  let currentUser;

  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, "useState");
  useStateSpy.mockImplementation((init) => [init, setState]);

  beforeEach(() => {
    currentUser = { id: "1" };
    addTicket = jest.fn();
    event = {
      preventDefault: jest.fn(),
      target: {
        name: "ticketName",
        value: "testName",
      },
    };
    mockProps = {
      addTicket,
      currentUser,
    };

    wrapper = shallow(<AddTicket {...mockProps} />);
  });

  it("Should render AddTicket component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("Should start onSubmit method when form inside is submitted", () => {
    //cant save duplicated lines to one variable and reuse it because change of prop is not reflected on that variable
    //like this const form =  wrapper.find("AddTicketItemContainer").find('[id="add_ticket_form"]') wont work below
    wrapper.find('[id="add_ticket_form"]').simulate("submit", event);
    expect(addTicket).toHaveBeenCalled();

    expect(
      wrapper
        .find('[id="add_ticket_form"]')
        .find('[id="add_ticket_input"]')
        .prop("value")
    ).toBe("");
  });

  it("Form text area has a prop onChange", () => {
    expect(
      wrapper
        .find('[id="add_ticket_form"]')
        .find('[id="add_ticket_input"]')
        .prop("onChange")
    ).not.toEqual(undefined);
  });
});
