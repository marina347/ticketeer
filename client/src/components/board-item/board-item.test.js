import React from "react";
import { shallow, mount, render } from "enzyme";
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

  it("Should call history.push with the right value when BoardItemContainer clicked", () => {
    wrapper.find("BoardItemContainer").simulate("click");
    expect(mockHistory.push).toHaveBeenCalledWith(
      `${mockMatch.url}/boards/${id}`
    );
  });

  it("Should render the board name as the text", () => {
    const boardNameText = wrapper.find('[id="board_name_text"]').text();
    expect(boardNameText).toBe("Board1");
  });

  it("Should render the cut board name as the text if name has more than 20 chars", () => {
    const mockNewProps = {
      history: mockHistory,
      match: mockMatch,
      board: { _id: "1", name: "Board1234567890123456789012345" },
      _id: id,
    };
    const newWrapper = shallow(<BoardItem {...mockNewProps} />);
    const boardNameText = newWrapper.find('[id="board_name_text"]').text();
    expect(boardNameText).toBe("Board12345678901234567890123...");
  });
});
