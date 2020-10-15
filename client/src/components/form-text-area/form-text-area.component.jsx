import React from "react";
import { FormTextAreaLabel, FormTextAreaItem } from "./form-text-area.styles";

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
    <div>
      {label ? <FormTextAreaLabel>{label}</FormTextAreaLabel> : null}
      <br />
      <FormTextAreaItem
        className={textAreaItemClassName}
        name={name}
        rows={rows}
        cols={cols}
        onChange={onChange}
        value={value}
        placeholder={placeholder ? placeholder : ""}
        additionalStylesApplied={additionalStylesApplied}
      ></FormTextAreaItem>
    </div>
  );
};

export default FormTextArea;
