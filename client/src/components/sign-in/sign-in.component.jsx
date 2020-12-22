import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { ReactComponent as TicketeerLogo } from "../../assets/two-tickets-logo.svg";

import "./sign-in.styles.scss";

import { getTokenAsync } from "../../redux/user/user.actions";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import EnvVariables from "../../env-variables";

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
      <div className="sign-in-container">
        <div className="logo-container">
          <TicketeerLogo className="logo" />
        </div>
        <div className="sign-in-container__text">
          <h1 className="primary-heading">
            <span className="primary-heading__main">TICKETEER</span>
            <span className="primary-heading__sub">
              LOGIN WITH YOUR GOOGLE ACCOUNT
            </span>
          </h1>
          <GoogleLogin
            clientId={EnvVariables.REACT_APP_GOOGLE_AUDIENCE}
            buttonText="Login"
            onSuccess={signInSuccess}
            onFailure={signInFailure}
            cookiePolicy={"single_host_origin"}
            isSignedIn={true}
            render={(renderProps) => (
              <button
                className="btn"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                GOOGLE LOGIN
              </button>
            )}
          />
        </div>
      </div>
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
