import React from "react";
import "./navigation.styles.scss";
import NavigationItem from "../navigation-item/navigation-item.component";

const Navigation = ({ items }) => {
  return (
    <div className="navigation-container">
      {items.map((item) => (
        <NavigationItem link={item.link} text={item.text}></NavigationItem>
      ))}
    </div>
  );
};

export default Navigation;
