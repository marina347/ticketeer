import React from "react";
import { shallow } from "enzyme";
import { HeaderComponent } from "./header.component";

describe("Header component", () => {
  let wrapper;
  let mockProps;
  let currentUser;
  let history;
  let mockPush;
  beforeEach(() => {
    mockPush = jest.fn();
    currentUser = {
      name: "John",
    };
    history = {
      push: mockPush,
    };
    mockProps = {
      currentUser,
      history,
    };
    wrapper = shallow(<HeaderComponent {...mockProps} />);
  });

  it("Should render Header component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("Should render only Logo if current user is null", () => {
    const newMockProps = {
      currentUser: null,
      history,
    };
    const newWrapper = shallow(<HeaderComponent {...newMockProps} />);
    expect(
      newWrapper.find('[id="header"]').find('[id="header_logo_box"]')
    ).not.toBeNull();
    expect(
      newWrapper.find('[id="header"]').find('[id="side_menu"]').exists()
    ).toBe(false);
  });

  it("Should render Logo and SideMenu if current user is not null", () => {
    expect(
      wrapper.find('[id="header"]').find('[id="header_logo_box"]')
    ).not.toBeNull();
    expect(
      wrapper.find('[id="header"]').find('[id="side_menu"]')
    ).not.toBeNull();
  });

  it("Should navigate to home page if logo is clicked", () => {
    wrapper
      .find('[id="header"]')
      .find('[id="header_logo_box"]')
      .simulate("click");
    expect(mockPush).toHaveBeenCalled();
  });
});
