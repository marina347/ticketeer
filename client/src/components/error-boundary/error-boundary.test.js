import React from "react";
import { shallow } from "enzyme";
import ErrorBoundary from "./error-boundary.component";

function Something() {
  return null;
}

describe("ErrorBoundary component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <ErrorBoundary>
        <Something />
      </ErrorBoundary>
    );
  });

  it("Should render ErrorBoundary component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("Should  render error container if there is error", () => {
    const error = new Error("error");
    wrapper.find(Something).simulateError(error);
    expect(wrapper.find('[id="error"]').exists()).toBe(true);
  });
  it("Should not render error container if there is no error", () => {
    expect(wrapper.find('[id="error"]').exists()).toBe(false);
  });
});
