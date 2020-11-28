import styled, { css } from "styled-components";

export const FormButtonBasicStyles = css`
  letter-spacing: 2px;
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
  border: 2px solid #644cad;
  border-radius: 2px;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.1);
`;

export const FormButtonNonIconStyles = css`
  width: 100px;
  padding: 7px 0px;
  font-size: 14px;
`;

export const FormButtonIconStyles = css`
  width: 19px;
  height: 22px;
  padding: 3px;
  margin: 5px;
  font-size: 9px;
  position: absolute;
  right: 0px;
  top: 0px;
`;

export const FormButtonContainer = styled.button`
${FormButtonBasicStyles}
${(props) =>
  props.isIconStyle ? FormButtonIconStyles : FormButtonNonIconStyles};
  }
`;

FormButtonContainer.displayName = "FormButtonContainer";
