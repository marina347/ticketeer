import React from "react";
import { FormButtonContainer } from "./form-button.styles";

const FormButton = ({ children, isIconStyle, ...otherProps }) => (
  <FormButtonContainer isIconStyle={isIconStyle} {...otherProps}>
    {children}
  </FormButtonContainer>
);

export default FormButton;
