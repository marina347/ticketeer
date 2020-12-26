import React, { useState } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { removeTokenAsync } from "../../redux/user/user.actions";
import FormButton from "../form-button/form-button.component";
import { selectToken } from "../../redux/user/user.selectors";

const SignOut = ({ removeToken, token }) => {
  let [, setState] = useState();

  const signOut = (response) => {
    if (window.gapi.auth2) {
      const auth2 = window.gapi.auth2.getAuthInstance();
      if (auth2 != null) {
        auth2.signOut().then(auth2.disconnect().then(removeToken(token)));
      }
    }
    setState({});
  };

  return (
    <FormButton className="btn btn-nav" type="submit" onClick={signOut}>
      SIGN OUT &rarr;
    </FormButton>
  );
};

const mapStateToProps = createStructuredSelector({
  token: selectToken,
});

const mapDispatchToProps = (dispatch) => ({
  removeToken: (token, history) => dispatch(removeTokenAsync(token, history)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SignOut)
);
