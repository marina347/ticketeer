import React from "react";
import UserIconSmall from "../user-icon/user-icon-small/user-icon-small.component";
import "./side-menu.styles.scss";

export const SideMenu = ({ currentUser }) => {
  return (
    <div id="side_menu" className="side-menu">
      <UserIconSmall
        url={currentUser.picture}
        name={currentUser.name}
        email={currentUser.email}
      />
    </div>
  );
};

export default SideMenu;
