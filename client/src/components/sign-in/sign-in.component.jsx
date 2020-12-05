import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { getTokenAsync } from "../../redux/user/user.actions";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import EnvVariables from "../../env-variables";
import {
  SignInContainer,
  SignInMessage,
  SignInWelcomeMessage,
} from "./sign-in.styles";

const SignIn = ({ getToken, history, currentUser }) => {
  const signInSuccess = (response) => {
    if (response !== null) {
      getToken(history, response.tokenId);
    }
  };

  const signInFailure = (error) => {
    console.log(error);
  };

  if (!currentUser) {
    return (
      <SignInContainer className="nice-font">
        <SignInWelcomeMessage>Welcome to Ticketeer!</SignInWelcomeMessage>
        <SignInMessage>LOGIN WITH YOUR GOOGLE ACCOUNT</SignInMessage>
        <GoogleLogin
          clientId={EnvVariables.REACT_APP_GOOGLE_AUDIENCE}
          buttonText="Login"
          onSuccess={signInSuccess}
          onFailure={signInFailure}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
        />
      </SignInContainer>
    );
  }
  return <Redirect to="/home" />;
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  getToken: (history, googleToken) =>
    dispatch(getTokenAsync(history, googleToken)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));
