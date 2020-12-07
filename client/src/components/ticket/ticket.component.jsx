import React from "react";
import Modal from "react-modal";

import TicketPreview from "../../components/ticket-preview/ticket-preview.component";
import { TicketContainer } from "./ticket.styles";
import FormButton from "../form-button/form-button.component";

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
    const { name, className, onDragStart, _id } = this.props;

    return (
      <TicketContainer
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
          <FormButton style={{ fontSize: "18px" }} onClick={this.closeModal}>
            close
          </FormButton>
        </Modal>
      </TicketContainer>
    );
  }
}

export default Ticket;
