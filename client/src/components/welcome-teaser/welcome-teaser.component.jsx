import React from "react";
import SecondaryHeading from "../secondary-heading/secondary-heading.component";
import "./welcome-teaser.styles.scss";

const WelcomeTeaser = ({ displayName }) => {
  return (
    <div class="welcome-teaser-container">
      <SecondaryHeading text={`Hello ${displayName}!`} />;
    </div>
  );
};

export default WelcomeTeaser;
