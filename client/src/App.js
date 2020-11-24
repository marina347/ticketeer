import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";
import { Header } from "./components/header/header.component";
import ErrorBoundary from "./components/error-boundary/error-boudary.component";
import PrivateRoute from "./components/private-route/private-route.component";
import NotFound from "./components/not-found/not-found.component";
import Spinner from "./components/spinner/spinner.component";

const HomePage = lazy(() => import("./pages/home/home.component"));
const SignInPage = lazy(() => import("./pages/sign-in/sign-in.component"));

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Switch>
              <Route path="/home" component={HomePage} />
              <Route exact path="/login" component={SignInPage} />
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
