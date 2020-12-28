import React from "react";
import { shallow } from "enzyme";
import "jest-styled-components";
import FormTextArea from "./form-text-area.component";

describe("FormTextArea component", () => {
  let wrapper;
  let mockOnChange;

  const mockWithAnotherProps = {
    label: "",
    value: "text",
    onChange: mockOnChange,
    additionalStylesApplied: false,
  };

  beforeEach(() => {
    mockOnChange = jest.fn();
    const mockProps = {
      label: "label",
      value: "text",
      onChange: mockOnChange,
      additionalStylesApplied: true,
      placeholder: "Board item",
    };
    wrapper = shallow(<FormTextArea {...mockProps} />);
  });

  it("Should render FormTextArea component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("Should call onChange method when input changes", () => {
    wrapper.find("FormTextAreaItem").simulate("change");
    expect(mockOnChange).toHaveBeenCalled();
  });

  it("Should render FormInputLabel if there is label", () => {
    expect(wrapper.exists("FormTextAreaLabel")).toBe(true);
  });

  it("Should not render FormInputLabel if there is no label", () => {
    const newWrapper = shallow(<FormTextArea {...mockWithAnotherProps} />);
    expect(newWrapper.exists("FormTextAreaLabel")).toBe(false);
  });

  it("Should set border to 0 if additionalStylesApplied is true ", () => {
    expect(wrapper.find("FormTextAreaItem")).toHaveStyleRule("border", "0");
  });

  it("Should not set border if additionalStylesApplied is false", () => {
    const newWrapper = shallow(<FormTextArea {...mockWithAnotherProps} />);
    expect(newWrapper.find("FormTextAreaItem")).not.toHaveStyleRule(
      "border",
      "0"
    );
  });

  it("Should set placeholder to empty string if not provided", () => {
    const newWrapper = shallow(<FormTextArea {...mockWithAnotherProps} />);
    expect(newWrapper.find("FormTextAreaItem").prop("placeholder")).toBe("");
  });
});
