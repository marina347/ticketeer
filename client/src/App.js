import React, { lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import { Header } from "./components/header/header.component";
import ErrorBoundary from "./components/error-boundary/error-boudary.component";
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
              <Redirect exact from="/" to="/home" />
              <Route path="/home" component={HomePage} />
              <Route exact path="/login" component={SignInPage} />
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </ErrorBoundary>
        <ToastContainer position="bottom-center" hideProgressBar />
      </div>
    );
  }
}

export default App;
