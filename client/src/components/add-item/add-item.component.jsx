import React from "react";
import "./add-item.styles.scss";
import { ReactComponent as PlusIcon } from "../../assets/svg/plus.svg";
import Modal from "../modal/Modal";

const AddItem = (AddItemPopup) => {
  class WrappedComponent extends React.Component {
    state = {
      modalOpened: false,
    };

    handleClick = () => {
      this.setState({ modalOpened: !this.state.modalOpened });
    };

    render() {
      return (
        <div className="add-item-wrapper">
          <div className="add-item" onClick={this.handleClick}>
            <PlusIcon className="add-item__icon" />
          </div>
          {this.state.modalOpened ? (
            <Modal>
              <AddItemPopup
                onPopupClose={this.handleClick}
                {...this.props}
              />
            </Modal>
          ) : null}
        </div>
      );
    }
  }
  return WrappedComponent;
};

export default AddItem;
