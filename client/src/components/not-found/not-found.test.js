import React from "react";
import { shallow } from "enzyme";
import { NotFound } from "./not-found.component";

describe("NotFound component", () => {
  let wrapper;
  let history;
  let mockPush;
  beforeEach(() => {
    mockPush = jest.fn();
    history = {
      push: mockPush,
    };
    wrapper = shallow(<NotFound history={history} />);
  });

  it("Should render NotFound component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("Clicking home button should call push on history", () => {
    wrapper.find('[id="not_found"]').find('[id="go_home"]').simulate("click");
    expect(mockPush).toHaveBeenCalled();
  });
});
