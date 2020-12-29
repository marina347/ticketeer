import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import UserIconExtraSmall from "../user-icon/user-icon-extra-small/user-icon-extra-small.component";
import "./member.styles.scss";

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: "1.1rem",
  },
}))(Tooltip);

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
