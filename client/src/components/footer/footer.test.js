import React from "react";
import { shallow } from "enzyme";
import "jest-styled-components";
import Footer from "./footer.component";

describe("Footer component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Footer />);
  });

  it("Should render Footer component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
