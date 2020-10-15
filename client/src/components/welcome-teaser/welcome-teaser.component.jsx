import React from "react";
import { WelcomeTeaserContainer } from "./welcome-teaser.styles";

const WelcomeTeaser = ({ displayName }) => {
  return (
    <WelcomeTeaserContainer>
      <h1>Hello {displayName}! </h1>
    </WelcomeTeaserContainer>
  );
};

export default WelcomeTeaser;
