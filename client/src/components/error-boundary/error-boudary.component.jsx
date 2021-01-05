import React from "react";
import "./error-boundary.styles.scss";
import EnvVariables from "../../env-variables";

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
            src={`${EnvVariables.REACT_APP_CLIENT_PATH}/broken-page.png`}
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
