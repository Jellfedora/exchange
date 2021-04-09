import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import Cookies from "js-cookie";

const Menu = (props) => {
  function logout() {
    // Disconnect and delete user cookie
    setShowMenu(false);
    const action = { type: "LOG_OUT" };
    props.dispatch(action);
    Cookies.remove("id");
    Cookies.remove("firstname");
    Cookies.remove("email");
  }

  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="menu">
      <button className="menu__show-button" onClick={() => setShowMenu(true)}>
        <FontAwesomeIcon icon="bars" size="3x" />
      </button>
      <CSSTransition classNames="menu-animation" in={showMenu} timeout={0}>
        <div className="menu__content">
          <div className="menu__content__header">
            <h2>Exchange</h2>
            <button onClick={() => setShowMenu(false)}>
              <FontAwesomeIcon icon="times" size="3x" />
            </button>
          </div>
          <div className="menu__content__links">
            <div className="menu__content__links__items">
              <Link to="/" onClick={() => setShowMenu(false)}>
                Accueil
              </Link>
            </div>
            {props.userIsConnected ? (
              <div className="menu__content__links__items">
                <Link to="/account" onClick={() => setShowMenu(false)}>
                  Mon compte
                </Link>
                <Link to="/" onClick={() => logout()}>
                  Déconnexion
                </Link>
              </div>
            ) : (
              <div className="menu__content__links__items">
                <Link to="/connect" onClick={() => setShowMenu(false)}>
                  Connexion
                </Link>
              </div>
            )}
          </div>
        </div>
      </CSSTransition>
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Menu);
