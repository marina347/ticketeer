import React from "react";
import { shallow } from "enzyme";
import "jest-styled-components";
import { SideMenu } from "./side-menu.component";

describe("SideMenu component", () => {
  let wrapper;
  let currentUser;

  beforeEach(() => {
    currentUser = {
      picture: "test/picture",
      email: "test@test.com",
      name: "John",
    };
    wrapper = shallow(<SideMenu currentUser={currentUser} />);
  });

  it("Should render SideMenu component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("Should propagate props to child component", () => {
    const childComponent = wrapper.find('[id="side_menu"]').childAt(0);
    expect(childComponent.prop("email")).toBe(currentUser.email);
    expect(childComponent.prop("name")).toBe(currentUser.name);
    expect(childComponent.prop("url")).toBe(currentUser.picture);
  });
});
