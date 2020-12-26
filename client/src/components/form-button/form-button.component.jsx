import React from "react";
import "./form-button.styles.scss";

const FormButton = ({ children, isIconStyle, className, ...otherProps }) => (
  <button className={className} isIconStyle={isIconStyle} {...otherProps}>
    <span>{children}</span>
  </button>
);

export default FormButton;
