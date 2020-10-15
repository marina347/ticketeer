import styled from "styled-components";

export const BoardItemContainer = styled.div`
  display: flex;
  font-size: 22px;
  font-family: "Nunito", sans-serif;
  font-weight: bold;
  background-color: #644cad;
  border: 1px solid grey;
  flex-direction: column;
  padding: 40px;
  cursor: pointer;
  -moz-osx-font-smoothing: grayscale;
  backface-visibility: hidden;
  opacity: 0.8;
  transition: transform 0.25s ease-out;
  overflow: hidden;
  color: gainsboro;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    padding: 30px;
  }
`;
