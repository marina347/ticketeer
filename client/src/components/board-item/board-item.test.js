import React from "react";
import { shallow} from "enzyme";
import { BoardItem } from "./board-item.component";

describe("BoardItem component", () => {
  let wrapper;
  const mockMatch = {
    url: "/home",
  };
  const mockHistory = {
    push: jest.fn(),
  };
  const mockBoard = { _id: "1", name: "Board1" };
  const id = "1";

  beforeEach(() => {
    const mockProps = {
      history: mockHistory,
      match: mockMatch,
      board: mockBoard,
      _id: id,
    };

    wrapper = shallow(<BoardItem {...mockProps} />);
  });

  it("Should render BoardItem component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("Should call history.push with the right value when board item clicked", () => {
    wrapper.find('[id="board_item"]').simulate("click");
    expect(mockHistory.push).toHaveBeenCalledWith(
      `${mockMatch.url}/boards/${id}`
    );
  });

  it("Should render the board name as the text", () => {
    const boardNameText = wrapper.find('[id="board_item_name"]').text();
    expect(boardNameText).toBe("Board1");
  });
});
