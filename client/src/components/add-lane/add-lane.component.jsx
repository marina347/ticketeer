import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import FormButton from "../form-button/form-button.component";
import FormInput from "../form-input/form-input.component";
import { AddLaneContainer } from "../add-lane/add-lane.styles";
import { addLaneAsync } from "../../redux/lane/lane.actions";
import { selectToken } from "../../redux/user/user.selectors";

class AddLane extends React.Component {
  state = {
    laneName: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    const { boardId, addLane, token } = this.props;
    event.preventDefault();
    addLane(this.state.laneName, boardId, token);
    this.setState({ laneName: "" });
  };

  render() {
    return (
      <AddLaneContainer>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            label="Add lane"
            type="text"
            name="laneName"
            placeholder="Lane name"
            value={this.state.laneName}
            handleChange={this.handleChange}
          />
          <FormButton type="submit">ADD</FormButton>
        </form>
      </AddLaneContainer>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  token: selectToken,
});

const mapDispatchToProps = (dispatch) => ({
  addLane: (name, boardId, token) =>
    dispatch(addLaneAsync(name, boardId, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddLane);
