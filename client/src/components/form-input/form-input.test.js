import React from "react";
import { shallow } from "enzyme";

import FormInput from "./form-input.component";

describe("FormInput component", () => {
  let wrapper;
  let mockHandleChange;

  beforeEach(() => {
    mockHandleChange = jest.fn();
    const mockProps = {
      label: "name",
      containerClassName: "class-1",
      handleChange: mockHandleChange,
    };
    wrapper = shallow(<FormInput {...mockProps} />);
  });

  it("Should render FormInput component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("Should call handleChange merhod when input changes", () => {
    wrapper.find("FormInputItem").simulate("change");
    expect(mockHandleChange).toHaveBeenCalled();
  });

  it("Should render FormInputLabel if there is a label", () => {
    expect(wrapper.exists("FormInputLabel")).toBe(true);
  });

  it("Should not render FormInputLabel if there is no label", () => {
    const mockNewProps = {
      label: "",
      containerClassName: "class-1",
      handleChange: mockHandleChange,
    };

    const newWrapper = shallow(<FormInput {...mockNewProps} />);
    expect(newWrapper.exists("FormInputLabel")).toBe(false);
  });
});
