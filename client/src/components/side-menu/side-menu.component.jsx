import React from "react";
import FormButton from "../form-button/form-button.component";
import UserIconSmall from "../user-icon/user-icon-small/user-icon-small.component";
import "./side-menu.styles.scss";

const SideMenu = ({ currentUser, history }) => {
  return (
    <div className="side-menu">
      <FormButton
        className="btn btn-nav u-margin-right-small"
        onClick={() => history.push("/home")}
      >
        <span>HOME</span>
      </FormButton>
      <UserIconSmall
        url={currentUser.picture}
        name={currentUser.name}
        email={currentUser.email}
      />
    </div>
  );
};

export default SideMenu;
