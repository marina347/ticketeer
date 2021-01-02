import React from "react";
import "./close-button.styles.scss";

const CloseButton = ({ action }) => <button className="btn-close" onClick={action}>X</button>;

export default CloseButton;
