import React from "react";
import "./primary-heading.styles.scss";

const PrimaryHeading = ({ mainText, subText }) => {
  return (
    <h1 className="primary-heading">
      <span className="primary-heading__main">{mainText}</span>
      <span className="primary-heading__sub">{subText}</span>
    </h1>
  );
};

export default PrimaryHeading;
