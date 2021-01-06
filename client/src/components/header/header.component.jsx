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

export class HeaderComponent extends React.Component {
  componentDidMount() {
    createSocket(this.props.token);
  }
  componentWillUnmount() {
    closeSocket();
  }
  render() {
    const { history, currentUser } = this.props;

    return (
      <div id="header" className="header">
        <div id="header_logo_box" className="header__logo-box" onClick={() => history.push("/home")}>
          <TicketeerLogo className="header__logo" />
        </div>
        {currentUser ? (
          <SideMenu id="side_menu" currentUser={currentUser} history={history} />
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
