import React from "react";
import "./user-view.styles.scss";
import SignOut from "../sign-out/sign-out.component";
import UserPicture from "../user-picture/user-picture.component";

const UserView = ({ name, url, opened, email }) => {
  if (opened) {
    return (
      <div className="user-view">
        <UserPicture name={name} url={url} />
        <span className="user-view__name">{name}</span>
        <span className="user-view__email u-margin-bottom-small">{email}</span>
        <SignOut />
      </div>
    );
  }
  return null;
};

export default UserView;
