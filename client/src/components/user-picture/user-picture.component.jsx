import React, { useState } from "react";
import "./user-picture.styles.scss";
import { ReactComponent as UserDefaultImage } from "../../assets/svg/user.svg";

const UserImage = ({ url, name }) => {
  if (url && url !== "") {
    return (
      <div class="user-picture">
        <img
          className="user-picture--img"
          src={url}
          alt={`Photo of: ${name}`}
        />
      </div>
    );
  }
  return (
    <div class="user-picture">
      <UserDefaultImage className="user-picture--svg" />
    </div>
  );
};

export default UserImage;
