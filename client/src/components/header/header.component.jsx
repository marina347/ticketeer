import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectCurrentUser,
  selectToken,
} from "../../redux/user/user.selectors";

import FormButton from "../form-button/form-button.component";
import SignOut from "../sign-out/sign-out.component";

import { HeaderContainer } from "./header.styles";
import { closeSocket, createSocket } from "../../utils/client-socket";

class HeaderComponent extends React.Component {
  componentDidMount() {
    createSocket(this.props.token);
  }
  componentWillUnmount() {
    closeSocket();
  }
  render() {
    const { history, currentUser } = this.props;
    if (currentUser) {
      return (
        <HeaderContainer>
          <SignOut />
          <FormButton
            style={{ marginRight: "10px" }}
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
export { Header };
