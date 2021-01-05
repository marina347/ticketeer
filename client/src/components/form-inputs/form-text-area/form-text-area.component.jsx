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
  textAreaItemClassName,
  required,
  ...otherProps
}) => {
  return (
    <div className="form-input">
      <textarea
        id="form-textarea"
        className="form-input__input"
        name={name}
        rows={rows}
        cols={cols}
        onChange={onChange}
        value={value}
        placeholder={placeholder ? placeholder : ""}
        required={required ? true : false}
        {...otherProps}
      ></textarea>
      {label ? (
        <label id="form-textarea-label" className="form-input__label">
          {label}
        </label>
      ) : null}
    </div>
  );
};

export default FormTextArea;
