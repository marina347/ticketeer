import React from "react";
import "./add-item.styles.scss";
import { ReactComponent as PlusIcon } from "../../assets/svg/plus.svg";

const AddItem = (AddItemPopup) => {
  class WrappedComponent extends React.Component {
    state = {
      popupOpened: false,
    };

    handleClick = () => {
      this.setState({ popupOpened: !this.state.popupOpened });
    };

    render() {
      return (
        <div className="add-item-container">
          <div className="add-item" onClick={this.handleClick}>
            <PlusIcon className="add-item__icon" />
          </div>
          <AddItemPopup
            popupOpened={this.state.popupOpened}
            onPopupClose={this.handleClick}
            {...this.props}
          />
        </div>
      );
    }
  }
  return WrappedComponent;
};

export default AddItem;
