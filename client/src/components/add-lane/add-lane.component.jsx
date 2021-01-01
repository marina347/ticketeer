import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import FormButton from "../form-button/form-button.component";
import FormInput from "../form-inputs/form-input/form-input.component";
import { addLaneAsync } from "../../redux/lane/lane.actions";
import { selectToken } from "../../redux/user/user.selectors";


export class AddLane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      laneName: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit(event) {
    const { boardId, addLane, token, closePopup } = this.props;
    event.preventDefault();
    addLane(this.state.laneName, boardId, token);
    this.setState({ laneName: "" });
    closePopup();
  }

  render() {
    return (
      <form
        id="add-lane-form"
        className="add-form"
        onSubmit={this.handleSubmit}
      >
        <h3 className="add-form__heading">ADD NEW LANE</h3>
        <FormInput
          id="add_lane_input"
          label="Lane name"
          type="text"
          name="laneName"
          placeholder="Lane name"
          value={this.state.laneName}
          handleChange={this.handleChange}
        />
        <FormButton
          className="btn btn-inverted u-animation-none u-margin-top-medium"
          type="submit"
        >
          ADD
        </FormButton>
      </form>
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
