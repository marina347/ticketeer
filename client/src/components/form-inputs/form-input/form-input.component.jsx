import React from "react";
import "../form-inputs.styles.scss";

const FormInput = ({
  handleChange,
  label,
  containerClassName,
  ...otherProps
}) => {
  return (
    <div className="form-input-container">
      <input
        className="form-input-container__input"
        required
        onChange={handleChange}
        {...otherProps}
      ></input>
      {label ? <label className="form-input-container__label">{label}</label> : null}
    </div>
  );
};

export default FormInput;
