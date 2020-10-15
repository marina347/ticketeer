import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { getTokenAsync } from "../../redux/user/user.actions";
import { selectCurrentUser } from "../../redux/user/user.selectors";

class SignIn extends React.Component {
  signInSuccess = (response) => {
    const { getToken, history } = this.props;
    if (response !== null) {
      getToken(response.profileObj, history, response.tokenId);
    }
  };

  signInFailure = (error) => {
    console.log(error);
  };

  render() {
    if (!this.props.currentUser) {
      return (
        <div
          style={{
            "margin-top": "20%",
            "text-align": "center",
          }}
          className="nice-font"
        >
          <p
            style={{
              "font-weight": "bold",
              "font-size": "48px",
            }}
          >
            Welcome to Ticketeer!
          </p>
          <p
            style={{
              "font-size": "18px",
              "margin-top": "20px",
            }}
          >
            LOGIN WITH YOUR GOOGLE ACCOUNT
          </p>
          <br></br>
          <GoogleLogin
            clientId="196937089384-j3mndf89mc21ki77h8uqfvppat68blk1.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={this.signInSuccess}
            onFailure={this.signInFailure}
            cookiePolicy={"single_host_origin"}
            isSignedIn={true}
          />
        </div>
      );
    }
    return <Redirect to="/home" />;
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  getToken: (user, history, token) =>
    dispatch(getTokenAsync(user, history, token)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));
