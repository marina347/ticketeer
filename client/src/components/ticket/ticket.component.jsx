import React from "react";

import TicketPreview from "../../components/ticket-preview/ticket-preview.component";
import "./ticket.styles.scss";
import Popup from "../popup/popup.component";
import Modal from "../modal/Modal";

const TicketPopup = Popup(TicketPreview);

const MAX_TICKET_DISPLAY_NAME = 85;

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
      <div>
        <div
          className={className}
          onDragStart={onDragStart}
          draggable
          onClick={this.openModal}
        >
          <p>{name.length > MAX_TICKET_DISPLAY_NAME ? name.substring(0, 85) + "..." : name}</p>
        </div>
        {this.state.modalIsOpen ? (
          <Modal>
            <TicketPopup
              id={_id}
              popupOpened={this.state.modalIsOpen}
              onPopupClose={this.closeModal}
            />
          </Modal>
        ) : null}
      </div>
    );
  }
}

export default Ticket;
