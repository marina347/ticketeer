import React, { useState } from "react";

import "../user-icon.styles.scss";
import { ReactComponent as UserDefaultImage } from "../../../assets/svg/user.svg";
import UserView from "../../user-view/user-view.component";

const UserIconSmall = ({ url, name, email }) => {
  const [viewOpened, setView] = useState(false);

  const openView = () => {
    setView(!viewOpened);
  };

  if (url && url !== "") {
    return (
      <div>
        <div className="user-icon" onClick={openView}>
          <img
            className="user-icon--small"
            src={url}
            alt={`Photo of: ${name}`}
          />
        </div>
        <UserView
          onViewClose={openView}
          opened={viewOpened}
          name={name}
          url={url}
          email={email}
        ></UserView>
      </div>
    );
  }
  return (
    <div className="user-icon" onClick={openView}>
      <UserDefaultImage className="user-icon--small" />
    </div>
  );
};

export default UserIconSmall;
