import React from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { removeTokenAsync } from "../../redux/user/user.actions";
import FormButton from "../form-button/form-button.component";
import {
  selectCurrentUser,
  selectToken,
} from "../../redux/user/user.selectors";
import EnvVariables from '../../env-variables';

class SignOut extends React.Component {
  signOut = (response) => {
    const { removeToken, token, history } = this.props;
    if (window.gapi.auth2) {
      const auth2 = window.gapi.auth2.getAuthInstance();
      if (auth2 != null) {
        auth2.signOut().then(auth2.disconnect().then(removeToken(token)));
      }
    }
    this.forceUpdate();
  };

  render() {
    return (
      <div>
        {/*
        <GoogleLogout
          clientId={EnvVariables.GOOGLE_AUDIENCE}
          buttonText="Logout"
          onLogoutSuccess={() => removeToken(token, history)}
          isSignedIn={true}
        ></GoogleLogout>{" "}
       */}
        <FormButton type="submit" onClick={this.signOut}>
          SIGN OUT
        </FormButton>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  token: selectToken,
});

const mapDispatchToProps = (dispatch) => ({
  removeToken: (token, history) => dispatch(removeTokenAsync(token, history)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SignOut)
);
