import React from "react";
import { shallow } from "enzyme";
import "jest-styled-components";
import { SecondaryHeading } from "./secondary-heading.component";

describe("SecondaryHeading component", () => {
  let wrapper;
  let text;
  beforeEach(() => {
    text = "Text";
    wrapper = shallow(<SecondaryHeading text={text} />);
  });

  it("Should render SecondaryHeading component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("Should render secondary heading text", () => {
    const secondaryHeadingText = wrapper
      .find('[id="secondary_heading"]')
      .text();
    expect(secondaryHeadingText).toBe("Text");
  });
});
