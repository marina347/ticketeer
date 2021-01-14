import React from "react";
import "./primary-heading.styles.scss";

export const PrimaryHeading = ({ mainText, subText }) => {
  return (
    <h1 className="primary-heading">
      <span id="primary_heading_main" className="primary-heading__main">
        {mainText}
      </span>
      <span id="primary_heading_sub" className="primary-heading__sub">
        {subText}
      </span>
    </h1>
  );
};

export default PrimaryHeading;
