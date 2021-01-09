import React from "react";
import { shallow } from "enzyme";
import Notification from "./notification.component";

describe("Notification component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Notification />);
  });

  it("Should render Notification component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
