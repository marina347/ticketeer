import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./sign-in.styles.scss";

import { getTokenAsync } from "../../redux/user/user.actions";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import EnvVariables from "../../env-variables";
import FormButton from "../form-button/form-button.component";
import PrimaryHeading from "../primary-heading/primary-heading.component";

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
      <div className="sign-in">
          <PrimaryHeading
            mainText={"Ticketeer"}
            subText={"Login with your google accout"}
          />
          <GoogleLogin
            clientId={EnvVariables.REACT_APP_GOOGLE_AUDIENCE}
            buttonText="Login"
            onSuccess={signInSuccess}
            onFailure={signInFailure}
            cookiePolicy={"single_host_origin"}
            isSignedIn={true}
            render={(renderProps) => (
              <FormButton
                className="btn btn-main"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                GOOGLE LOGIN
              </FormButton>
            )}
          />
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
