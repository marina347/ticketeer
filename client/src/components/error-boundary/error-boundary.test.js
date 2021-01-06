import React from "react";
import { shallow } from "enzyme";
import ErrorBoundary from "./error-boundary.component";

describe("ErrorBoundary component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ErrorBoundary />);
  });

  it("Should render ErrorBoundary component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("Should  render error container if there is error", () => {
    wrapper.setState({ hasError: true });
    expect(wrapper.find('[id="error"]').exists()).toBe(true);
  });
  it("Should not render error container if there is no error", () => {
    expect(wrapper.find('[id="error"]').exists()).toBe(false);
  });
  
});
