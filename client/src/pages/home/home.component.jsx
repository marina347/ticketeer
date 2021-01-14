import React, { lazy, Suspense } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";

import PrivateRoute from "../../components/private-route/private-route.component";
import Spinner from "../../components/spinner/spinner.component";
import NotFound from "../../components/not-found/not-found.component";

const JoinBoard = lazy(() => import("../join-board/join-board.component"));
const BoardPage = lazy(() => import("../../pages/board/board.component"));
const BoardsOverviewPage = lazy(() =>
  import("../boards-overview/boards-overview.component")
);

const HomePage = ({ history, match, landingPage }) => {
  if (landingPage) {
    history.push(landingPage);
  }

  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        <Route
          exact
          path={`${match.path}/boards/join-board/:hashedBoardId`}
          component={JoinBoard}
        />
        <PrivateRoute
          exact
          path={`${match.path}/boards/:boardId`}
          component={BoardPage}
        />
        <PrivateRoute
          exact
          path={`${match.path}`}
          component={BoardsOverviewPage}
        />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
};

const mapStateToProps = (state) => ({
  landingPage: state.user.landingPage,
});

export default connect(mapStateToProps)(HomePage);
