import React from "react";
import FormButton from "../form-button/form-button.component";
import UserImage from "../user-icon/user-icon.component";
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
      <UserImage
        url={currentUser.picture}
        name={currentUser.name}
        email={currentUser.email}
      />
    </div>
  );
};

export default SideMenu;
