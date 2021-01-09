import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Header } from "./components/header/header.component";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";
import NotFound from "./components/not-found/not-found.component";
import Footer from "./components/footer/footer.component";
import HomePage from "./pages/home/home.component";
import SignInPage from "./pages/sign-in/sign-in.component";
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
      <ToastContainer
        style={{ fontSize: "1.6rem" }}
        bodyClassName="toast-body"
        position="bottom-right"
        hideProgressBar
      />
    </div>
  );
};

export default App;
