import React from "react";
import { shallow } from "enzyme";

import { AddLane } from "./add-lane.component";

describe("AddBoard component", () => {
  let wrapper;
  let mockProps;
  let addLane;
  let event;
  let handleSubmitSpy;

  beforeEach(() => {
    addLane = jest.fn();
    event = {
      preventDefault: jest.fn(),
      target: {
        name: "laneName",
        value: "testName",
      },
    };
    mockProps = {
      addLane,
    };

    //spyes will work if in class declaration you use bind in constructor. on anonymous method spyes cant work
    handleSubmitSpy = jest.spyOn(AddLane.prototype, "handleSubmit");

    wrapper = shallow(<AddLane {...mockProps} />);
  });

  it("Should render AddLane component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("Should start onSubmit method when form inside is submitted", () => {
    wrapper
      .find("AddLaneContainer")
      .find('[id="add_lane_form"]')
      .simulate("submit", event);
    expect(handleSubmitSpy).toHaveBeenCalled();
    expect(addLane).toHaveBeenCalled();
    expect(wrapper.state()).toEqual({ laneName: "" });
  });

  it("Should set lanaName to testName if handleChange is fired", () => {
    wrapper.instance().handleChange(event);
    expect(wrapper.state()).toEqual({
      laneName: "testName",
    });
  });

  it("Form input has a prop handleChange", () => {
    expect(
      wrapper
        .find("AddLaneContainer")
        .find('[id="add_lane_form"]')
        .find('[id="add_lane_input"]')
        .prop("handleChange")
    ).not.toEqual(undefined);
  });
});
