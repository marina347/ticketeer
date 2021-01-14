import React from "react";
import { shallow, mount } from "enzyme";
import { BoardItemList } from "./board-item-list.component";
import Spinner from "../spinner/spinner.component";

describe("BoardItemList component", () => {
  let wrapper;

  const mockGetBoards = jest.fn();
  const isLoading = true;
  const token = "token123";

  beforeEach(() => {
    const mockProps = {
      getBoards: mockGetBoards,
      isLoading,
      token,
      boards: [],
    };

    wrapper = shallow(<BoardItemList {...mockProps} />);
  });

  it("Should render Spinner if isLoading is true", () => {
    expect(wrapper.exists(Spinner)).toBe(true);
  });

  it("Should render board item list if isLoading is false", () => {
    const newWrapper = shallow(
      <BoardItemList
        {...{
          isLoading: false,
          boards: [
            { _id: "1", name: "Board1" },
            { _id: "2", name: "Board2" },
          ],
          getBoards: mockGetBoards,
        }}
      />
    );
    expect(newWrapper.find('[id="board_item_list"]')).not.toBeNull();
  });

  test("Should fire getBoards in componentDidMount", () => {
    mount(<BoardItemList getBoards={mockGetBoards} boards={[]} />);
    expect(mockGetBoards).toBeCalled();
  });
});
