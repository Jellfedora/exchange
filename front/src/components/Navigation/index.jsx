import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import ConnectContainer from "../../containers/ConnectContainer";
import AccountContainer from "../../containers/AccountContainer";
import Home from "../Home";
import Menu from "../Menu";

// Add a new page in top of list otherwise bug
const pages = [
  { path: "/account", componentName: AccountContainer },
  { path: "/connect", componentName: ConnectContainer },
  { path: "/", componentName: Home },
];

const Navigation = (props) => {
  return (
    <div>
      <Router>
        <header className="header">
          <Link to="/">
            <h2>Exchange</h2>
          </Link>
          <div className="header__buttons">
            {props.userIsConnected ? (
              <Link to="/account">
                <button className="header__buttons__login">
                  {props.userFirstname}
                </button>
              </Link>
            ) : (
              <Link to="/connect">
                <button className="header__buttons__login">Connexion</button>
              </Link>
            )}
            <Menu />
          </div>
        </header>
        <Switch>
          {pages.map((content, id) => (
            <Route
              key={id}
              path={content.path}
              component={content.componentName}
            />
          ))}
        </Switch>
      </Router>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: (action) => {
      dispatch(action);
    },
  };
};
const mapStateToProps = (state) => {
  return {
    userIsConnected: state.user.isConnected,
    userFirstname: state.user.firstname,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
