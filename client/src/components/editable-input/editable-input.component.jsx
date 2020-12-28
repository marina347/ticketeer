import React from "react";
import FormTextArea from "../form-inputs/form-text-area/form-text-area.component";

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
      <div>
        {fieldType === "textarea" ? (
          <FormTextArea
            textAreaItemClassName={editViewClassName}
            label={label}
            name={fieldName}
            onChange={this.onChange}
            value={this.state.value}
          ></FormTextArea>
        ) : (
          <input
            label={label}
            type="text"
            value={this.state.value}
            onChange={this.onChange}
            name={fieldName}
            className={editViewClassName}
          />
        )}
        <button onClick={this.changeEditMode}>X</button>
        <button onClick={this.updateComponentValue}>OK</button>
      </div>
    );
  };

  renderDefaultView = () => {
    const {
      fieldType,
      label,
      defaultViewClassName,
      defaultViewValueClassName,
      defaultViewInnerValueClassName,
    } = this.props;
    return (
      <div className={defaultViewClassName} onDoubleClick={this.changeEditMode}>
        {label}
        <div className={defaultViewValueClassName}>
          {fieldType === "textarea" ? (
            <div className={defaultViewInnerValueClassName}>
              {this.state.value}
            </div>
          ) : (
            this.state.value
          )}
        </div>
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
