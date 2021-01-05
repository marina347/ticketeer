import React from "react";
import { shallow } from "enzyme";
import "jest-styled-components";
import FormButton from "./form-button.component";

describe("FormButton component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<FormButton />);
  });

  it("Should render FormButton component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
