import React from "react";
import FormButton from "../form-button/form-button.component";
import FormInput from "../form-inputs/form-input/form-input.component";
import FormTextArea from "../form-inputs/form-text-area/form-text-area.component";
import "../editable-input/editable-input.styles.scss";

class EditableInput extends React.Component {
  state = {
    value: this.props.defaultName,
    isInEditMode: false,
  };

  changeEditMode = (e) => {
    this.setState({
      isInEditMode: !this.state.isInEditMode,
    });
  };

  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  updateComponentValue = (e) => {
    const { updateTicket, ticketItem, fieldName, token } = this.props;
    this.setState({
      isInEditMode: false,
    });
    if (ticketItem !== null) {
      ticketItem[fieldName] = this.state.value;
      updateTicket(ticketItem, token);
    }
  };

  renderEditView = () => {
    const { fieldType, label, fieldName, editViewClassName } = this.props;
    return (
      <div className="editable-input-container">
        {fieldType === "textarea" ? (
          <FormTextArea
            label={label}
            name={fieldName}
            onChange={this.onChange}
            value={this.state.value}
          ></FormTextArea>
        ) : (
          <FormInput
            label={label}
            type="text"
            value={this.state.value}
            onChange={this.onChange}
            name={fieldName}
          />
        )}
        <FormButton
          className="btn btn-main u-animation-none btn--small"
          onClick={this.changeEditMode}
        >
          &times;
        </FormButton>
        <FormButton
          className="btn btn-main u-animation-none btn--small"
          onClick={this.updateComponentValue}
        >
          OK
        </FormButton>
      </div>
    );
  };

  renderDefaultView = () => {
    const { label, placeholder, fieldType, fieldName } = this.props;
    return (
      <div onFocus={this.changeEditMode}>
        {fieldType === "textarea" ? (
          <FormTextArea
            label={label}
            placeholder={placeholder}
            name={fieldName}
            onChange={this.onChange}
            value={this.state.value}
          ></FormTextArea>
        ) : (
          <FormInput
            label={label}
            placeholder={placeholder}
            type="text"
            value={this.state.value}
            onChange={this.onChange}
            name={fieldName}
          />
        )}
      </div>
    );
  };

  render() {
    return (
      <div>
        {this.state.isInEditMode
          ? this.renderEditView()
          : this.renderDefaultView()}
      </div>
    );
  }
}

export default EditableInput;
