import React from "react";
import { withRouter } from "react-router-dom";

import FormButton from "../form-button/form-button.component";
import "./not-found.styles.scss";

const NotFound = ({ history }) => {
  return (
    <div className="not-found">
      <h1 className="not-found__heading">404</h1>
      <p className="not-found__details">
        Sorry, we couldn't find the page you were looking for.
      </p>
      <FormButton
        onClick={() => history.push("/home")}
        className="btn btn-main u-animation-none"
      >
        GO HOME
      </FormButton>
    </div>
  );
};

export default withRouter(NotFound);
