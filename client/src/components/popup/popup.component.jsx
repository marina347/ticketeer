import React from "react";
import "./popup.styles.scss";

const Popup = (Content) => {
  const PopupWithContent = ({ onPopupClose, ...otherProps }) => {
    return (
      <div id="popup" className="popup">
        <div id="popup_content" className="popup__content">
          <button onClick={onPopupClose} class="popup__close">
            &times;
          </button>
          <Content id="content" closePopup={onPopupClose} {...otherProps} />
        </div>
      </div>
    );
  };
  return PopupWithContent;
};

export default Popup;
