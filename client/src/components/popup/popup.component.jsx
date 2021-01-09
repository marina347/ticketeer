import React from "react";
import FormButton from "../form-button/form-button.component";
import "./popup.styles.scss";

const Popup = (Content) => {
  const PopupWithContent = ({ onPopupClose, ...otherProps }) => {
    return (
      <div id="popup" className="popup">
        <div id="popup_content" className="popup__content">
          <FormButton
            onClick={onPopupClose}
            class="btn btn-close btn-close--position-2"
          >
            &times;
          </FormButton>
          <Content id="content" closePopup={onPopupClose} {...otherProps} />
        </div>
      </div>
    );
  };
  return PopupWithContent;
};

export default Popup;
