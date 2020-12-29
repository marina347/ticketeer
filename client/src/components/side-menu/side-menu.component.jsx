import React from "react";
import UserIconSmall from "../user-icon/user-icon-small/user-icon-small.component";
import "./side-menu.styles.scss";

const SideMenu = ({ currentUser }) => {
  return (
    <div className="side-menu">
      <UserIconSmall
        url={currentUser.picture}
        name={currentUser.name}
        email={currentUser.email}
      />
    </div>
  );
};

export default SideMenu;
