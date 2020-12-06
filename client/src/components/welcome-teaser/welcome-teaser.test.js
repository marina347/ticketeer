import React from "react";
import { shallow } from "enzyme";
import WelcomeTeaser from "./welcome-teaser.component";

it("Should render WelcomeTeaser component", () => {
  expect(shallow(<WelcomeTeaser displayName="name" />)).toMatchSnapshot();
});
