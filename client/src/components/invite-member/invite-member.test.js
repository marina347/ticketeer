import React from "react";
import { shallow } from "enzyme";
import { InviteMember } from "./invite-member.component";
import EnvVariables from "../../env-variables";

describe("InviteMember component", () => {
  let wrapper;

  const mockGenerateLink = jest.fn();
  const boardLink = "";

  beforeEach(() => {
    const mockProps = {
      generateLink: mockGenerateLink,
      boardLink,
    };

    wrapper = shallow(<InviteMember {...mockProps} />);
  });

  it("Should render InviteMember component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("Should render empty board link in div", () => {
    const boardLink = wrapper
      .find("InviteContainer")
      .find('[id="board-link"]')
      .text();
    expect(boardLink).toBe("");
  });

  it("Should render board link in div", () => {
    const newMockProps = {
      generateLink: mockGenerateLink,
      boardLink: "1234",
    };

    const newWrapper = shallow(<InviteMember {...newMockProps} />);
    const boardLink = newWrapper
      .find("InviteContainer")
      .find('[id="board-link"]')
      .text();
    expect(boardLink).toBe(
      `${EnvVariables.REACT_APP_SERVER_PATH}/home/boards/join-board/1234`
    );
  });

  it("Form button should have prop onClick", () => {
    expect(
      wrapper
        .find("InviteContainer")
        .find('[id="board-link-button"]')
        .prop("onClick")
    ).not.toEqual(undefined);
  });
});
