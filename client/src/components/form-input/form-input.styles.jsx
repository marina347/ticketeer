import styled, { css } from "styled-components";

export const FormInputStyles = css`
  padding: 5px;
  margin: 10px;
`;

export const FormInputItem = styled.input`
  ${FormInputStyles}
  width: 300px;
  background: #fff;
  font: inherit;
  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.1);
  border: 0;
  outline: 0;
  padding: 19px 14px;
`;

export const FormInputLabel = styled.label`
  ${FormInputStyles}
  font-size: 20px;
`;
