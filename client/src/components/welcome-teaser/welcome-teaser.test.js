import React from "react";
import { shallow } from "enzyme";
import WelcomeTeaser from "./welcome-teaser.component";

describe("WelcomeTeaser component", () => {
  let wrapper;
  let displayName;

  beforeEach(() => {
    displayName = "John";
    wrapper = shallow(<WelcomeTeaser displayName={displayName} />);
  });

  it("Should render WelcomeTeaser component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("Should render text in SecondaryHeading component", () => {
    const secondaryHeadingComponent = wrapper
      .find('[id="welcome_teaser"]')
      .childAt(0);
    expect(secondaryHeadingComponent.prop("text")).toBe("Hello John!");
  });
});
