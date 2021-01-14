import React from "react";
import { shallow } from "enzyme";
import { BoardPage } from "./board.component";

describe("Board page", () => {
  let wrapper;
  let board;

  beforeEach(() => {
    board = {
      _id: "1",
    };
    wrapper = shallow(<BoardPage board={board} />);
  });

  it("Should render Board page", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
