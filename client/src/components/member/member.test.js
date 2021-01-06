import React from "react";
import { shallow } from "enzyme";
import Member from "./member.component";

it("Should render Member component", () => {
  expect(
    shallow(<Member name={"name"} email={"email"} picture={"picture"} />)
  ).toMatchSnapshot();
});
