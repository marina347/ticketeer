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

  it("Should not apply FormButtonIconStyles if isIconStyle not provided", () => {
    expect(wrapper.find("FormButtonContainer")).toHaveStyleRule(
      "width",
      "100px"
    );
  });

  it("Should apply FormButtonIconStyles if isIconStyle set to true", () => {
    expect(
      shallow(<FormButton isIconStyle={true} />).find("FormButtonContainer")
    ).toHaveStyleRule("width", "19px");
  });
});
