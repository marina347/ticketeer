import React from "react";
import "../form-input/form-input.styles.scss";

const FormInput = ({
  handleChange,
  label,
  containerClassName,
  ...otherProps
}) => {
  return (
    <div className="input-container">
      {label ? <label className="label">{label}</label> : null}
      <br />
      <input className="input" onChange={handleChange} {...otherProps}></input>
    </div>
  );
};

export default FormInput;
