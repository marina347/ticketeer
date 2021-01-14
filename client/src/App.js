import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { Header } from "./components/header/header.component";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";
import NotFound from "./components/not-found/not-found.component";
import Footer from "./components/footer/footer.component";
import HomePage from "./pages/home/home.component";
import SignInPage from "./pages/sign-in/sign-in.component";
import Notification from "./components/notification/notification.component";
import "./App.scss";

const App = () => {
  return (
    <div className="app">
      <Header />
      <ErrorBoundary>
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route path="/home" component={HomePage} />
          <Route exact path="/login" component={SignInPage} />
          <Route component={NotFound} />
        </Switch>
      </ErrorBoundary>
      <Footer />
      <Notification />
    </div>
  );
};

export default App;
