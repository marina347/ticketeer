import React from "react";
import "../user-icon.styles.scss";
import { ReactComponent as UserDefaultImage } from "../../../assets/svg/user.svg";

const UserIconBig = ({ url, name }) => {
  if (url && url !== "") {
    return (
      <div className="user-icon u-cursor-auto">
        <img className="user-icon--big" src={url} alt={name} />
      </div>
    );
  }
  return (
    <div className="user-icon u-cursor-auto">
      <UserDefaultImage className="user-icon--big" />
    </div>
  );
};

export default UserIconBig;
