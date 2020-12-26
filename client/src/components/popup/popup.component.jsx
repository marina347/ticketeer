import React from "react";
import "./popup.styles.scss";

const Popup = (WrapperComponent) => {
  const PopupWithContent = ({ popupOpened, onPopupClose, ...otherProps }) => {
    return popupOpened ? (
      <div class="popup">
        <div class="popup__content">
          <button onClick={onPopupClose} class="popup__close">
            &times;
          </button>
          <PopupWithContent {...otherProps} />
        </div>
      </div>
    ) : null;
  };
  return PopupWithContent;
};

export default Popup;
