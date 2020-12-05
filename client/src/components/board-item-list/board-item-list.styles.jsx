import styled from "styled-components";
import { BoardItemContainer } from "../board-item/board-item.styles";

export const BoardItemListContainer = styled.div`
  width: 85vw;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  grid-gap: 20px;
  grid-auto-rows: 1fr;
  justify-content: space-around;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

BoardItemContainer.displayName = "BoardItemListContainer";
