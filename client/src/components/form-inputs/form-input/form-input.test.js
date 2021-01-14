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

  it("Should call handleChange method when input changes", () => {
    wrapper.find('[id="form-input"]').simulate("change");
    expect(mockHandleChange).toHaveBeenCalled();
  });

  it("Should render form label", () => {
    expect(wrapper.exists('[id="form-input-label"]')).toBe(true);
  });

  it("Should not render form label", () => {
    const mockNewProps = {
      label: "",
      containerClassName: "class-1",
      handleChange: mockHandleChange,
    };

    const newWrapper = shallow(<FormInput {...mockNewProps} />);
    expect(newWrapper.exists('[id="form-input-label"]')).toBe(false);
  });
});
