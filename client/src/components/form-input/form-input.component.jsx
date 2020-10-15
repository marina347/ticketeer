import React from "react";
import { FormInputItem, FormInputLabel } from "./form-input.styles";

const FormInput = ({ handleChange, label, containerClassName, ...otherProps }) => {
  return (
    <div className={containerClassName}>
      {label ? <FormInputLabel>{label}</FormInputLabel> : null}
      <br />
      <FormInputItem onChange={handleChange} {...otherProps}></FormInputItem>
    </div>
  );
};

export default FormInput;
