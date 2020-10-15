import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";

import FormButton from "../form-button/form-button.component";
import SignOut from "../sign-out/sign-out.component";

import { HeaderContainer } from "./header.styles";

const Header = ({ history, currentUser }) => {
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
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(withRouter(Header));
