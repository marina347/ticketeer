import React from "react";
import { shallow } from "enzyme";
import Spinner from "./spinner.component";

describe("Spinner", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Spinner />);
  });

  it("Should render Spinner", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
