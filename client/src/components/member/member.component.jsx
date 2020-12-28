import React from "react";
import UserIconSmall from "../user-icon/user-icon-small/user-icon-small.component";
import "./member.styles.scss";

const Member = ({ name, email, picture }) => {
  return (
    <div className="member">
      <UserIconSmall name={name} email={email} url={picture} />
    </div>
  );
};

export default Member;
