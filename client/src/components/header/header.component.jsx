import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import socketIOClient from "socket.io-client";
import { createStructuredSelector } from "reselect";
import {
  selectCurrentUser,
  selectToken,
} from "../../redux/user/user.selectors";

import FormButton from "../form-button/form-button.component";
import SignOut from "../sign-out/sign-out.component";

import { HeaderContainer } from "./header.styles";
import envVariables from "../../env-variables";

let socket;

class HeaderComponent extends React.Component {
  constructor(props) {
    super();
    socket = socketIOClient(envVariables.REACT_APP_SERVER_PATH, {
      transports: ["websocket", "polling", "flashsocket"],
      query: { token: props.token },
    });
  }
  render() {
    const { history, currentUser } = this.props;
    if (currentUser) {
      return (
        <HeaderContainer>
          <SignOut />
          <FormButton
            style={{ "margin-right": "10px" }}
            onClick={() => history.push("/home")}
          >
            Home
          </FormButton>
        </HeaderContainer>
      );
    } else return null;
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  token: selectToken,
});

const Header = connect(mapStateToProps)(withRouter(HeaderComponent));
export { Header, socket };
