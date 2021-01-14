import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./notification.styles.scss";

const Notification = () => {
  return (
    <ToastContainer
      style={{ fontSize: "1.6rem" }}
      bodyClassName="toast-body"
      position="bottom-right"
      hideProgressBar
    />
  );
};

export default Notification;
