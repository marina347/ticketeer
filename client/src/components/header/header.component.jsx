import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectCurrentUser,
  selectToken,
} from "../../redux/user/user.selectors";
import { ReactComponent as TicketeerLogo } from "../../assets/svg/ticket.svg";

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

    return (
      <div className="header">
        <div className="header__logo-box" onClick={() => history.push("/home")}>
          <TicketeerLogo className="header__logo" />
        </div>
        {currentUser ? (
          <SideMenu currentUser={currentUser} history={history} />
        ) : null}
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
