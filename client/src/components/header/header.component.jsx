import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectCurrentUser,
  selectToken,
} from "../../redux/user/user.selectors";
import { ReactComponent as TicketeerLogo } from "../../assets/svg/two-tickets-logo.svg";

import "./header.styles.scss";
import { closeSocket, createSocket } from "../../utils/client-socket";
import SideMenu from "../side-menu/side-menu.component";

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
        <div className="header-container">
          <div className="logo-container">
            <TicketeerLogo className="logo" />
          </div>

          <SideMenu currentUser={currentUser} history={history} />
        </div>
      );
    } else
      return (
        <div className="header-container">
          <div className="logo-container">
            <TicketeerLogo className="logo" />
          </div>
        </div>
      );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  token: selectToken,
});

const Header = connect(mapStateToProps)(withRouter(HeaderComponent));
export { Header };
