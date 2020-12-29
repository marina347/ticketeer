import React from "react";
import LightTooltip from "../light-tooltip/light-tooltip.component";
import UserIconExtraSmall from "../user-icon/user-icon-extra-small/user-icon-extra-small.component";
import "./member.styles.scss";

const Member = ({ name, email, picture }) => {
  return (
    <LightTooltip title={name} placement="bottom">
      <div className="member">
        <UserIconExtraSmall name={name} email={email} url={picture} />
      </div>
    </LightTooltip>
  );
};

export default Member;
