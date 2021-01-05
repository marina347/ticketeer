import React from "react";
import "./form-button.styles.scss";

const FormButton = ({ children, ...otherProps }) => (
  <button {...otherProps}>
    <span>{children}</span>
  </button>
);

export default FormButton;
