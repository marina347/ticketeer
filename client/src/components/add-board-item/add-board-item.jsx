import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import FormInput from "../form-input/form-input.component";
import FormButton from "../form-button/form-button.component";
import FormTextArea from "../form-text-area/form-text-area.component";
import { addBoardAsync } from "../../redux/board/board.actions";
import { AddBoardItemContainer } from "./add-board-item.styles";
import {
  selectToken,
  selectCurrentUserId,
} from "../../redux/user/user.selectors";

class AddBoard extends React.Component {
  state = {
    boardName: "",
    boardDescription: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    const { addBoard, token } = this.props;
    event.preventDefault();
    addBoard(
      { name: this.state.boardName, description: this.state.boardDescription },
      token
    );
    this.setState({ boardName: "", boardDescription: "" });
  };

  render() {
    return (
      <AddBoardItemContainer>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            label="Add board"
            type="text"
            name="boardName"
            placeholder="Board name"
            value={this.state.boardName}
            handleChange={this.handleChange}
          />
          <FormTextArea
            name="boardDescription"
            placeholder="Board description"
            cols={20}
            rows={3}
            value={this.state.boardDescription}
            onChange={this.handleChange}
            additionalStylesApplied={true}
          />
          <FormButton type="submit">ADD</FormButton>
        </form>
      </AddBoardItemContainer>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  token: selectToken,
  userId: selectCurrentUserId,
});

const mapDispatchToProps = (dispatch) => ({
  addBoard: (boardItem, token) => dispatch(addBoardAsync(boardItem, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddBoard);
