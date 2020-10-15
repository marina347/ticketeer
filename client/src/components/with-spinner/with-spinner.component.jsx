import React from "react";
import Spinner from "../spinner/spinner.component";

const WithSpinner = (WrappedComponenet) => {
  return ({ isLoading, ...props }) =>
    isLoading ? <Spinner /> : <WrappedComponenet {...props} />;
};

export default WithSpinner;
