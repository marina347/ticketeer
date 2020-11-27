import React from "react";
import { shallow } from "enzyme";
import FormButton from "./form-button.component";

it("Should render FormButton component", () => {
  expect(shallow(<FormButton />)).toMatchSnapshot();
});
