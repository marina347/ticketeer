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
    wrapper.find('[id="form-textarea"]').simulate("change");
    expect(mockOnChange).toHaveBeenCalled();
  });

  it("Should render form label", () => {
    expect(wrapper.exists('[id="form-textarea-label"]')).toBe(true);
  });

  it("Should not render form label", () => {
    const newWrapper = shallow(<FormTextArea {...mockWithAnotherProps} />);
    expect(newWrapper.exists('[id="form-textarea-label"]')).toBe(false);
  });

  it("Should set placeholder to empty string if not provided", () => {
    const newWrapper = shallow(<FormTextArea {...mockWithAnotherProps} />);
    expect(newWrapper.find('[id="form-textarea"]').prop("placeholder")).toBe(
      ""
    );
  });
});
