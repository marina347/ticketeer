import React from "react";
import "./user-view.styles.scss";
import SignOut from "../sign-out/sign-out.component";
import UserIconBig from "../user-icon/user-icon-big/user-icon-big.component";

const UserView = ({ name, url, opened, email, onViewClose }) => {
  if (opened) {
    return (
      <div className="user-view">
        <button onClick={onViewClose} class="user-view__close">&times;</button>
        <UserIconBig name={name} url={url} />
        <span className="user-view__name">{name}</span>
        <span className="user-view__email u-margin-bottom-small">{email}</span>
        <SignOut />
      </div>
    );
  }
  return null;
};

export default UserView;
