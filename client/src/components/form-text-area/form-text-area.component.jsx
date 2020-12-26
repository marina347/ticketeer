import React from "react";
import "./form-text-area.styles.scss";

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
}) => {
  return (
    <div class="text-area">
      {label ? <label class="text-area__label">{label}</label> : null}
      <br />
      <textarea
        className="text-area__input"
        name={name}
        rows={rows}
        cols={cols}
        onChange={onChange}
        value={value}
        placeholder={placeholder ? placeholder : ""}
        additionalStylesApplied={additionalStylesApplied}
      ></textarea>
    </div>
  );
};

export default FormTextArea;
