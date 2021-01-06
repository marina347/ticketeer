import React from "react";
import { shallow } from "enzyme";

import { AddBoardItem } from "./add-board-item-form.component";

describe("AddBoard component", () => {
  let wrapper;
  let mockProps;
  let addBoard;
  let event;
  let closePopup;
  let handleSubmitSpy;
  let handleChangeSpy;

  beforeEach(() => {
    addBoard = jest.fn();
    closePopup = jest.fn();
    event = {
      preventDefault: jest.fn(),
      target: {
        name: "boardName",
        value: "testname",
      },
    };
    mockProps = {
      addBoard,
      closePopup,
    };

    //spyes will work if in class declaration you use bind in constructor. on anonymous method spyes cant work
    handleSubmitSpy = jest.spyOn(AddBoardItem.prototype, "handleSubmit");
    handleChangeSpy = jest.spyOn(AddBoardItem.prototype, "handleChange");

    wrapper = shallow(<AddBoardItem {...mockProps} />);
  });
  it("Should render AddBoard component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("Should start onSubmit method when form inside is submitted", () => {
    wrapper.find('[id="add_board_form"]').simulate("submit", event);
    expect(handleSubmitSpy).toHaveBeenCalled();
    expect(addBoard).toHaveBeenCalled();
    expect(wrapper.state()).toEqual({ boardName: "", boardDescription: "" });
  });

  it("Should set boardName to testname if handleChange is fired", () => {
    wrapper.instance().handleChange(event);
    expect(wrapper.state()).toEqual({
      boardName: "testname",
      boardDescription: "",
    });
  });

  it("Form input has a prop handleChange", () => {
    expect(
      wrapper
        .find('[id="add_board_form"]')
        .find('[id="add_board_input"]')
        .prop("handleChange")
    ).not.toEqual(undefined);
  });

  it("Form area has a prop handleChange", () => {
    expect(
      wrapper
        .find('[id="add_board_form"]')
        .find('[id="add_board_description"]')
        .prop("onChange")
    ).not.toEqual(undefined);
  });
});
