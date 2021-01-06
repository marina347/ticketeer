import React from "react";
import { shallow } from "enzyme";
import Popup from "./popup.component";

const Content = () => {
  return <div></div>;
};

describe("Popup component", () => {
  let wrapper;
  let mockOnPopupClose;
  const PopupWithContent = Popup(Content);
  beforeEach(() => {
    mockOnPopupClose = jest.fn();

    wrapper = shallow(<PopupWithContent onPopupClose={mockOnPopupClose} />);
  });

  it("Should render Popup component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("Content should have closePopup prop", () => {
    expect(
      wrapper
        .find('[id="popup"]')
        .find('[id="popup_content"]')
        .find('[id="content"]')
        .prop("closePopup")
    ).not.toEqual(undefined);
  });
});
