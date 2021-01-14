import React from "react";
import { shallow } from "enzyme";
import "jest-styled-components";
import { PrimaryHeading } from "./primary-heading.component";

describe("PrimaryHeading component", () => {
  let wrapper;
  let mockProps;
  beforeEach(() => {
    mockProps = {
      mainText: "Main text",
      subText: "Sub text",
    };
    wrapper = shallow(<PrimaryHeading {...mockProps} />);
  });

  it("Should render PrimaryHeading component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("Should render main heading text", () => {
    const primaryHeadingText = wrapper
      .find('[id="primary_heading_main"]')
      .text();
    expect(primaryHeadingText).toBe("Main text");
  });

  it("Should render main heading text", () => {
    const subHeadingText = wrapper.find('[id="primary_heading_sub"]').text();
    expect(subHeadingText).toBe("Sub text");
  });
});
