import React, { lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { Header } from "./components/header/header.component";
import ErrorBoundary from "./components/error-boundary/error-boudary.component";
import NotFound from "./components/not-found/not-found.component";
import Spinner from "./components/spinner/spinner.component";
import "./App.scss";

const HomePage = lazy(() => import("./pages/home/home.component"));
const SignInPage = lazy(() => import("./pages/sign-in/sign-in.component"));

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Header />
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Redirect from="/" to="/home" />
            <Switch>
              <Route path="/home" component={HomePage} />
              <Route exact path="/login" component={SignInPage} />
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </ErrorBoundary>
        <div
          style={{
            height: "9rem",
            backgroundColor: "#c8c8a2",
            padding: "2rem",
          }}
        >
          FOOTER
        </div>
      </div>
    );
  }
}

export default App;
