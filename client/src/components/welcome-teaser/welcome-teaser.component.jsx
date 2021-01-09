import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectUserNameAndSurname } from "../../redux/user/user.selectors";
import SecondaryHeading from "../secondary-heading/secondary-heading.component";
import "./welcome-teaser.styles.scss";

export const WelcomeTeaser = ({ name }) => {
  return (
    <div id="welcome_teaser" className="welcome-teaser">
      <SecondaryHeading text={`Hello ${name}!`} />;
    </div>
  );
};

export const mapStateToProps = createStructuredSelector({
  name: selectUserNameAndSurname,
});

export default connect(mapStateToProps)(WelcomeTeaser);
