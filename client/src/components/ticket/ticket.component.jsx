import React from "react";
import Modal from "react-modal";

import TicketPreview from "../../components/ticket-preview/ticket-preview.component";
import FormButton from "../form-button/form-button.component";
import "./ticket.styles.scss";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement(document.getElementById("root"));

class Ticket extends React.Component {
  state = {
    modalIsOpen: false,
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = (e) => {
    e.stopPropagation();
    this.setState({ modalIsOpen: false });
  };

  render() {
    const { name, onDragStart, _id, className } = this.props;

    return (
      <div
        className={className}
        onDragStart={onDragStart}
        draggable
        onClick={this.openModal}
      >
        <p>{name}</p>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Modal"
        >
          <TicketPreview id={_id} />
          <br></br>
          <FormButton onClick={this.closeModal}>close</FormButton>
        </Modal>
      </div>
    );
  }
}

export default Ticket;
