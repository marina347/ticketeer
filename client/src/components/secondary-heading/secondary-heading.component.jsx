import React from "react";
import "./secondary-heading.styles.scss";

export const SecondaryHeading = ({ text }) => {
  return <h1 id="secondary_heading" className="secondary-heading">{text}</h1>;
};

export default SecondaryHeading;
