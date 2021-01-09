import React from "react";
import "./user-view.styles.scss";
import SignOut from "../sign-out/sign-out.component";
import UserIconBig from "../user-icon/user-icon-big/user-icon-big.component";
import FormButton from "../form-button/form-button.component";

const UserView = ({ name, url, opened, email, onViewClose }) => {
  if (opened) {
    return (
      <div className="user-view">
        <FormButton
          onClick={onViewClose}
          class="btn btn-close btn-close--position-1"
        >
          &times;
        </FormButton>
        <UserIconBig name={name} url={url} />
        <p className="user-view__name">{name}</p>
        <p className="user-view__email u-margin-bottom-small">{email}</p>
        <SignOut />
      </div>
    );
  }
  return null;
};

export default UserView;
