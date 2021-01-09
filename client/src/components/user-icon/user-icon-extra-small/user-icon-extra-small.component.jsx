import React from "react";
import "../user-icon.styles.scss";
import { ReactComponent as UserDefaultImage } from "../../../assets/svg/user.svg";

const UserIconSmall = ({ url, name }) => {
  if (url && url !== "") {
    return (
      <div>
        <div className="user-icon">
          <img
            className="user-icon--extra-small"
            src={url}
            alt={name}
          />
        </div>
      </div>
    );
  }
  return (
    <div className="user-icon">
      <UserDefaultImage className="user-icon--extra-small" />
    </div>
  );
};

export default UserIconSmall;
