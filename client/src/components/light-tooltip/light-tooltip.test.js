import React from "react";
import { shallow } from "enzyme";
import LightTooltip from "./light-tooltip.component";

describe("LightTooltip component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<LightTooltip />);
  });

  it("Should render LighTooltip component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
