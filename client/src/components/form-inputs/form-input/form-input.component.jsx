import React from "react";
import "../form-inputs.styles.scss";

const FormInput = ({
  handleChange,
  label,
  containerClassName,
  ...otherProps
}) => {
  return (
    <div className="form-input">
      <input
        className="form-input__input"
        required
        onChange={handleChange}
        {...otherProps}
      ></input>
      {label ? <label className="form-input__label">{label}</label> : null}
    </div>
  );
};

export default FormInput;
