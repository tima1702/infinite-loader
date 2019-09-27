import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";

import * as auth from "./Reducers/Auth/actions";
import Login from "./Components/Login";
import InfiniteScroll from "./Components/InfiniteScroll";

import StorageService from "./Service/StorageService";

const userLogged = false;
const mapStateToProps = state => ({
  isLogin: state.auth.loggedIn
});

function AuthProtect(Component) {
  return connect(mapStateToProps)(
    class extends React.Component {
      render() {
        if (this.props.isLogin) {
          return <Component />;
        }

        return (
          <Redirect
            to={{
              pathname: "/login"
            }}
          />
        );
      }
    }
  );
}
function AuthUnProtect(Component) {
  return connect(mapStateToProps)(
    class extends React.Component {
      render() {
        if (!this.props.isLogin) {
          return <Component />;
        }

        return (
          <Redirect
            to={{
              pathname: "/infinite-scroll"
            }}
          />
        );
      }
    }
  );
}

function Home() {
  return class extends React.Component {
    render() {
      return (
        <Redirect
          to={{
            pathname: "/infinite-scroll"
          }}
        />
      );
    }
  };
}

function App() {
  const dispatch = useDispatch();

  const logged = useCallback(() => {
    dispatch(auth.userLogged());
  }, [dispatch]);

  if (StorageService.checkAccessToken()) {
    logged();
  }
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={AuthUnProtect(Login)} />
          <Route
            exact
            path="/infinite-scroll"
            component={AuthProtect(InfiniteScroll)}
          />

          <Route path="/" component={Home()} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
