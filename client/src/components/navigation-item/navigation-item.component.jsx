import React from "react";
import "./navigation-item.styles.scss";

const NavigationItem = ({ link, text }) => {
  return (
    <div className="navigation">
      <a href={link} className="navigation__item">
        {text}
      </a>
    </div>
  );
};

export default NavigationItem;
