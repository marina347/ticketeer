import React, { useState } from "react";
import "./user-icon.styles.scss";
import { ReactComponent as UserDefaultImage } from "../../assets/svg/user.svg";
import UserView from "../user-view/user-view.component";

const UserImage = ({ url, name, email }) => {
  const [viewOpened, setView] = useState(false);

  const openView = () => {
    setView(!viewOpened);
  };

  if (url && url !== "") {
    return (
      <div>
        <div class="image-user" onClick={openView}>
          <img
            className="image-user--img"
            src={url}
            alt={`Photo of: ${name}`}
          />
        </div>
        <UserView
          opened={viewOpened}
          name={name}
          url={url}
          email={email}
        ></UserView>
      </div>
    );
  }
  return (
    <div class="image-user" onClick={openView}>
      <UserDefaultImage className="image-user--svg" />
    </div>
  );
};

export default UserImage;
