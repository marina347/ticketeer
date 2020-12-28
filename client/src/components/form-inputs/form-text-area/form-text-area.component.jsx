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
}) => {
  return (
    <div class="form-input-container">
      <textarea
        className="form-input-container__input"
        name={name}
        rows={rows}
        cols={cols}
        onChange={onChange}
        value={value}
        placeholder={placeholder ? placeholder : ""}
        additionalStylesApplied={additionalStylesApplied}
      ></textarea>
      {label ? <label class="form-input-container__label">{label}</label> : null}
    </div>
  );
};

export default FormTextArea;
