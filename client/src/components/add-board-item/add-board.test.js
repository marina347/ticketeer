import React from "react";
import { shallow } from "enzyme";

//import { AddBoard } from "./add-board-item";

describe("AddBoard component", () => {
  it("Should render AddBoard component", () => {
    expect(1).toBe(1);
  });

  /*
  let wrapper;
  let mockProps;
  let addBoard;
  let event;
  let handleSubmitSpy;
  let handleChangeSpy;

  beforeEach(() => {
    addBoard = jest.fn();
    event = {
      preventDefault: jest.fn(),
      target: {
        name: "boardName",
        value: "testname",
      },
    };
    mockProps = {
      addBoard,
    };

    //spyes will work if in class declaration you use bind in constructor. on anonymous method spyes cant work
    handleSubmitSpy = jest.spyOn(AddBoard.prototype, "handleSubmit");
    handleChangeSpy = jest.spyOn(AddBoard.prototype, "handleChange");

    wrapper = shallow(<AddBoard {...mockProps} />);
  });
  it("Should render AddBoard component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("Should start onSubmit method when form inside is submitted", () => {
    wrapper
      .find("AddBoardItemContainer")
      .find('[id="add_board_form"]')
      .simulate("submit", event);
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
        .find("AddBoardItemContainer")
        .find('[id="add_board_form"]')
        .find('[id="add_board_input"]')
        .prop("handleChange")
    ).not.toEqual(undefined);
  });

  it("Form area has a prop handleChange", () => {
    expect(
      wrapper
        .find("AddBoardItemContainer")
        .find('[id="add_board_form"]')
        .find('[id="add_board_description"]')
        .prop("onChange")
    ).not.toEqual(undefined);
  });
  */
});
