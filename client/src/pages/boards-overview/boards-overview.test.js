import React from "react";
import { shallow } from "enzyme";
import BoardsOverviewPage from "./boards-overview.component";

describe("Boards overview page", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BoardsOverviewPage />);
  });

  it("Should render Board overview page", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
