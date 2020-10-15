import styled, { css } from "styled-components";

export const FormTextAreaStyles = css`
  padding: 5px;
  margin: 10px;
`;

export const FormTextAreaAdditionalStyles = css`
  padding: 5px;
  margin: 10px;
  width: 300px;
  background: #fff;
  font: inherit;
  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.1);
  border: 0;
  outline: 0;
  padding: 19px 14px;
`;

export const FormTextAreaItem = styled.textarea`
  ${FormTextAreaStyles}
  ${props => (props.additionalStylesApplied ? FormTextAreaAdditionalStyles : '')};
`;

export const FormTextAreaLabel = styled.label`
  ${FormTextAreaStyles}
  font-size: 20px;
`;