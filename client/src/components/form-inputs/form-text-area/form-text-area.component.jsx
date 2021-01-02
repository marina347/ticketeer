import React from "react";
import "../form-inputs.styles.scss";

const FormTextArea = ({
  label,
  name,
  rows,
  cols,
  onChange,
  value,
  placeholder,
  additionalStylesApplied,
  textAreaItemClassName,
  required,
  ...otherProps
}) => {
  return (
    <div class="form-input">
      <textarea
        className="form-input__input"
        name={name}
        rows={rows}
        cols={cols}
        onChange={onChange}
        value={value}
        placeholder={placeholder ? placeholder : ""}
        additionalStylesApplied={additionalStylesApplied}
        required={required ? true : false}
        {...otherProps}
      ></textarea>
      {label ? (
        <label class="form-input__label">{label}</label>
      ) : null}
    </div>
  );
};

export default FormTextArea;
