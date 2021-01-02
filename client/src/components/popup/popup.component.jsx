import React from "react";
import "./popup.styles.scss";

const Popup = (Content) => {
  const PopupWithContent = ({ onPopupClose, ...otherProps }) => {
    return (
      <div className="popup">
        <div className="popup__content">
          <button onClick={onPopupClose} class="popup__close">
            &times;
          </button>
          <Content closePopup={onPopupClose} {...otherProps} />
        </div>
      </div>
    );
  };
  return PopupWithContent;
};

export default Popup;
