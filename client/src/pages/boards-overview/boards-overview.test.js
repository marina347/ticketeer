import React from "react";
import { shallow } from "enzyme";
import { BoardsOverviewPage } from "./boards-overview.component";

describe("Boards overview page", () => {
  let wrapper;
  let name = "John";

  beforeEach(() => {
    wrapper = shallow(<BoardsOverviewPage name={name} />);
  });

  it("Should render Board overview page", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
