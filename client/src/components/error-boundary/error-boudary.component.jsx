import React from "react";
import "./error-boundary.styles.scss";

const backgroundImagePath = "https://i.imgur.com/O0DCcQy.png";

class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error">
          <img
            className="error__image"
            src="https://i.imgur.com/O0DCcQy.png"
            alt="Error"
          ></img>
          <p className="error__text">Sorry, this page is broken!</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
